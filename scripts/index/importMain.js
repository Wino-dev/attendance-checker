import * as XLSX from '../../node_modules/xlsx/xlsx.mjs';

function importButtonFunc(buttonId, properties, fileDisplayOnButton, objectLocalStorageKey, nameLocalStorageKey, customFunction) {
  
  if (localStorage.getItem(objectLocalStorageKey)) {
    document.querySelector(fileDisplayOnButton).innerText = localStorage.getItem(nameLocalStorageKey);
  }

  document.getElementById(buttonId).addEventListener('change', (input) => {

    

    const file = input.target.files[0];
    const fileReader = new FileReader();

    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (loadedFile) => {

      const arrayBuffer = loadedFile.target.result;
      const data = new Uint8Array(arrayBuffer);

      const excelFile = XLSX.read(data, {type: 'array'});
      const firstSheet = excelFile.Sheets[excelFile.SheetNames[0]];

      const objects = XLSX.utils.sheet_to_json(firstSheet);
      
      console.log(objects);

      let lineNumber = 0;

      try {
        objects.forEach((object) => {
          
          lineNumber++;

          let checkHasFailed = '';

          if(!(Object.keys(object).length == properties.length)) {
            checkHasFailed += 'Error: Invalid list format\n';
          }

          properties.forEach((property) => {
            if(!(property in object)){
              checkHasFailed += `Error: ${property} doesn't exist in line ${lineNumber}\n`;
            }
          });

          if (checkHasFailed) {
            throw checkHasFailed;
          }
        });

        localStorage.setItem(nameLocalStorageKey, file.name);
        document.querySelector(fileDisplayOnButton).innerText = file.name;
        localStorage.setItem(objectLocalStorageKey, JSON.stringify(objects));
        console.log(JSON.parse(localStorage.getItem(objectLocalStorageKey)));
        
      } catch (error) {
        alert(error);
      }  
    }

    fileReader.onerror = () => {
      alert('fileReader.error');
    }
  });
}

export function initImportButtons() {
  importButtonFunc('import-subjects-file', ['subjectName','subjectCode','startTime'], '.js-subjects-list-chosen', 'subjects', 'subjectsFileName');
  importButtonFunc('import-students-file', ['studentName','studentId'], '.js-students-list-chosen', 'students', 'studentsFileName');
}
