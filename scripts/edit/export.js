import { CONFIG } from '../config.js';
import { JSONtoXLSX } from '../utils/exportFile.js';

let currentHandler = null;

export function initExportEditButton(attendanceName, attendanceList) {
  const button = document.getElementById('export-edited-attendance-button');

  if (currentHandler) {
    button.removeEventListener('click', currentHandler);
  }

  currentHandler = () => {
    saveNewXLSX(attendanceName, attendanceList);
  }

  button.addEventListener('click', currentHandler);

}

function saveNewXLSX(savedStudentsAttendanceName, studentsAttendanceList) {
  const oldAttendanceNameArray = savedStudentsAttendanceName.split("");

  for (let i = CONFIG.FILE_EXTENSION.length; i != 0; i--) {
    oldAttendanceNameArray.pop();
  }

  const attendanceNameNoExtension = oldAttendanceNameArray.join('');

  const newAttendanceNameNoExtension = attendanceNameNoExtension + '-edited';


  JSONtoXLSX(studentsAttendanceList, newAttendanceNameNoExtension);
}