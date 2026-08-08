# docs/SETUP_FIREBASE.md

步驟：
1. 建立 Firebase 專案（https://console.firebase.google.com/）
2. 啟用 Firestore（測試模式或受限規則）與 Storage
3. 建立 Web 應用並取到 config（API key, projectId, appId 等）
4. 在本機建立 .env 並填入 .env.example 的變數
5. 推薦：在 GitHub 上使用 Secrets（Settings -> Secrets -> Actions）新增以下 keys：
   - REACT_NATIVE_FIREBASE_API_KEY
   - REACT_NATIVE_FIREBASE_AUTH_DOMAIN
   - REACT_NATIVE_FIREBASE_PROJECT_ID
   - REACT_NATIVE_FIREBASE_STORAGE_BUCKET
   - REACT_NATIVE_FIREBASE_MESSAGING_SENDER_ID
   - REACT_NATIVE_FIREBASE_APP_ID
6. 若要部署 Cloud Functions：
   - 安裝 Firebase CLI 並登入： npm install -g firebase-tools
   - 在 functions 目錄下建立 package.json 與 typescript 設定，然後 firebase deploy --only functions

安全提醒：不要把實際金鑰直接推上公開 repo。使用 GitHub Secrets 或本機 .env（確保 .gitignore 包含 .env）
