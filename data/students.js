export const students = JSON.parse(localStorage.getItem('students'));

export function initStudentsAttendanceList(subject) {
  let studentsAttendanceList;
  
  const savedStudentsAttendanceList = JSON.parse(localStorage.getItem(`students-attendance-${subject.Code}`));
  
  if (!savedStudentsAttendanceList) {
    studentsAttendanceList = students.map(student => {
      return {
        ...student,
        Status: 'Absent'
      }
    });

    localStorage.setItem(`students-attendance-${subject.Code}`, JSON.stringify(studentsAttendanceList));

  } else {
    studentsAttendanceList = savedStudentsAttendanceList;
  }

  return studentsAttendanceList;
}

export function saveAttendanceToStorage(subject, studentsAttendanceList) {
  localStorage.setItem(`students-attendance-${subject.Code}`, JSON.stringify(studentsAttendanceList));
}
