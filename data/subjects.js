import { STORAGE_KEYS } from "./storageKeys.js";

export const subjects = JSON.parse(localStorage.getItem(STORAGE_KEYS.subjects));

export function initSelectedSubject() {
  const selectedSubjectCode = localStorage.getItem(STORAGE_KEYS.selectedSubject);
  const subjectMap = new Map(subjects.map(subject => [subject.Code, subject]));
  return subjectMap.get(selectedSubjectCode);
}
