import { students } from "../../data/students.js";
import { renderStats } from "./stats.js";
import { renderTable } from "./table.js";
import { updateStudentStatus } from "./studentFunc.js";
import { getStartTimeDate } from "./subjectFunc.js";
import { updateMessageBox } from "./message.js";

export function initLogButton(subject) {
  document.querySelector('.js-log-button').addEventListener('click', () => {
  
    const idInput = document.querySelector('.js-id-input').value;

    if (!idInput) {
      return;
    }

    let matchingStudent;

    students.forEach((student) => {
      if (idInput == student.studentId) {
        matchingStudent = student;
      }
    });

    if (matchingStudent) {
      const startTime = getStartTimeDate(subject.startTime);
      updateStudentStatus(matchingStudent, startTime);
      renderStats(students);
      renderTable();
      updateMessageBox(matchingStudent.studentName, matchingStudent.status);
    } else {
      alert("Student doesn't exist")
    }
  });
}

