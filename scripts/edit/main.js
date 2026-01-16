import { initExportButton } from './export.js';
import { initImportButton } from './import.js';
import { initTable } from './table.js';

initImportButton();

const studentList = JSON.parse(localStorage.getItem('edit-attendance-list'));

console.log(studentList);
if (studentList) {
  const exportButtonDiv = document.getElementById('export-edited-attendance-div');
  exportButtonDiv.classList.remove('hidden');
  exportButtonDiv.classList.add('flex');
  initExportButton(localStorage.getItem('edit-attendance-name'), studentList);
  initTable(studentList);
}