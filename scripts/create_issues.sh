# scripts/create_issues.sh
# 需要 gh CLI 並已登入

REPO="wsatteam/SHADE-TAIWAN"

gh issue create --repo "$REPO" --title "good first issue: 改善 README 的快速上手指南" --body "請補充更多本地開發細節與 Google Maps / Firebase 設定步驟，讓新貢獻者能快速啟動。" --label "good first issue"

gh issue create --repo "$REPO" --title "help wanted: 加入 UV 等值線熱力圖顯示" --body "實作 heatmap 層以視覺化測站或插值後的 UV 分佈，參考 react-native-maps heatmap 或自有渲染方式。" --label "help wanted"

gh issue create --repo "$REPO" --title "roadmap: v0.1 MVP 工作項目" --body "列出 MVP 與後續優先等級（CWB 串接、使用者上報、推播、上架），並用 milestones 管理。"
