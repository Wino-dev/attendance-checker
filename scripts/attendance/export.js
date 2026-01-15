import * as XLSX from '../../node_modules/xlsx/xlsx.mjs';

export function initExportXLSX(subjectName, date, studentsAttendanceList) {
  document.querySelector('.js-export-button').addEventListener('click', () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(studentsAttendanceList);
    worksheet["!cols"] = [ { wch: 35 }, { wch: 15 } ]; 
    XLSX.utils.book_append_sheet(workbook, worksheet, date);
    XLSX.utils.sheet_add_aoa(worksheet, [["Name", "Student ID", "Status"]], { origin: "A1" });
    XLSX.writeFile(workbook, `${subjectName + '-' + date}.xlsx`);
  })
}
