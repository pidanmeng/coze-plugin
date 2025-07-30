# Coze Reddit Plugin Backend

这是一个为[扣子 (Coze)](https://www.coze.com/)平台开发的Reddit插件后端项目。它基于Next.js框架构建，旨在提供与Reddit API交互的各种功能。

## 项目结构

- **Next.js 框架**: 项目使用Next.js作为基础框架，提供了API路由和服务端渲染能力。
- **API 路由**: 主要的API路由定义在 `app/api/[...route]/route.ts` 中，负责处理所有传入的请求。
- **Reddit 工具模块**: 所有与Reddit相关的功能实现都封装在 `app/tools/reddit/` 目录下，包括API请求、数据格式化和工具函数。

```
coze-plugin/
├── app/
│   ├── api/
│   │   └── [...route]/route.ts  # 主要API路由入口
│   └── tools/
│       ├── reddit/              # Reddit相关工具和API封装
│       │   ├── formatters.ts
│       │   ├── getAccessToken.ts
│       │   ├── redditApiRequest.ts
│       │   ├── route.ts         # Reddit工具的路由定义
│       │   ├── schemas.ts
│       │   └── tools.ts         # Reddit核心逻辑和API调用
│       └── utils/               # 通用工具函数
├── package.json                 # 项目依赖和脚本
├── next.config.js
├── tsconfig.json
└── README.md
```

## 核心功能

本项目提供了以下与Reddit API交互的核心功能：

- **获取Reddit访问令牌**: 安全地获取用于访问Reddit API的OAuth令牌。
- **搜索子版块 (Subreddit)**: 根据关键词搜索相关的Reddit子版块。
- **获取子版块信息**: 获取特定子版块的详细信息。
- **搜索帖子**: 在指定子版块内搜索帖子，支持多种排序和时间筛选。
- **获取帖子详情**: 根据帖子ID获取帖子的详细内容。
- **获取帖子评论**: 获取特定帖子的所有评论，支持排序和数量限制。
- **获取单个评论详情**: 根据评论ID获取单个评论的详细内容。

## 技术栈

- **前端框架**: [Next.js 14](https://nextjs.org/)
- **后端框架**: [Hono](https://hono.dev/) (用于构建API路由)
- **HTTP 客户端**: [Axios](https://axios-http.com/) (用于发送HTTP请求)
- **数据验证**: [Zod](https://zod.dev/) (用于运行时类型检查和数据验证)
- **开发语言**: [TypeScript](https://www.typescriptlang.org/) (提供类型安全)

## 运行方式

请确保您已安装 [Node.js](https://nodejs.org/) 和 [npm](https://www.npmjs.com/)。

1. **安装依赖**: 
   ```bash
   bun i
   ```

2. **启动开发服务器**: 
   ```bash
   bun dev
   ```
   项目将在 `http://localhost:3000` 启动。

## 前置要求

在使用此插件之前，您需要获取 Reddit API 凭据：

### 创建 Reddit 应用

1. 访问 [Reddit 应用偏好设置](https://www.reddit.com/prefs/apps)
2. 点击"创建应用"或"创建另一个应用"
3. 选择"script"作为应用类型
4. 记录您的 `client_id` 和 `client_secret`

### 设置环境变量

您可以选择以下两种方式之一设置环境变量：

**方式一：通过命令行设置 (临时)**

```bash
export REDDIT_CLIENT_ID="your_client_id_here"
export REDDIT_CLIENT_SECRET="your_client_secret_here"
```

**方式二：创建 `.env` 文件 (推荐)**

在项目根目录下创建 `.env` 文件，并添加以下内容：

```
REDDIT_CLIENT_ID=your_client_id_here
REDDIT_CLIENT_SECRET=your_client_secret_here
```

## API 端点

以下是本项目提供的主要API端点及其功能：

- `GET /reddit/getAccessToken` - 获取Reddit访问令牌
- `GET /reddit/getSubReddit?name={subreddit_name}` - 获取子版块信息
- `GET /reddit/searchPosts?subreddit={subreddit_name}&query={search_query}&sort={sort_type}&time={time_range}&limit={limit}` - 搜索帖子
- `GET /reddit/getSubmission?id={submission_id}` - 获取帖子详情
- `GET /reddit/getCommentsBySubmission?submission_id={submission_id}&sort={sort_type}&limit={limit}` - 获取帖子评论
- `GET /reddit/getComment?id={comment_id}` - 获取单个评论
- `GET /reddit/searchSubReddit?query={search_query}&limit={limit}` - 搜索子版块

**注意**: 具体参数和响应格式请参考源代码中的 `app/tools/reddit/schemas.ts` 和 `app/tools/reddit/tools.ts` 文件。
