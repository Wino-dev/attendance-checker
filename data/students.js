import { STORAGE_KEYS } from "./storageKeys.js";
import { dateToJSON, areSameDate, jsonToDate } from "../scripts/utils/dateutils.js";

export const students = JSON.parse(localStorage.getItem(STORAGE_KEYS.students));

export function initStudentsAttendanceList(subject) {
  let studentsAttendanceList;
  const savedStudentsAttendanceList = JSON.parse(localStorage.getItem(STORAGE_KEYS.studentsAttendanceList(subject.Code)));

  if (!savedStudentsAttendanceList) {
    studentsAttendanceList = students.map(student => {
      return {
        ...student,
        Status: 'Absent'
      }
    });

    const creationDate = new Date();
    const creationDateStringJSON = dateToJSON(creationDate);

    localStorage.setItem(STORAGE_KEYS.attendanceDateCreation(subject.Code), JSON.stringify(creationDateStringJSON));
    localStorage.setItem(STORAGE_KEYS.studentsAttendanceList(subject.Code), JSON.stringify(studentsAttendanceList));
    localStorage.setItem(STORAGE_KEYS.actionTaken(subject.Code), 'new');

  } else {

    const currentDate = new Date();
    const creationDateJSON = JSON.parse(localStorage.getItem(STORAGE_KEYS.attendanceDateCreation(subject.Code)));
    const creationDate = jsonToDate(creationDateJSON);

    return areSameDate(currentDate, creationDate);

    /*
    if (JSON.stringify(currentDateJSON) == JSON.stringify(creationDateJSON)) {
      return true;
    } else {
      return false;
    }
      */
  }
}

export function saveAttendanceToStorage(subject, studentsAttendanceList) {
  localStorage.setItem(STORAGE_KEYS.studentsAttendanceList(subject.Code), JSON.stringify(studentsAttendanceList));
}