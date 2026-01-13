export function updateStudentStatus(student, startTime) {
  const currentTime = new Date();
  if (currentTime <= startTime) {
    student.status = 'Present';
  } else {
    student.status = 'Late';
  }
}