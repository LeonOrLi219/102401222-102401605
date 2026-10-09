# 102401222-102401605
markdown
# 校园失物招领

一个基于 WEB 的校园失物招领平台，支持发布寻物/招领信息、浏览搜索、查看详情、联系发布者、更新状态。
## 目录结构

    ├── index.html          首页：列表 + 搜索 + 分类筛选
    ├── publish.html        发布页：寻物/招领表单
    ├── detail.html         详情页：物品信息 + 联系方式 + 状态更新
    ├── my.html             我的发布：统计 + 列表 + 状态标记
    ├── css/
    │   ├── reset.css       样式重置
    │   └── style.css       全局样式
    ├── js/
    │   ├── storage.js      数据层：localStorage 增删改查
    │   ├── search.js       搜索与多条件筛选
    │   ├── validate.js     表单校验
    │   ├── index.js        首页逻辑
    │   ├── publish.js      发布页逻辑
    │   ├── detail.js       详情页逻辑
    │   └── my.js           我的发布页逻辑
    ├── tests/
    │   ├── storage.test.js
    │   ├── search.test.js
    │   └── validate.test.js
    ├── package.json        Jest 测试配置
    └── README.md

## 使用说明

### 运行网页
1. 下载或 clone 整个仓库
2. 用谷歌浏览器打开 `index.html`
3. 主流程：首页浏览 → 搜索/筛选 → 点卡片进详情 → 复制联系方式 → 发布者点"标记为已找到/已归还"
4. 数据存在浏览器 localStorage，换浏览器或清缓存会重置

### 运行单元测试
npm install

npm test


## 分工
- A：`css/`、`js/storage.js`、`js/index.js`、`index.html`、`detail.html`、`js/detail.js`、`tests/storage.test.js`
- B：`js/validate.js`、`js/search.js`、`publish.html`、`js/publish.js`、`my.html`、`js/my.js`、`tests/validate.test.js`、`tests/search.test.js`

## 技术栈
- 原生 HTML + CSS + JavaScript
- localStorage 数据存储
- Jest 单元测试
