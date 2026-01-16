function initButtonColor(button) {
  removeAllColorOnButton(button)

  if (button.value == 'Absent') {
    button.classList.add('bg-red-100');
    button.classList.add('text-red-700');
  } else if (button.value == 'Late') {
    button.classList.add('bg-yellow-100');
    button.classList.add('text-yellow-800');
  } else if (button.value == 'Present') {
    button.classList.add('bg-green-100');
    button.classList.add('text-green-700');
  }
}

function removeAllColorOnButton(button) {
  const colorsUsed = ['bg-red-100','text-red-700','bg-yellow-100','text-yellow-800','text-green-700','bg-green-100']
  colorsUsed.forEach(color => {
    button.classList.remove(color);
  })
}

/* 
initButtonColor(document.getElementById('status-try'));

document.getElementById('status-try').addEventListener('change', () => {
  initButtonColor(document.getElementById('status-try'));
})

*/

export function initTable(studentsAttendanceList) {
  let attendanceTableBodyHTML = '';
  const studentsTableContainer = document.getElementById('students-container')
  studentsAttendanceList.forEach(student => {
    attendanceTableBodyHTML += `
      <tr>
        <td class="py-3">${student.Name}</td>
        <td class="py-3 pl-5">
          <select data-student-id="${student["Student ID"]}" class="js-student-status-options px-2 py-1 text-xs rounded-full">
            <option class="bg-red-100 text-red-700" value="Absent">Absent</option>
            <option class="bg-yellow-100 text-yellow-800" value="Late">Late</option>
            <option class="bg-green-100 text-green-700" value="Present">Present</option>
          </select>
        </td>
      </tr>
    `;
  })

  studentsTableContainer.innerHTML = attendanceTableBodyHTML;

  document.querySelectorAll('.js-student-status-options').forEach(option => {
    let matchingStudent
    studentsAttendanceList.forEach(student => {
      console.log(student.Status)
      if (student['Student ID'] == option.dataset.studentId) {
        matchingStudent = student;
      }
    })

    option.value = matchingStudent.Status;

    initButtonColor(option);

    option.addEventListener('change', () => {
      initButtonColor(option);
      matchingStudent.Status = option.value;
      console.log(matchingStudent);
      localStorage.setItem('edit-attendance-list', JSON.stringify(studentsAttendanceList));
    })
  })
}
