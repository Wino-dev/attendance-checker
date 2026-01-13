import  './dateandtime.js';
import './input.js';
import './subjectFunc.js';
import { renderStats } from './stats.js';
import { students } from '../../data/students.js';
import { renderTable } from './table.js';
import { initExportXLSX } from './export.js';

renderStats(students);
renderTable();
initExportXLSX();