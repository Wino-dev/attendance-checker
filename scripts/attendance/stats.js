export function renderStats(students) {
  let absentStudents = 0;
  let lateStudents = 0;
  let presentStudents = 0;

  students.forEach((student) => {
    if (student.Status == 'Absent') {
      absentStudents++;
    } else if (student.Status == 'Late') {
      lateStudents++;
    } else if (student.Status == 'Present') {
      presentStudents++;
    }
  });

  document.getElementById('absent-value').innerText = absentStudents;
  document.getElementById('late-value').innerText = lateStudents;
  document.getElementById('present-value').innerText = presentStudents;
}