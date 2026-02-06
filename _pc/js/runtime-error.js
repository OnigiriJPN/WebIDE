// ランタイムエラー初期化
export function initRuntimeError() {
    // ランタイムエラー受信
    window.addEventListener("message", e => {
        // ランタイムエラーの場合
        if (e.data?.type === "runtime-error") {
            // エラーパネルに表示
            document.getElementById("errorPanel").textContent =
                // メッセージとスタックトレースを表示
                e.data.message + "\n" + (e.data.stack || "");
        }
    });
}
