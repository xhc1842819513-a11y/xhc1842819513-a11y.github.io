# 个人作品集网站

免费托管在 GitHub Pages 上，用于展示 HTML 网页作品和 Office / PDF 文档。

## 网站结构

```
index.html            主页（页面外观、"关于我"文字在这里改）
works.js              ★ 作品清单（添加作品只改这个文件）
projects/             HTML 网页作品放这里（每个作品一个子文件夹）
  demo/               示例作品（可删除）
docs/                 PDF / Word / Excel / PPT 文档放这里
README.md             本说明文件
```

## 如何添加一个新作品（3 步）

1. **上传文件**：在仓库页面点 `Add file → Upload files`
   - HTML 网页 → 拖进 `projects/` 文件夹（做成一个子文件夹，如 `projects/my-page/`）
   - 文档 → 拖进 `docs/` 文件夹
2. **登记作品**：打开 `works.js`，照已有格式复制一段，填上标题、类型、文件路径
3. **提交**：点 `Commit changes`，等 1~2 分钟网站自动更新

> 提示：上传的文件名建议用英文或数字（如 `report.pdf`），中文文件名容易在个别浏览器打不开。

## 文件类型对应关系

| 你要展示的文件 | type 填 |
|---|---|
| HTML 网页 | `html` |
| PDF | `pdf` |
| Word（.doc/.docx） | `word` |
| Excel（.xls/.xlsx） | `excel` |
| PPT（.ppt/.pptx） | `ppt` |

Word / Excel / PPT 的在线预览由微软官方免费服务（view.officeapps.live.com）提供，无需登录。

## 首次上线步骤（一次性）

1. 登录 GitHub，新建仓库，名称必须是：`xhc1842819513-a11y.github.io`
2. 把本文件夹里**全部文件**上传到仓库（Add file → Upload files → 拖入 → Commit）
3. 仓库 Settings → Pages → Branch 选 `main` → Save
4. 约 1~2 分钟后访问：**https://xhc1842819513-a11y.github.io**

## 修改个人介绍

打开 `index.html`，搜索"关于我"，修改 `<div class="about-box">` 里的文字即可。
