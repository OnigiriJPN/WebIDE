// プロジェクト全体のチェックを行うモジュール
import { checkSyntax } from "./checker-syntax.js";
import { checkCDN } from "./checker-cdn.js";
// 現在サポートしているプロジェクトバージョン
const CURRENT_VERSION = 1;

function checkStructure(p) {
    // プロジェクト構造の基本チェック
    if (!p || typeof p !== "object") return "プロジェクトの読み込み中にエラーが発生しました。";
    if (!p.files) return "files が存在しません";
    if (!("html" in p.files)) return "HTMLファイルがありません";
    if (!("css" in p.files)) return "CSSファイルがありません";
    if (!("js" in p.files)) return "JSファイルがありません";
    // すべてのチェックを通過した場合はnullを返す
    return null;
}
// バージョンチェック
function checkVersion(p) {
    // バージョンの存在と互換性をチェック
    if (!p.version) return "versionが未定義です";
    // バージョンが現在のバージョンより新しい場合はエラー
    if (p.version > CURRENT_VERSION)
        return `新しいバージョンのプロジェクトです。
    このエディターでは、プロジェクトバージョン ${CURRENT_VERSION} に対応しています。
    ${CURRENT_VERSION} 以上に対応するエディタを使用してください。`;
    // すべてのチェックを通過した場合はnullを返す
    return null;
}
// 空ファイルチェック
function checkEmpty(p) {
    // 各ファイルが空でないことをチェック
    if (!p.files.html.trim()) return "HTMLが空です";
    if (!p.files.css.trim()) return "CSSが空です";
    if (!p.files.js.trim()) return "JSが空です";
    // すべてのチェックを通過した場合はnullを返す
    return null;
}
// プロジェクト全体のチェックを実行
export async function fullProjectCheck(project) {
    // チェック結果を格納するオブジェクト
    const result = {
        // 各チェックのエラーメッセージ配列
        // structure: 構造チェック結果
        structure: [],
        // syntax: 構文チェック結果
        syntax: [],
        // cdn: CDNチェック結果
        cdn: []
    };
    // 構造チェック
    const s = checkStructure(project);
    // エラーがあれば配列に追加
    if (s) result.structure.push(s);
    // バージョンチェック
    const v = checkVersion(project);
    // エラーがあれば配列に追加
    if (v) result.structure.push(v);
    // 空ファイルチェック
    const e = checkEmpty(project);
    // エラーがあれば配列に追加
    if (e) result.structure.push(e);
    // 構文チェック
    const syntax = checkSyntax(project);
    // 各言語のエラーがあれば配列に追加
    for (const [k, v2] of Object.entries(syntax)) {
        // エラーがあれば配列に追加
        if (v2) result.syntax.push(`${k.toUpperCase()}: ${v2}`);
    }
    // CDNチェック（非同期）
    result.cdn = await checkCDN(project);
    // チェック結果を返す
    return result;
}
