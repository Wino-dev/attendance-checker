import { initTable } from './table.js';
import { initExportButton } from './export.js';
import { validateSheetContents } from '../validateImports/validateSheetContents.js';
import { STORAGE_KEYS } from '../../data/storageKeys.js';
import { XLSXtoJSON } from '../utils/importFile.js';
import { validateFileExtension } from '../validateImports/validateFileExtension.js';

export function initImportButton() {

  const attendanceListName = localStorage.getItem(STORAGE_KEYS.editAttendanceName);

  if(attendanceListName) {
    document.getElementById('edit-file-display').innerText = attendanceListName
  } 

  document.getElementById('import-attendance-file').addEventListener('change', (input) => {
    const file = input.target.files[0];
    const fileUploadError = validateFileExtension(file);
    
    if (fileUploadError) {
      alert(fileUploadError);
      return;
    }
    
    XLSXtoJSON(file, (error, students) => {
      if (error) {
        alert(error);
        return;
      }
      try {
        const propertyList = ['Name', 'Student ID', 'Status'];
        const errors = validateSheetContents(students, propertyList, null);
        
        if (errors) {
          throw errors;
        };
      
        localStorage.setItem(STORAGE_KEYS.editAttendanceList, JSON.stringify(students));
        localStorage.setItem(STORAGE_KEYS.editAttendanceName, file.name);
        initImportButton();
        initTable(students);
        console.log(students);
        const exportButtonDiv = document.getElementById('export-edited-attendance-div');
        exportButtonDiv.classList.remove('hidden');
        exportButtonDiv.classList.add('flex');
        initExportButton(localStorage.getItem(STORAGE_KEYS.editAttendanceName), students);
      } catch(error) {
        alert(error);
      }
    });
  })
}
