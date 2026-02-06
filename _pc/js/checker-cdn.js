// CDNチェック（形式・重複・到達性）
// project.cdn: 配列 of URL文字列
function isValidUrl(url) {
    // URLコンストラクタで検証
    try {
        // URLオブジェクトを作成
        new URL(url);
        // 有効なURL形式ならtrueを返す
        return true;
        // エラーが発生した場合は無効なURL形式と判断
    } catch {
        // 無効なURL形式ならfalseを返す
        return false;
    }
}
// 重複チェック
function checkDuplicate(list) {
    // Setを使って重複を検出
    const set = new Set(list);
    // 重複があればエラーメッセージを返す
    return set.size !== list.length ? "CDNが重複しています。別のCDNを追加してください。" : null;
}
// 到達性チェック
async function checkReachable(url) {
    // HEADリクエストで到達性を確認
    try {
        // fetchでHEADリクエストを送信
        const res = await fetch(url, { method: "HEAD" });
        // ステータスがOKでなければエラーメッセージを返す
        return res.ok ? null : "読み込みに失敗しました: " + res.status + " " + res.statusText;
        // ネットワークエラーなどが発生した場合はキャッチしてメッセージを返す
    } catch (e) {
        // エラーメッセージを返す
        return "接続に失敗しました: " + e.message;
    }
}
// CDNリスト全体のチェック
export async function checkCDN(project) {
    // エラーメッセージの配列を初期化
    const errors = [];
    // project.cdnが配列でない場合は空の配列を返す
    if (!Array.isArray(project.cdn)) return errors;
    // 重複チェック
    const dup = checkDuplicate(project.cdn);
    // 重複エラーがあれば配列に追加
    if (dup) errors.push(dup);
    // 各URLの形式と到達性チェック
    for (const url of project.cdn) {
        // URL形式チェック
        if (!isValidUrl(url)) {
            // URL形式エラーを配列に追加
            errors.push(`${url} : URL形式エラーです。正しいURLを指定してください。`);
            // 到達性チェックはスキップ
            continue;
        }
        // 到達性チェック
        const reach = await checkReachable(url);
        // 到達性エラーがあれば配列に追加
        if (reach) {
            // 到達性エラーを配列に追加
            errors.push(`${url} : ${reach}`);
        }
    }
    // エラーメッセージの配列を返す
    return errors;
}
