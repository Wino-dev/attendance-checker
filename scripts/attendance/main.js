import { renderTime, renderDate, renderSubjectDetails} from './dateandtime.js';
import { initSelectedSubject } from '../../data/subjects.js';
import { renderStats } from './stats.js';
import { renderTable } from './table.js';
import { initExportXLSX, saveXLSX } from './export.js';
import { initLogButton } from './input.js';
import { initMessageBox } from './message.js';

const selectedSubject = initSelectedSubject();
const studentsAttendanceList = JSON.parse(localStorage.getItem(`students-attendance-${selectedSubject.Code}`));
const retrievedListStatus = localStorage.getItem(`action-taken-${selectedSubject.Code}`);

if (retrievedListStatus == 'new' || retrievedListStatus == 'reload') {
  initAttendance();
  localStorage.setItem(`action-taken-${selectedSubject.Code}`,'used');
} else if (retrievedListStatus == 'save') {
  saveXLSX(selectedSubject.Code, studentsAttendanceList);
  localStorage.removeItem(`students-attendance-${selectedSubject.Code}`);
  localStorage.removeItem(`attendance-previous-log-${selectedSubject.Code}`);
  window.location.href = './previous.html';
} else if (retrievedListStatus == 'delete') {
  localStorage.removeItem(`students-attendance-${selectedSubject.Code}`);
  localStorage.removeItem(`attendance-previous-log-${selectedSubject.Code}`);
  window.location.href = './previous.html';
} else if (retrievedListStatus == 'used') {
  window.location.href = './previous.html';
}

function initAttendance() {
  renderStats(studentsAttendanceList);
  initLogButton(selectedSubject, studentsAttendanceList);
  renderTable(studentsAttendanceList);
  renderTime();
  renderDate();
  initMessageBox(selectedSubject);
  renderSubjectDetails(selectedSubject);
  initExportXLSX(selectedSubject.Code, studentsAttendanceList);
}

