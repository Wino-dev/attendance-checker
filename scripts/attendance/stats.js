export function renderStats(students) {
  let absentStudents = 0;
  let lateStudents = 0;
  let presentStudents = 0;

  students.forEach((student) => {
    if (student.status == 'Absent') {
      absentStudents++;
    } else if (student.status == 'Late') {
      lateStudents++;
    } else if (student.status == 'Present') {
      presentStudents++;
    }
  });

  document.getElementById('absent-value').innerText = absentStudents;
  document.getElementById('late-value').innerText = lateStudents;
  document.getElementById('present-value').innerText = presentStudents;
}