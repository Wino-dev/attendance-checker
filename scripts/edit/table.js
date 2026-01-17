import { STORAGE_KEYS } from "../../data/storageKeys.js";
import { ATTENDANCE_COLORS, removeAllMarkers } from "../attendance/table.js";

function initButtonColor(button) {
  removeAllMarkers(button);
  (Object.values(ATTENDANCE_COLORS[button.value])).forEach((property) => {
    button.classList.add(property);
  });
}

export function initTable(studentsAttendanceList) {
  let attendanceTableBodyHTML = '';
  const studentsTableContainer = document.getElementById('students-container')
  studentsAttendanceList.forEach(student => {
    attendanceTableBodyHTML += `
      <tr>
        <td class="py-3">${student.Name}</td>
        <td class="py-3 pl-5">
          <select data-student-id="${student["Student ID"]}" class="js-student-status-options px-2 py-1 text-xs rounded-full hover:cursor-pointer">
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
    
    const studentsMap = new Map(studentsAttendanceList.map(student => [student['Student ID'], student]));
    const matchingStudent = studentsMap.get(option.dataset.studentId);

    option.value = matchingStudent.Status;
    initButtonColor(option);

    option.addEventListener('change', () => {
      matchingStudent.Status = option.value;
      initButtonColor(option);
      localStorage.setItem(STORAGE_KEYS.editAttendanceList, JSON.stringify(studentsAttendanceList)); 
    })
  })
}
