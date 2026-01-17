export const ATTENDANCE_COLORS = {
  Absent: { bg: 'bg-red-100', text: 'text-red-700'},
  Late: { bg: 'bg-yellow-100', text: 'text-yellow-800'},
  Present: { bg: 'bg-green-100', text: 'text-green-700'}
}

export function removeAllMarkers(DOM){
  Object.keys(ATTENDANCE_COLORS).forEach(status => {
    const colorSet = ATTENDANCE_COLORS[status];
    DOM.classList.remove(colorSet.bg);
    DOM.classList.remove(colorSet.text);
  });

  /*
  studentRowDOM.classList.remove('bg-red-100');
  studentRowDOM.classList.remove('text-red-700');
  studentRowDOM.classList.remove('bg-yellow-100');
  studentRowDOM.classList.remove('text-yellow-800');
  studentRowDOM.classList.remove('bg-green-100');
  studentRowDOM.classList.remove('text-green-700');
  */
}

function studentBackgroundMarker(student) {
  const colors = ATTENDANCE_COLORS[student.Status];
  return Object.values(colors).join(' ');
}

/*
function studentBackgroundMarker(student) {
  const absentMarker = 'bg-red-100 text-red-700';
  const lateMarker = 'bg-yellow-100 text-yellow-800';
  const presentMarker = 'bg-green-100 text-green-700';
  if (student.Status == 'Absent') { return absentMarker }
  else if (student.Status == 'Late') { return lateMarker }
  else if (student.Status == 'Present') { return presentMarker }
}
*/

export function renderTable(studentsAttendanceList) {
  let tableHTML = '';

  studentsAttendanceList.forEach(student => {
    tableHTML +=  `
      <tr>
        <td id="student-name-row-${student['Student ID']}" class="py-3"></td>
        <td class="py-3 pl-5"><span id="student-status-row-${student['Student ID']}" class="px-2 py-1 text-xs rounded-full ${studentBackgroundMarker(student)}"></span></td>
      </tr>
    `;
  });

  document.querySelector('.js-student-table').innerHTML = tableHTML;

  studentsAttendanceList.forEach(student => {
    document.getElementById(`student-name-row-${student['Student ID']}`).textContent = student.Name;
    document.getElementById(`student-status-row-${student['Student ID']}`).textContent = student.Status;
  })

  //document.querySelector('.js-student-table').innerHTML = tableHTML;
}

export function updateStudentRow(student) {
  const studentRow = document.getElementById(`student-status-row-${student['Student ID']}`);
  removeAllMarkers(studentRow);
  const studentMarkerArray = studentBackgroundMarker(student).split(' ');
  studentMarkerArray.forEach(marker => {
    studentRow.classList.add(marker);
  })
  studentRow.textContent = student.Status;
}

