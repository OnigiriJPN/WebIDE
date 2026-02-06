// editor-monaco.js
import { project } from "./project.js";

export let editor;
// Monaco Editorの初期化と操作関数
export function initEditor() {
    // Monaco Editorの読み込み
  require.config({ paths: { vs: "https://unpkg.com/monaco-editor/min/vs" }});
  // エディタの作成
  require(["vs/editor/editor.main"], () => {
    // エディタの初期化
    editor = monaco.editor.create(
        // エディタを表示する要素
      document.getElementById("editor"), {
        // 初期値と設定
        value: project.files.html,
        // IntelliSenceにターゲットする言語
        language: "html",
        // 表示設定
        theme: "vs-dark"
      }
    );
  });
}
// エディタの内容を取得
export function getValue() {
  // エディタの内容を返す
  return editor.getValue();
}
// エディタの内容を設定
export function setValue(v) {
  // エディタの内容を設定
  editor.setValue(v);
}
// エディタの言語を設定
export function setLanguage(lang) {
  // エディタの言語を設定
  monaco.editor.setModelLanguage(editor.getModel(), lang);
}
