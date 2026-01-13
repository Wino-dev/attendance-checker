import * as XLSX from '../../node_modules/xlsx/xlsx.mjs';
import { students } from '../../data/students.js';

export function initExportXLSX() {
  document.querySelector('.js-export-button').addEventListener('click', () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(students);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'try.xlsx'); 
  })
}
