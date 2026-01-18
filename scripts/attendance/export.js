import { STORAGE_KEYS } from '../../data/storageKeys.js';
import { jsonToDate, formatDateString } from '../utils/dateutils.js';
import { JSONtoXLSX } from '../utils/exportFile.js';

export function initExportXLSX(subjectCode, studentsAttendanceList) {
  document.querySelector('.js-export-button').addEventListener('click', () => {
    saveXLSX(subjectCode, studentsAttendanceList);
  })
}

export function saveXLSX(subjectCode, studentsAttendanceList) {
  const dateJSON = JSON.parse(localStorage.getItem(STORAGE_KEYS.attendanceDateCreation(subjectCode)));
  const date = jsonToDate(dateJSON);
  const dateString = formatDateString(date);
  const fileNameNoExt = dateString + '-' + subjectCode;
  JSONtoXLSX(studentsAttendanceList, fileNameNoExt); 
}
