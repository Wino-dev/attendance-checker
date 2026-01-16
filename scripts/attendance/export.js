import * as XLSX from '../../node_modules/xlsx/xlsx.mjs';
import { formatDateJSON } from './dateandtime.js';

export function initExportXLSX(subjectCode, studentsAttendanceList) {
  document.querySelector('.js-export-button').addEventListener('click', () => {
    saveXLSX(subjectCode, studentsAttendanceList);
  })
}

export function saveXLSX(subjectCode, studentsAttendanceList) {
  const dateString = formatDateJSON(JSON.parse(localStorage.getItem(`attendance-date-created-${subjectCode}`)));
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(studentsAttendanceList);
  worksheet["!cols"] = [ { wch: 35 }, { wch: 15 } ]; 
  XLSX.utils.book_append_sheet(workbook, worksheet, dateString);
  XLSX.utils.sheet_add_aoa(worksheet, [["Name", "Student ID", "Status"]], { origin: "A1" });
  XLSX.writeFile(workbook, `${dateString + '-' + subjectCode}.xlsx`);
}
