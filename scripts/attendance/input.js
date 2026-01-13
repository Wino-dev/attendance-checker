import { students } from "../../data/students.js";
import { subjects } from "../../data/subjects.js";
import { renderTable } from "./table.js";
import { updateStudentStatus } from "./studentFunc.js";
import { getStartTimeDate } from "./subjectFunc.js";

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
    const startTime = getStartTimeDate(subjects[0].startTime);
    updateStudentStatus(matchingStudent, startTime);
    renderTable();
  } else {
    alert("Student doesn't exist")
  }
});