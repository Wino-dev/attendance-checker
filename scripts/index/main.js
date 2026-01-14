import { students } from "../../data/students.js";
import { subjects } from "../../data/subjects.js";
import { initImportButtons } from "./importMain.js";
import { updateButtonContainer } from "./subjectButtons.js";

updateButtonContainer(students, subjects);
initImportButtons();