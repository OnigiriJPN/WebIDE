import { project } from "./project.js";
import { getValue, setValue, setLanguage } from "./editor-monaco.js";

let current = "html";

export function initTabs() {
  document.querySelectorAll(".tabs button").forEach(b => {
    b.onclick = () => switchTab(b.dataset.tab);
  });
}

function switchTab(tab) {
  project.files[current] = getValue();
  current = tab;
  setValue(project.files[tab]);
  setLanguage(tab);

  document.querySelectorAll(".tabs button").forEach(b =>
    b.classList.toggle("active", b.dataset.tab === tab)
  );
}
