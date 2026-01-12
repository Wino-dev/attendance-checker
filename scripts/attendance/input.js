import { students } from "../../data/students.js";
import { renderTable } from "./table.js";
document.querySelector('.js-log-button').addEventListener('click', () => {
  const idInput = document.querySelector('.js-id-input').value;

  let matchingStudent;

  students.forEach((student) => {
    if (idInput == student.studentId) {
      matchingStudent = student;
    }
  });

  matchingStudent.status = "Present";
  renderTable();
});