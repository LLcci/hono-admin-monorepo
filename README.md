# Hono Admin Monorepo

Hono REST API + Vue 3 管理后台单仓项目。

## 概览

- `api/`：基于 Hono 的后端服务，集成 better-auth、Drizzle ORM、PostgreSQL、Winston
- `web/`：基于 Vue 3、Vite、Element Plus、Pinia、Vue Router、UnoCSS 的前端管理端
- 包管理：pnpm workspace
- 代码质量：ESLint + Prettier + lefthook + commitlint

更详细的目录职责见根目录 [`codemap.md`](./codemap.md)。

## 目录结构

```text
.
├── api/                     # Hono REST API
│   ├── src/
│   │   ├── index.ts         # 应用入口
│   │   ├── db/              # Drizzle 数据库连接
│   │   ├── schema/          # better-auth / Drizzle 表结构
│   │   ├── middleware/      # 请求日志、鉴权中间件
│   │   └── utils/           # auth / logger 工具
│   ├── drizzle.config.ts    # Drizzle Kit 配置
│   └── package.json
├── web/                     # Vue 3 管理端
│   ├── src/
│   │   ├── App.vue          # 当前根认证界面
│   │   ├── hooks/auth.ts    # better-auth 客户端
│   │   ├── router/          # Vue Router
│   │   └── stores/          # Pinia store
│   ├── vite.config.ts       # Vite 配置
│   └── package.json
├── codemap.md               # 仓库级文档地图
├── eslint.config.js
├── .prettierrc
├── lefthook.yml
├── commitlint.config.js
├── pnpm-workspace.yaml
└── package.json
```

## 环境要求

- Node.js >= 20
- pnpm >= 10

## 安装依赖

```bash
pnpm install
```

## 常用命令

### 仓库根目录

| 命令 | 说明 |
| --- | --- |
| `pnpm dev` | 并行启动 API 和 Web |
| `pnpm dev:api` | 仅启动 API |
| `pnpm dev:web` | 仅启动 Web |
| `pnpm build` | 构建全部包 |
| `pnpm typecheck` | 运行工作区类型检查 |
| `pnpm lint` | 运行 ESLint |
| `pnpm lint:fix` | 自动修复 ESLint 问题 |
| `pnpm format` | 用 Prettier 格式化仓库 |
| `pnpm check` | `lint` + `prettier --check` |

### API 包

以下命令建议在仓库根目录执行：

| 命令 | 说明 |
| --- | --- |
| `pnpm --filter api dev` | 启动 API 开发服务 |
| `pnpm --filter api build` | 构建 API |
| `pnpm --filter api db:generate` | 生成 Drizzle migration |
| `pnpm --filter api db:migrate` | 执行 migration |
| `pnpm --filter api db:push` | 推送 schema 到数据库 |
| `pnpm --filter api db:studio` | 打开 Drizzle Studio |

### Web 包

| 命令 | 说明 |
| --- | --- |
| `pnpm --filter web dev` | 启动前端开发服务 |
| `pnpm --filter web build` | 构建前端 |
| `pnpm --filter web preview` | 预览前端构建产物 |
| `pnpm --filter web type-check` | 检查前端类型 |

## Web UI 约定

- 组件优先复用 Element Plus，避免重复封装已有通用能力
- 需要编写样式时，统一使用 UnoCSS，不再新增零散的手写样式方案
- 图标优先使用 `@iconify-json/mdi` 提供的 Material Design Icons
- 如需扩展 UnoCSS 能力，优先在 `web/uno.config.ts` 中集中配置，避免组件内各自为政

## 运行说明

- API 默认监听 `PORT`
- Web 默认由 Vite 启动，本地常见端口为 `5173`
- `web/src/hooks/auth.ts` 默认将认证请求发送到 `http://localhost:3001`
- 如果需要统一前缀代理，请在前端或反向代理层补充 `/api` 约定

## 代码约定

- 缩进：2 空格
- 行宽：100
- 引号：单引号
- 分号：必须
- 尾逗号：ES5 风格（不保留尾逗号）

### 禁止项

- `@ts-ignore`
- `@ts-expect-error`
- `as any`
- 空 `catch` 块
- 未处理的 Promise rejection
- `console.log`（允许 `console.warn` / `console.error`）

## 提交规范

使用 Conventional Commits，例如：

- `feat:` 新功能
- `fix:` 修复问题
- `docs:` 文档更新
- `refactor:` 重构
- `chore:` 构建或工具调整

## 相关文档

- [`codemap.md`](./codemap.md)：仓库总览
