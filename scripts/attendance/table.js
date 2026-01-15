import { students } from "../../data/students.js";

export function renderTable() {
  const absentMarker = 'bg-red-100 text-red-700';
  const lateMarker = 'bg-yellow-100 text-yellow-800';
  const presentMarker = 'bg-green-100 text-green-700';

  function studentBackgroundMarker(student) {
    if (student.Status == 'Absent') { return absentMarker }
    else if (student.Status == 'Late') { return lateMarker }
    else if (student.Status == 'Present') { return presentMarker }
  }

  let tableHTML = '';

  students.forEach((student) => {
    tableHTML +=  `
      <tr>
        <td class="py-3">${student.Name}</td>
        <td class="py-3 pl-5"><span class="px-2 py-1 text-xs rounded-full ${studentBackgroundMarker(student)}">${student.Status}</span></td>
      </tr>
    `;
  });

  document.querySelector('.js-student-table').innerHTML = tableHTML;
}

