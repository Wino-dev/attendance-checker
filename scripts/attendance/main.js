import { renderTime, renderDate, initCurrentDate, renderSubjectDetails} from './dateandtime.js';
import { initSelectedSubject } from '../../data/subjects.js';
import { renderStats } from './stats.js';
import { students } from '../../data/students.js';
import { renderTable } from './table.js';
import { initExportXLSX } from './export.js';
import { initLogButton } from './input.js';

const selectedSubject = initSelectedSubject();
console.log(selectedSubject);
console.log(students);
renderStats(students);
initLogButton(selectedSubject);
renderTable();
renderTime();
renderDate();

renderSubjectDetails(selectedSubject);
initExportXLSX(selectedSubject.subjectCode, initCurrentDate());