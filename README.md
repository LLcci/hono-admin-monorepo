# Hono Admin Monorepo

Hono REST API + Vue 3 管理面板单仓项目。

## 技术栈

### API

- **Hono** - 轻量高性能 Web 框架
- **@hono/node-server** - Node.js 适配器

### Web

- **Vue 3** - 渐进式前端框架
- **Vite** - 下一代前端构建工具
- **Vue Router** - 官方路由管理
- **Pinia** - Vue 状态管理

### 工具链

- **pnpm** - 高性能包管理器
- **ESLint** - 代码检查
- **Prettier** - 代码格式化
- **TypeScript** - 类型安全
- **lefthook** - Git hooks

## 项目结构

```
.
├── apps/
│   ├── api/              # Hono REST API
│   │   └── src/
│   │       ├── config/    # 配置文件
│   │       ├── index.ts  # 入口文件
│   │       ├── middleware/ # 中间件
│   │       ├── models/   # 数据模型
│   │       ├── routes/   # 路由处理
│   │       ├── services/ # 业务逻辑
│   │       └── utils/    # 工具函数
│   │
│   └── web/              # Vue 3 管理面板
│       └── src/
│           ├── api/      # API 调用
│           ├── components/ # 组件
│           ├── hooks/    # 组合式函数
│           ├── pages/    # 页面路由
│           ├── stores/   # Pinia 状态
│           ├── utils/    # 工具函数
│           ├── App.vue   # 根组件
│           └── main.ts   # 入口文件
│
├── node_modules/
├── eslint.config.js         # ESLint 配置
├── .prettierrc           # Prettier 配置
├── lefthook.yml          # Git hooks 配置
└── tsconfig.base.json    # TypeScript 基础配置
```

## 开发

### 环境要求

- Node.js >= 18
- pnpm >= 8

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

### 代码质量

| 命令            | 说明                 |
| --------------- | -------------------- |
| `pnpm lint`     | 代码 Lint            |
| `pnpm lint:fix` | 自动修复 Lint 问题   |
| `pnpm format`   | 代码格式化           |
| `pnpm check`    | Lint + 格式化 (推荐) |

## API 代理

Web 开发服务器配置了 `/api` 代理到 `http://localhost:3001`，避免跨域问题。

## 代码规范

- 缩进：2 空格
- 行宽：100 字符
- 引号：单引号
- 尾逗号：ES5 风格（无）

### 禁止

- `@ts-ignore`、`@ts-expect-error`、`as any`
- 空 catch 块
- 未处理的 Promise rejection
