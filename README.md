# 🏊 游泳培训班在线报名系统

基于 GitHub Pages 部署的在线报名表单，提交数据可自动收集到 Google 表格。

## 文件说明

| 文件 | 用途 |
|------|------|
| `index.html` | 报名表单页面（家长填写） |
| `admin.html` | 管理后台（查看/导出报名数据） |
| `gas-template/Code.gs` | Google Apps Script 模板（可选，用于数据收集） |

## 部署步骤

### 1. 创建 GitHub 仓库并上传

```bash
# 在项目目录下初始化 Git
cd swim-form
git init
git add .
git commit -m "初始化游泳报名系统"

# 在 GitHub 上新建一个仓库（不要勾选 README）
# 然后推送到 GitHub
git remote add origin https://github.com/你的用户名/你的仓库名.git
git branch -M main
git push -u origin main
```

### 2. 启用 GitHub Pages

1. 打开 GitHub 仓库 → **Settings** → **Pages**
2. Source 选择 **Deploy from a branch**
3. Branch 选择 `main`，目录选 `/ (root)`
4. 点击 **Save**
5. 等待几分钟，页面会显示部署地址，如 `https://你的用户名.github.io/仓库名/`

### 3. 访问链接

- 报名表单：`https://你的用户名.github.io/仓库名/`
- 管理后台：`https://你的用户名.github.io/仓库名/admin.html`

> 管理后台默认密码：`admin123`（可在浏览器 localStorage 中修改）

### 4. (可选) 配置 Google Sheets 数据收集

1. 打开 [Google 表格](https://sheets.google.com)，新建空白表格
2. 从浏览器地址栏复制表格 ID（`/d/` 和 `/edit` 之间的字符串）
3. 打开 `gas-template/Code.gs`，将 `SHEET_ID` 改为你的表格 ID
4. 点击 Google 表格菜单：**扩展程序** → **Apps Script**
5. 粘贴修改后的代码，点击 **部署** → **新建部署**
   - 类型：**网页应用**
   - 执行身份：**所有人**
   - 有权访问：**任何人**
6. 部署成功后复制生成的网址
7. 打开报名管理的 **数据收集设置**，粘贴网址并保存

## 预览

在浏览器中直接打开 `index.html` 即可预览表单效果。
