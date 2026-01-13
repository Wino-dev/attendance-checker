import {renderTime, renderDate, initCurrentDate} from './dateandtime.js';
import './input.js';
import './subjectFunc.js';
import { initSelectedSubject } from '../../data/subjects.js';
import { renderStats } from './stats.js';
import { students } from '../../data/students.js';
import { renderTable } from './table.js';
import { initExportXLSX } from './export.js';

renderStats(students);
renderTable();
renderTime();
renderDate();

const selectedSubject = initSelectedSubject();

initExportXLSX(selectedSubject.name, initCurrentDate());