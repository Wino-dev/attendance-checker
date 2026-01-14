export const students = JSON.parse(localStorage.getItem('students')).map((students) => {
  return {
    ...students,
    status: 'Absent'
  }
});