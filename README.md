# 芈雅中乐学院 | Meya Conservatory of Chinese Music

悉尼芈雅中乐学院官方网站 — 全栈 Next.js 应用，包含前台展示 + 后台教务管理系统。

**Live Demo**: https://musicstudy-tan.vercel.app

---

## Demo 演示账号

| 角色 | 邮箱 | 密码 | 后台入口 |
|------|------|------|----------|
| 管理员 | `admin@meyamusic.com.au` | `admin123` | `/dashboard/admin` |
| 教师 | `meya@meyamusic.com.au` | `teacher123` | `/dashboard/teacher` |
| 学生 | `student1@example.com` | `student123` | `/dashboard/student` |

登录后自动根据角色跳转到对应后台。

---

## 技术栈

| 层面 | 技术 |
|------|------|
| 前端框架 | Next.js 16 (App Router, Turbopack) |
| UI | Tailwind CSS v4 + shadcn/ui v4 |
| 数据库 | PostgreSQL (Neon Serverless) |
| ORM | Prisma v7 + @prisma/adapter-neon |
| 认证 | Auth.js v5 (NextAuth) — JWT + Credentials |
| 国际化 | next-intl v4 — 中英双语 |
| 部署 | Vercel |

---

## 页面总览

### 前台页面（20 页）

| 页面 | 路由 | 说明 |
|------|------|------|
| 首页 | `/` | Hero + 学校简介 + 课程推荐 + 活动预告 + 乐团 + CTA |
| 关于我们 | `/about` | 学校理念、校区介绍、发展历程 |
| 师资团队 | `/teachers` | 教师卡片列表 |
| 教师详情 | `/teachers/[slug]` | 个人简介、擅长乐器、教学风格 |
| 音乐课程 | `/lessons` | 两校区课程，按乐器分类 |
| 乐器详情 | `/lessons/[instrument]` | 课程介绍、价格、可选教师 |
| 加入乐团 | `/orchestra` | 乐团介绍、招募信息 |
| 活动列表 | `/events` | 演出/活动日历 |
| 活动详情 | `/events/[slug]` | 时间、地点、票价 |
| 新闻动态 | `/news` | 新闻博客列表 |
| 新闻详情 | `/news/[slug]` | 文章全文 |
| 商店 | `/shop` | 乐器、汉服、演出服、琴房 4 个分类 |
| 商品分类 | `/shop/[category]` | 产品列表、定价 |
| 预约试课 | `/booking` | 三步流程：选乐器 → 填信息 → 确认 |
| 演出租赁 | `/performance-hire` | 服务介绍 + 在线询价 |
| 联系我们 | `/contact` | 表单 + 两校区地图 + 社交媒体 |
| 招聘 | `/career` | 职位列表 |
| 登录 | `/login` | 邮箱密码登录 |
| 注册 | `/register` | 新用户注册 |

### 教师后台（7 页）`/dashboard/teacher`

| 页面 | 说明 |
|------|------|
| 总览 | 今日课程、本周统计、待办事项 |
| 我的课表 | 周视图课程安排 |
| 我的学生 | 学生列表 + 联系信息 |
| 学生详情 | 课时记录、进度笔记 |
| 课时记录 | 每节课完成状态、教学笔记 |
| 通知中心 | 新预约、课程变动通知 |
| 个人设置 | 修改个人信息 |

### 学生后台（6 页）`/dashboard/student`

| 页面 | 说明 |
|------|------|
| 总览 | 下节课、课时余额、本月统计、最近活动 |
| 我的课表 | 周视图课程安排 |
| 学习进度 | 课时完成记录、老师点评 |
| 预约管理 | 预约试课/补课 |
| 缴费记录 | 付款历史 |
| 个人设置 | 修改个人信息 |

### 管理员后台（8 页）`/dashboard/admin`

| 页面 | 说明 |
|------|------|
| 总览 | 数据看板（学生数、教师数、预约数、收入）+ 图表 |
| 教师管理 | CRUD |
| 学生管理 | CRUD |
| 课程管理 | 乐器、价格、排课 |
| 预约管理 | 审批试课预约 |
| 活动管理 | 活动 CRUD |
| 商品管理 | 商品 CRUD |
| 内容管理 | CMS 入口（待接入 Sanity） |

