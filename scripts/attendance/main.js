import { renderTime, renderDate, initCurrentDate, renderSubjectDetails} from './dateandtime.js';
import { initSelectedSubject } from '../../data/subjects.js';
import { renderStats } from './stats.js';
import { renderTable } from './table.js';
import { initExportXLSX } from './export.js';
import { initLogButton } from './input.js';
import { initStudentsAttendanceList } from '../../data/students.js';
import { initMessageBox } from './message.js';

const selectedSubject = initSelectedSubject();
const studentsAttendanceList = initStudentsAttendanceList(selectedSubject);
renderStats(studentsAttendanceList);
initLogButton(selectedSubject, studentsAttendanceList);
renderTable(studentsAttendanceList);
renderTime();
renderDate();
initMessageBox(selectedSubject);
renderSubjectDetails(selectedSubject);
initExportXLSX(selectedSubject.Code, initCurrentDate(), studentsAttendanceList);
