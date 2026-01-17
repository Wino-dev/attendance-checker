import * as XLSX from '../../node_modules/xlsx/xlsx.mjs';
import { STORAGE_KEYS } from '../../data/storageKeys.js';
import { jsonToDate, formatDateString } from '../utils/dateutils.js';

export function initExportXLSX(subjectCode, studentsAttendanceList) {
  document.querySelector('.js-export-button').addEventListener('click', () => {
    saveXLSX(subjectCode, studentsAttendanceList);
  })
}

export function saveXLSX(subjectCode, studentsAttendanceList) {
  const dateJSON = JSON.parse(localStorage.getItem(STORAGE_KEYS.attendanceDateCreation(subjectCode)));
  const date = jsonToDate(dateJSON);
  const dateString = formatDateString(date);
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(studentsAttendanceList);
  worksheet["!cols"] = [ { wch: 35 }, { wch: 15 } ]; 
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  XLSX.utils.sheet_add_aoa(worksheet, [["Name", "Student ID", "Status"]], { origin: "A1" });
  XLSX.writeFile(workbook, `${dateString}-${subjectCode}.xlsx`);
}
