import * as XLSX from '../../node_modules/xlsx/xlsx.mjs';
import { CONFIG } from '../config.js';

export function JSONtoXLSX(studentsAttendanceList, fileName) {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(studentsAttendanceList);
  worksheet["!cols"] = [
    {wch: CONFIG.XLSX_COLUMN_WIDTHS.name}, 
    {wch: CONFIG.XLSX_COLUMN_WIDTHS['Student ID']}
  ];
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  XLSX.writeFile(workbook, `${fileName + CONFIG.FILE_EXTENSION}`);
}