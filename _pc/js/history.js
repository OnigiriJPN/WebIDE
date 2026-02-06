import { project, setProject } from "./project.js";

const undoStack = [];
const redoStack = [];

export function snapshot() {
  undoStack.push(JSON.stringify(project));
  redoStack.length = 0;
}

export function undo() {
  if (!undoStack.length) return;
  redoStack.push(JSON.stringify(project));
  setProject(JSON.parse(undoStack.pop()));
}

export function redo() {
  if (!redoStack.length) return;
  undoStack.push(JSON.stringify(project));
  setProject(JSON.parse(redoStack.pop()));
}
