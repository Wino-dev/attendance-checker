import * as XLSX from '../../node_modules/xlsx/xlsx.mjs';
import { CONFIG } from '../config.js';

let listenerAttached = false;

export function initExportButton(attendanceName, attendanceList) {
  const button = document.getElementById('export-edited-attendance-button');

  if (!listenerAttached) {
    button.addEventListener('click', () => {
      saveXLSX(attendanceName, attendanceList);
    });
    listenerAttached = true;
  }
}

function saveXLSX(savedStudentsAttendanceName, studentsAttendanceList) {
  const oldAttendanceNameArray = savedStudentsAttendanceName.split("");
  for (let i = CONFIG.FILE_EXTENSION.length; i != 0; i--) {
    oldAttendanceNameArray.pop();
  }
  const newSavedStudentsAttendanceName = oldAttendanceNameArray.join('');
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(studentsAttendanceList);
  worksheet["!cols"] = [ { wch: CONFIG.XLSX_COLUMN_WIDTHS.name }, { wch: CONFIG.XLSX_COLUMN_WIDTHS['Student ID'] } ]; 
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  XLSX.utils.sheet_add_aoa(worksheet, [["Name", "Student ID", "Status"]], { origin: "A1" });
  XLSX.writeFile(workbook, `${newSavedStudentsAttendanceName}-edited${CONFIG.FILE_EXTENSION}`);
}