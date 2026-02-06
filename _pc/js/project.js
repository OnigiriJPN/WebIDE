export let project = {
  version: 1,
  name: "NewProject",
  files: {
    html: "<!doctype html>\n<html>\n</html>",
    css: "",
    js: ""
  },
  cdn: []
};

export function setProject(p) {
  project = p;
}
