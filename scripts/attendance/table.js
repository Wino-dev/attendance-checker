import { students } from "../../data/students.js";

export function renderTable() {
  const absentMarker = 'bg-red-100 text-red-700';
  const lateMarker = 'bg-yellow-100 text-yellow-800';
  const presentMarker = 'bg-green-100 text-green-700';

  function studentBackgroundMarker(student) {
    if (student.status == 'Absent') { return absentMarker }
    else if (student.status == 'Late') { return lateMarker }
    else if (student.status == 'Present') { return presentMarker }
  }

  let tableHTML = '';

  students.forEach((student) => {
    tableHTML +=  `
      <tr>
        <td class="py-3">${student.name}</td>
        <td class="py-3"><span class="px-2 py-1 text-xs rounded-full ${studentBackgroundMarker(student)}">${student.status}</span></td>
      </tr>
    `;
  });

  document.querySelector('.js-student-table').innerHTML = tableHTML;
}

