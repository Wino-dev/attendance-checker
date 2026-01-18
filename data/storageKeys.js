export const STORAGE_KEYS = {
  students: 'students',
  subjects: 'subjects',
  selectedSubject: 'selected-subject',
  editAttendanceList: 'edit-attendance-list',
  editAttendanceName: 'edit-attendance-name',
  customAttendanceList: 'custom-attendance-list',
  customAttendanceName: 'custom-attendance-name',
  studentsAttendanceList: (subjectCode) => `students-attendance-${subjectCode}`,
  attendanceDateCreation: (subjectCode) => `attendance-date-created-${subjectCode}`,
  actionTaken: (subjectCode) => `action-taken-${subjectCode}`,
  attendancePreviousLog: (subjectCode) => `attendance-previous-log-${subjectCode}`
}