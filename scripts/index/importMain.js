import * as XLSX from '../../node_modules/xlsx/xlsx.mjs';
import { updateButtonContainer } from './subjectButtons.js';

function importButtonFunc(buttonId, properties, fileDisplayOnButton, objectLocalStorageKey, nameLocalStorageKey) {
  
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
            console.log(`checking property: ${property}`);
            if(!(property in object)){
              checkHasFailed += `Error: ${property} doesn't exist in line ${lineNumber}\n`;
            }
          });

          if (checkHasFailed) {
            throw checkHasFailed;
          };

          if (buttonId == 'import-subjects-file') {
            let startTimeString = object['Start Time'];
              if(startTimeString.length == 6) {
                startTimeString = '0' + startTimeString;
              }

              if (startTimeString.length != 7) {
                throw `Invalid format: Invalid Time Format in line ${lineNumber}\n`;
              }

              let invalidHours = false
              let invalidMinutes = false

              for (let i = 0; i < 2; i++) {
                if (isNaN(startTimeString[i])) {
                  invalidHours = true;
                }
              }

              if (invalidHours) {
                checkHasFailed += `Invalid format: Invalid Hours in line ${lineNumber}\n`;  
              }

              for (let i = 3; i < 5; i++) {
                if (isNaN(startTimeString[i])) {
                  invalidMinutes = true;
                }
              }

              if (invalidMinutes) {
                checkHasFailed += `Invalid format: Invalid Minutes Format in line ${lineNumber}\n`; 
              }

              if (startTimeString[2] != ':') {
                throw `Invalid format: Invalid Time Format in line ${lineNumber}\n`;
              }

              if (Number(startTimeString[3]) > 5) {
                checkHasFailed += `Invalid format: Too much minutes in line ${lineNumber}\n`; 
              }

              const meridiem = startTimeString[5] + startTimeString[6];

              if (meridiem != 'AM' && meridiem != 'PM') {
                checkHasFailed += `Invalid format: Not AM or PM in line ${lineNumber}\n`;
              }

              let hours = Number(startTimeString[0] + startTimeString[1]);

              if (hours > 12) {
                checkHasFailed += `Invalid format: Not 12HR format in line ${lineNumber}\n`; 
              }
          };

          if (checkHasFailed) {
            throw checkHasFailed;
          }
        });

        localStorage.setItem(nameLocalStorageKey, file.name);
        document.querySelector(fileDisplayOnButton).innerText = file.name;
        localStorage.setItem(objectLocalStorageKey, JSON.stringify(objects));
        console.log(JSON.parse(localStorage.getItem(objectLocalStorageKey)));
        updateButtonContainer();
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
  importButtonFunc('import-subjects-file', ['Name','Code','Start Time'], '.js-subjects-list-chosen', 'subjects', 'subjectsFileName');
  importButtonFunc('import-students-file', ['Name','Student ID'], '.js-students-list-chosen', 'students', 'studentsFileName');
}