### API 路由（9 个）

| 路由 | 方法 | 说明 |
|------|------|------|
| `/api/auth/[...nextauth]` | GET/POST | 认证接口 |
| `/api/register` | POST | 用户注册 |
| `/api/teachers` | GET | 获取教师列表 |
| `/api/students` | GET | 获取学生列表 |
| `/api/bookings` | GET/POST | 预约管理 |
| `/api/lessons` | GET/POST | 课时记录 |
| `/api/schedules` | GET/POST | 课表管理 |
| `/api/notifications` | GET/PATCH | 通知管理 |
| `/api/admin/stats` | GET | 管理员数据统计 |

---

## 数据库模型

```
User              用户（邮箱、密码、姓名、角色、头像）
Teacher           教师（简介、校区、slug）
Student           学生（家长信息、年龄、级别）
Instrument        乐器（中英文名、图标）
TeacherInstrument 教师-乐器关联
Course            课程（乐器、教师、校区、价格）
Schedule          课表（教师、星期几、时段）
Booking           预约（学生、课程、日期、状态）
Lesson            课时记录（完成状态、笔记）
Event             活动（标题、时间、地点、票价）
Product           商品（名称、分类、价格、图片）
Notification      通知（类型、标题、已读状态）
```

---

## 设计风格

- **主色**: 米黄 `#f5f0e8`（背景）+ 中国红 `#8b2323`（强调）
- **辅色**: 深棕 `#3d2b1f`（文字）+ 金色 `#c5a55a`（点缀）
- **字体**: Playfair Display（英文）/ 思源宋体 Noto Serif SC（中文）
- **风格**: 中式意境，大量留白，水墨纹理
- **响应式**: 支持桌面 + 平板 + 手机

---

## 项目结构

```
src/
├── app/
│   ├── [locale]/           # i18n 路由（en/zh）
│   │   ├── page.tsx        # 首页
│   │   ├── about/          # 关于我们
│   │   ├── teachers/       # 师资团队
│   │   ├── lessons/        # 音乐课程
│   │   ├── orchestra/      # 加入乐团
│   │   ├── events/         # 活动
│   │   ├── news/           # 新闻
│   │   ├── shop/           # 商店
│   │   ├── booking/        # 预约试课
│   │   ├── contact/        # 联系我们
│   │   ├── career/         # 招聘
│   │   ├── performance-hire/
│   │   ├── login/          # 登录
│   │   ├── register/       # 注册
│   │   └── dashboard/      # 后台系统
│   │       ├── teacher/    #   教师后台（7页）
│   │       ├── student/    #   学生后台（6页）
│   │       └── admin/      #   管理员后台（8页）
│   └── api/                # API 路由（9个）
├── components/
│   ├── ui/                 # shadcn/ui 组件
│   ├── home/               # 首页各 section
│   ├── layout/             # Header, Footer
│   ├── dashboard/          # DashboardShell
│   └── providers/          # SessionProvider
├── i18n/                   # 国际化配置
├── lib/                    # 工具库（db, auth, data, utils）
├── messages/               # 翻译文件（en.json, zh.json）
└── generated/prisma/       # Prisma 生成的客户端（gitignored）
```

---

## 本地开发

```bash
# 安装依赖
npm install

# 配置环境变量
cp .env.example .env
# 编辑 .env 填入 DATABASE_URL, AUTH_SECRET 等

# 生成 Prisma 客户端
npx prisma generate

# 推送数据库 schema
npx prisma db push

# 填充初始数据
npx tsx prisma/seed.ts

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000

---

## 部署

项目已部署在 Vercel，数据库使用 Neon PostgreSQL。

```bash
# 通过 Vercel CLI 部署
vercel --prod
```

Vercel 环境变量：
- `DATABASE_URL` — Neon PostgreSQL 连接字符串（自动配置）
- `AUTH_SECRET` — NextAuth 加密密钥
- `AUTH_URL` — 站点 URL
- `NEXT_PUBLIC_APP_URL` — 公开站点 URL

---

## 后续规划

- [ ] Stripe 支付集成（课程缴费、商品购买）
- [ ] Sanity CMS 接入（新闻、活动内容管理）
- [ ] 邮件/短信通知
- [ ] SEO 优化
- [ ] 自定义域名绑定
