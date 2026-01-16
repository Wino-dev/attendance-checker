import * as XLSX from '../../node_modules/xlsx/xlsx.mjs';

export function initExportButton(attendanceName, attendanceList) {
  const button = document.getElementById('export-edited-attendance-button');
  const newButton = button.cloneNode(true);
  button.parentNode.replaceChild(newButton, button);

  newButton.addEventListener('click', () => {
    saveXLSX(attendanceName, attendanceList);
  })
}

function saveXLSX(savedStudentsAttendanceName, studentsAttendanceList) {
  const oldAttendanceNameArray = savedStudentsAttendanceName.split("");
  for (let i = 5; i != 0; i--) {
    oldAttendanceNameArray.pop();
  }
  const newSavedStudentsAttendanceName = oldAttendanceNameArray.join('');
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(studentsAttendanceList);
  worksheet["!cols"] = [ { wch: 35 }, { wch: 15 } ]; 
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  XLSX.utils.sheet_add_aoa(worksheet, [["Name", "Student ID", "Status"]], { origin: "A1" });
  XLSX.writeFile(workbook, `${newSavedStudentsAttendanceName}-edited.xlsx`);
}