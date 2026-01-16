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

    const creationDate = new Date();
    const creationDateStringJSON = {
      Month: (creationDate.getMonth() + 1).toString(),
      Day: (creationDate.getDate()).toString(),
      Year: creationDate.getFullYear()
    }

    if (creationDateStringJSON.Month.length == 1) {
      creationDateStringJSON.Month = '0' + creationDateStringJSON.Month;
    } 

    if (creationDateStringJSON.Day.length == 1) {
      creationDateStringJSON.Day = '0' + creationDateStringJSON.Day;
    }

    localStorage.setItem(`attendance-date-created-${subject.Code}`, JSON.stringify(creationDateStringJSON));
    localStorage.setItem(`students-attendance-${subject.Code}`, JSON.stringify(studentsAttendanceList));
    localStorage.setItem(`action-taken-${subject.Code}`, 'new');

  } else {

    const currentDate = new Date();
    const currentDateJSON = {
      Month: currentDate.getMonth(),
      Day: currentDate.getDate(),
      Year: currentDate.getFullYear()
    }

    const creationDateStringJSON = JSON.parse(localStorage.getItem(`attendance-date-created-${subject.Code}`));

    const creationDateJSON = {
      Month: Number(creationDateStringJSON.Month) - 1,
      Day: Number(creationDateStringJSON.Day),
      Year: creationDateStringJSON.Year 
    }

    if (JSON.stringify(currentDateJSON) == JSON.stringify(creationDateJSON)) {
      return true;
    } else {
      return false;
    }
  }
}

export function saveAttendanceToStorage(subject, studentsAttendanceList) {
  localStorage.setItem(`students-attendance-${subject.Code}`, JSON.stringify(studentsAttendanceList));
}
