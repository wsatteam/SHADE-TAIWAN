# Shade Taiwan (躲太陽)

繁體中文介面的開源行動 App（React Native + Expo + TypeScript），目標為提供台灣使用者即時 UV/紫外線資訊、地圖上陰影/遮蔽地點、太陽路徑視覺化，並能與 Google Maps 連結導航。這個倉庫為 MVP scaffold，包含地圖、定位、suncalc 範例與 Firebase 設定說明。

核心功能（MVP）
- 顯示當前位置與周邊 UV 測站（或模擬資料）
- 地圖上標記陰影友善地點並可一鍵開啟 Google Maps 導航
- 太陽方位/高度（使用 suncalc）與簡易陰影提示
- 使用者回報遮蔽物（上傳位置與照片）

快速上手

先決條件：
- Node.js（LTS）
- npm 或 yarn
- Expo CLI：npm install -g expo-cli
- 申請 Google Maps API Key（將用於 iOS/Android）
- 申請 Firebase 專案（可選，用於存放 user reports 與推播）

1) Clone

  git clone https://github.com/wsatteam/SHADE-TAIWAN.git
  cd SHADE-TAIWAN

2) 將你的 Google Maps Key 和 Firebase 設定填入 app.json 或環境變數（範例見下方）

3) 安裝與啟動

  npm install
  npx expo start

4) 在模擬器或實機上測試（需允許定位權限）

設定提示（Google Maps）
- Android: 在 app.json 的 android.config.googleMaps.apiKey 填入你的 API key
- iOS: 在 app.json 的 ios.config.googleMapsApiKey 填入你的 API key

Firebase 範例
- 本專案 README 中已包含範例 env 範本（請勿把實際金鑰推到公開 repo）

貢獻
- 請先閱讀 CONTRIBUTING.md、CODE_OF_CONDUCT.md
- 標記 "good first issue" 或 "help wanted" 開始貢獻

License
- MIT
