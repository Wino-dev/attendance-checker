import { updateButtonContainer } from './subjectButtons.js';
import { validateSheetContents } from '../validateImports/validateSheetContents.js';
import { XLSXtoJSON } from '../utils/importFile.js';

function importButtonFunc(buttonId, properties, fileDisplayOnButton, objectLocalStorageKey, nameLocalStorageKey) {
  
  if (localStorage.getItem(objectLocalStorageKey)) {
    document.querySelector(fileDisplayOnButton).innerText = localStorage.getItem(nameLocalStorageKey);
  }

  document.getElementById(buttonId).addEventListener('change', (input) => {

    const file = input.target.files[0];
    if(!file) {
      alert('No file selected.');
      return;
    }

    if(!file.name.endsWith('.xlsx')) {
      alert('Please upload a .xlsx file');
      return;
    }

    const students = XLSXtoJSON(file);

    try {
      const errors  = validateSheetContents(students, properties, buttonId);

      if (errors) {
        throw errors;
      }

      localStorage.setItem(nameLocalStorageKey, file.name);
      document.querySelector(fileDisplayOnButton).textContent = file.name;
      localStorage.setItem(objectLocalStorageKey, JSON.stringify(students));
      updateButtonContainer();
    
    } catch (error) {
      alert(error);
    }  
  });
}

export function initImportButtons() {
  importButtonFunc('import-subjects-file', ['Name','Code','Start Time'], '.js-subjects-list-chosen', 'subjects', 'subjectsFileName');
  importButtonFunc('import-students-file', ['Name','Student ID'], '.js-students-list-chosen', 'students', 'studentsFileName');
}


