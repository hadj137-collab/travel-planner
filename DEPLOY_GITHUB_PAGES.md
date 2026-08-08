# 🚀 GitHub Pages 免費線上部署指南 (GitHub Pages Deployment Guide)

本指南將引導您在 3 分鐘內將 **RoamAI 台灣智慧旅遊規劃器** 免費部署至 GitHub Pages，獲得一個專屬的全球 HTTPS 網址（例如 `https://<您的帳號>.github.io/travel-planner/`），並可以在 Android / iOS 手機上將其新增至主畫面作為 PWA 手機 App 使用！

---

## ⚡ 方法一：網頁直接上傳（免安裝 Git 指令，最簡單推薦 ⭐️）

如果您沒有安裝 Git 命令列，直接使用 GitHub 網頁介面上傳只需 3 個步驟：

### 步驟 1：建立 GitHub 儲存庫 (Repository)
1. 開啟並登入 [GitHub 官網](https://github.com/)。
2. 點擊右上角的 **「+」** -> **「New repository」**。
3. **Repository name** 輸入：`travel-planner`
4. 勾選 **Public**（公開，GitHub Pages 免費版需要設為 Public）。
5. 點擊最下方的 **「Create repository」** 按鈕。

### 步驟 2：上傳專案檔案
1. 在剛建立好的頁面中，點擊 **「uploading an existing file」** 連結。
2. 開啟您電腦上的 `c:\Users\101349\Desktop\Travel Planner` 資料夾。
3. 將資料夾內的所有檔案與資料夾（包含 `index.html`, `manifest.json`, `sw.js`, `styles/`, `js/` 等）**全部拖拽上傳**至網頁中。
4. 上傳完成後，滾動到最下方點擊 **「Commit changes」**。

### 步驟 3：開啟 GitHub Pages 免費網站
1. 在該儲存庫頁面上方選單，點擊 **「Settings」**（設定）。
2. 在左側選單找到 **「Pages」**。
3. 在 **Build and deployment** 下方的 **Branch** 選擇 **`main`**（或 `master`），資料夾保持 **`/ (root)`**。
4. 點擊 **「Save」** 儲存。

🎉 **大功告成！** 約 1~2 分鐘後重新整理該頁面，畫面上方就會出現您的專屬網站網址：
`https://<您的GitHub帳號>.github.io/travel-planner/`

---

## 💻 方法二：使用 Git 命令列上傳

如果您習慣使用 Git 終端機命令列，請在專案目錄執行以下指令：

```bash
# 1. 初始化 Git
git init

# 2. 加入所有專案檔案
git add .

# 3. 提交 Commit
git commit -m "Deploy RoamAI Travel Planner PWA to GitHub Pages"

# 4. 切換主分支名稱為 main
git branch -M main

# 5. 關聯至您的 GitHub 儲存庫
git remote add origin https://github.com/<您的GitHub帳號>/travel-planner.git

# 6. 推送至 GitHub
git push -u origin main
```

推送後，同樣進入 GitHub 儲存庫的 **Settings -> Pages**，將 Branch 設定為 `main` 即可！

---

## 📱 手機安裝為 PWA App 步驟（網址上線後）

1. 用 Android 手機的 **Chrome 瀏覽器** 開啟您的 GitHub Pages 網址（`https://<您的帳號>.github.io/travel-planner/`）。
2. 點擊 Chrome 右上角 `⋮` 選單。
3. 點選 **「新增至主畫面」**（或「安裝應用程式」）。
4. 手機桌面上即會生成 **「RoamAI 旅遊」** 圖示，打開即是全螢幕獨立手機 App！
