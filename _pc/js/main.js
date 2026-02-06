import { initEditor } from "./editor-monaco.js";
import { initTabs } from "./tabs.js";
import { runPreview } from "./preview.js";
import { snapshot, undo, redo } from "./history.js";
import { initRuntimeError } from "./runtime-error.js";

initEditor();
initTabs();
initRuntimeError();

document.getElementById("run").onclick = () => {
  snapshot();
  runPreview();
};

document.getElementById("undo").onclick = undo;
document.getElementById("redo").onclick = redo;
