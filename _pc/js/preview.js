import { project } from "./project.js";

export function buildSrc() {
  return `
<!doctype html>
<html>
<head>
<style>${project.files.css}</style>
<script>
// エラー処理
window.onerror = function(m,s,l,c,e){
 // 親ウィンドウにエラーメッセージを送信
 parent.postMessage({type:"runtime-error",message:m,line:l,stack:e?.stack},"*");
};
</script>
</head>
<body>
${project.files.html}
<script>
// JS実行
try {
${project.files.js}
} catch(e){
 // 親ウィンドウにエラーメッセージを送信
 parent.postMessage({type:"runtime-error",message:e.message,stack:e.stack},"*");
}
<\/script>
</body>
</html>`;
}

export function runPreview() {
  document.getElementById("preview").srcdoc = buildSrc();
}
