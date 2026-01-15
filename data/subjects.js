export const subjects = JSON.parse(localStorage.getItem('subjects'));

export function initSelectedSubject() {
  const selectedSubjectCode = localStorage.getItem('selectedSubject');
  let selectedSubject;
  subjects.forEach((subject) => {
    if (subject.Code == selectedSubjectCode) {
      selectedSubject = subject;
    };
  });
  return selectedSubject;
}
