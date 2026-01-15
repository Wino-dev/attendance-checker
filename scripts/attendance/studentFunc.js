export function updateStudentStatus(student, startTime) {
  const currentTime = new Date();
  if (currentTime <= startTime) {
    student.Status = 'Present';
  } else {
    student.Status = 'Late';
  }
}