# Hono Admin Monorepo

Hono REST API + Vue 3 管理面板单仓项目。

## 技术栈

### API (`api/`)

- **Hono** - 轻量高性能 Web 框架
- **@hono/node-server** - Node.js 适配器
- **tsx** - TypeScript 执行环境 (开发模式)
- **winston** - 日志系统
- **winston-daily-rotate-file** - 日志文件轮转

### Web (`web/`)

- **Vue 3** - 渐进式前端框架
- **Vite** - 下一代前端构建工具
- **Vue Router** - 官方路由管理
- **Pinia** - Vue 状态管理
- **vite-plugin-vue-devtools** - Vue DevTools 集成

### 工具链

- **pnpm** - 高性能包管理器 (>=10)
- **ESLint** - 代码检查
- **Prettier** - 代码格式化
- **TypeScript** - 类型安全
- **lefthook** - Git hooks
- **commitlint** - 提交信息规范

## 项目结构

```
.
├── api/                         # Hono REST API
│   ├── src/
│   │   ├── index.ts           # 入口文件
│   │   ├── middleware/       # 中间件
│   │   │   └── logger.ts     # 请求日志中间件
│   │   └── utils/            # 工具函数
│   │       └── logger.ts     # winston 日志配置
│   ├── .env.development      # 开发环境变量
│   ├── .env.production       # 生产环境变量
│   └── tsconfig.json         # TypeScript 配置
│
├── web/                         # Vue 3 管理面板
│   ├── src/
│   │   ├── App.vue           # 根组件
│   │   ├── main.ts           # 入口文件
│   │   ├── router/           # 路由配置
│   │   │   └── index.ts
│   │   └── stores/           # Pinia 状态管理
│   │       └── counter.ts    # 示例 store
│   ├── vite.config.ts        # Vite 配置
│   └── tsconfig.*.json       # TypeScript 配置
│
├── eslint.config.js          # ESLint 9 配置
├── .prettierrc              # Prettier 配置
├── lefthook.yml             # Git hooks 配置
├── commitlint.config.js     # commitlint 配置
├── pnpm-workspace.yaml      # pnpm workspace 配置
└── package.json             # 根配置
```

## 开发

### 环境要求

- Node.js >= 20
- pnpm >= 10

### 安装依赖

```bash
pnpm install
```

### 开发命令

| 命令             | 说明                        |
| ---------------- | --------------------------- |
| `pnpm dev`       | 同时启动 API 和 Web         |
| `pnpm dev:api`   | 仅启动 API (localhost:3001) |
| `pnpm dev:web`   | 仅启动 Web (localhost:3000) |
| `pnpm build`     | 构建所有应用                |
| `pnpm typecheck` | TypeScript 类型检查         |
| `pnpm check`     | Lint + 格式化检查           |

### 代码质量

| 命令            | 说明                 |
| --------------- | -------------------- |
| `pnpm lint`     | 代码 Lint            |
| `pnpm lint:fix` | 自动修复 Lint 问题   |
| `pnpm format`   | 代码格式化           |
| `pnpm check`    | Lint + 格式化 (推荐) |

## API 代理

Web 开发服务器配置了 `/api` 代理到 `http://localhost:3001`，避免跨域问题。

## 日志系统

API 使用 winston 作为日志系统：

- **控制台输出**: 彩色格式，带时间戳和耗时
- **文件输出**: 按天轮转，保存在 `log/` 目录，保留 1 天
- **请求日志中间件**: `api/src/middleware/logger.ts` 记录每个请求的详细信息

### 请求日志字段

- `path` - 请求路径
- `method` - HTTP 方法
- `status` - 响应状态码
- `duration` - 请求耗时 (ms)
- `ip` - 请求来源 IP (支持 x-forwarded-for, cf-connecting-ip)

## 代码规范

- 缩进：2 空格
- 行宽：100 字符
- 引号：单引号
- 尾逗号：ES5 风格（无）

### 禁止

- `@ts-ignore`、`@ts-expect-error`、`as any`
- 空 catch 块
- 未处理的 Promise rejection

### 提交规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 格式：

- `feat:` - 新功能
- `fix:` - 修复 bug
- `docs:` - 文档更新
- `style:` - 代码格式
- `refactor:` - 重构
- `chore:` - 构建/工具

### ESLint 规则

- `no-console`: 禁止 console (允许 warn, error)
- `no-debugger`: 警告
- `no-unused-vars`: 警告
- `@typescript-eslint/no-explicit-any`: 错误
- `@typescript-eslint/no-unused-vars`: 错误 (���下划线开头参数除外)

## Git Hooks

使用 lefthook 管理 Git hooks：

- **commit-msg**: 提交信息规范化检查
- **pre-commit**: 自动修复 Lint 问题
- **pre-push**: Lint 检查

## 环境变量

### API

| 文件              | 说明   |
| ----------------- | ------ |
| `api/.env.development` | 开发环境 |
| `api/.env.production`  | 生产环境 |

默认端口: `3001` (可通过 `PORT` 环境变量修改)