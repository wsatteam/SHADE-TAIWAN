# docs/ADD_CWB.md

中央氣象局（CWB）Open Data 範例整合說明：

1. 申請 API 金鑰：前往 CWB 開放資料平台並申請 API key。
2. 設定環境變數 CWB_API_KEY（可放到 GitHub Secrets: CWB_API_KEY）。
3. 範例呼叫：src/services/cwb.ts 中有範例 fetchCwbUvNearby，實際 endpoint 與回傳欄位請參考官方文件並調整解析程式。

注意：CWB 的資料通常以測站為單位回傳，可能需要做空間內插或選取最近站點來標示地圖上的值。
