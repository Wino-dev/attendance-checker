import { STORAGE_KEYS } from '../../data/storageKeys.js';
import { initExportButton } from './export.js';
import { initImportButton } from './import.js';
import { initTable } from './table.js';

initImportButton();

const studentList = JSON.parse(localStorage.getItem(STORAGE_KEYS.editAttendanceList));

if (studentList) {
  console.log(studentList);
  const exportButtonDiv = document.getElementById('export-edited-attendance-div');
  exportButtonDiv.classList.remove('hidden');
  exportButtonDiv.classList.add('flex');
  initExportButton(localStorage.getItem(STORAGE_KEYS.editAttendanceName), studentList);
  initTable(studentList);
}