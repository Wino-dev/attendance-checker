export const subjects = JSON.parse(localStorage.getItem('subjects'));

export function initSelectedSubject() {
  const selectedSubjectCode = localStorage.getItem('selectedSubject');
  console.log(selectedSubjectCode);
  let selectedSubject;
  subjects.forEach((subject) => {
    if (subject.subjectCode == selectedSubjectCode) {
      selectedSubject = subject;
    };
  })
  return selectedSubject;
}
