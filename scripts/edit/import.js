import * as XLSX from '../../node_modules/xlsx/xlsx.mjs';
import { initTable } from './table.js';
import { initExportButton } from './export.js';

export function initImportButton() {

  const attendanceListName = localStorage.getItem('edit-attendance-name');

  if(attendanceListName) {
    document.getElementById('edit-file-display').innerText = attendanceListName
  } 

  document.getElementById('import-attendance-file').addEventListener('change', (input) => {
    const file = input.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (loadedFile) => {
      const arrayBuffer = loadedFile.target.result;
      const data = new Uint8Array(arrayBuffer);
      const excelFile = XLSX.read(data, {type: 'array'});
      const firstSheet = excelFile.Sheets[excelFile.SheetNames[0]];
      const students = XLSX.utils.sheet_to_json(firstSheet);

      let lineNumber = 0;

      try {
        students.forEach(student => {
          lineNumber++;

          let checkHasFailed = '';

          const propertyList = ['Name', 'Student ID', 'Status'];

          propertyList.forEach((property) => {
            if(!(property in student)){
              checkHasFailed += `Error: ${property} doesn't exist in line ${lineNumber}\n`;
            }
          });

          if (checkHasFailed) {
            throw checkHasFailed;
          };
          
        });

        localStorage.setItem('edit-attendance-list', JSON.stringify(students));
        localStorage.setItem('edit-attendance-name', file.name);
        initImportButton();
        initTable(students);
        const exportButtonDiv = document.getElementById('export-edited-attendance-div');
        exportButtonDiv.classList.remove('hidden');
        exportButtonDiv.classList.add('flex');
        initExportButton(localStorage.getItem('edit-attendance-name'), students);
      } catch(error) {
        alert(error);
      }
    }
  })
}
