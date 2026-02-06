// HTML / CSS / JS の構文チェック専用
// 各言語の簡易的な構文エラーチェックを行い、エラーメッセージを返す
export function checkHTML(code) {
    // DOMParserを使用してHTMLを解析
    try {
        // DOMParserのインスタンスを作成
        const parser = new DOMParser();
        // HTMLコードを解析
        const doc = parser.parseFromString(code, "text/html");
        // parsererror要素が存在する場合は構文エラーと判断
        if (doc.querySelector("parsererror")) {
            // 構文エラーを返す
            return "HTML側の構文エラー";
        }
        // エラーがなければnullを返す
        return null;
        // エラーが発生した場合はキャッチしてメッセージを返す
    } catch (e) {
        // エラーメッセージを返す
        return e.message;
    }
}
// CSSの構文チェック
export function checkCSS(code) {
    // style要素を作成してCSSを適用し、構文エラーをチェック
    try {
        // style要素を作成
        const style = document.createElement("style");
        // CSSコードを設定
        style.textContent = code;
        // headに追加してCSSを適用
        document.head.appendChild(style);
        // cssRulesを参照して構文エラーをチェック
        const ok = style.sheet && style.sheet.cssRules !== null;
        // style要素を削除してクリーンアップ
        style.remove();
        // 構文エラーがあればメッセージを返す
        return ok ? null : "CSS側の構文エラー";
        // エラーが発生した場合はキャッチしてメッセージを返す
    } catch (e) {
        // エラーメッセージを返す
        return e.message;
    }
}
// JSの構文チェック
export function checkJS(code) {
    // Functionコンストラクタを使用して構文エラーをチェック
    try {
        // 新しい関数を作成して構文をチェック
        new Function(code);
        // エラーがなければnullを返す
        return null;
    } catch (e) {
        // エラーメッセージを返す
        return e.message;
    }
}
// プロジェクト全体の構文チェック
export function checkSyntax(project) {
    // 各言語の構文チェックを実行し、結果をオブジェクトで返す
    return {
        // HTML, CSS, JSそれぞれのチェック結果を返す
        html: checkHTML(project.files.html),
        css: checkCSS(project.files.css),
        js: checkJS(project.files.js)
    };
}
