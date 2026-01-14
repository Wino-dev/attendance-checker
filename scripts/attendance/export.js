import * as XLSX from '../../node_modules/xlsx/xlsx.mjs';
import { students } from '../../data/students.js';

export function initExportXLSX(subjectName, date) {
  document.querySelector('.js-export-button').addEventListener('click', () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(students);
    worksheet["!cols"] = [ { wch: 35 }, { wch: 15 } ]; 
    XLSX.utils.book_append_sheet(workbook, worksheet, date);
    XLSX.utils.sheet_add_aoa(worksheet, [["Name", "Student ID", "Status"]], { origin: "A1" });
    XLSX.writeFile(workbook, `${subjectName + '-' + date}.xlsx`);
  })
}
