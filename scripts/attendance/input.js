import { renderStats } from "./stats.js";
import { updateStudentRow } from "./table.js";
import { updateStudentStatus } from "./studentFunc.js";
import { getStartTimeDate } from "../utils/dateutils.js";
import { updateMessageBox } from "./message.js";
import { saveAttendanceToStorage } from "../../data/students.js";

export function initLogButton(subject, studentsAttendanceList) {
  document.querySelector('.js-log-button').addEventListener('click', () => {
    
    const idInput = document.querySelector('.js-id-input').value;

    if (!idInput) {
      return;
    }

    const studentsMapIDAsID = new Map(studentsAttendanceList.map(student => [student['Student ID'], student]));
    const studentsMapNameAsID = new Map(studentsAttendanceList.map(student => [student.Name, student]));

    const matchingStudent = studentsMapIDAsID.get(idInput) || studentsMapNameAsID.get(idInput);

    /*
    let matchingStudent;

    studentsAttendanceList.forEach((student) => {
      if (idInput == student['Student ID']) {
        matchingStudent = student;
      }
    });
    */

    if (matchingStudent) {
      const startTime = getStartTimeDate(subject['Start Time']);
      updateStudentStatus(matchingStudent, startTime);
      renderStats(studentsAttendanceList);
      updateStudentRow(matchingStudent);
      updateMessageBox(matchingStudent, subject);
      saveAttendanceToStorage(subject, studentsAttendanceList);
    } else {
      alert("Student doesn't exist")
    }
  });
}

