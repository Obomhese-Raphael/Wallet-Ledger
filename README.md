<div align="center">

# Wallet Ledger

**A full-stack digital wallet with double-entry ledger recording, atomic transfers, and downloadable receipts.**

Built with React, TypeScript, Node.js, Express, and MongoDB.

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

[Live Demo](https://wallet-ledger.vercel.app/) · [Report Bug](https://github.com/Obomhese-Raphael/wallet-ledger/issues)

</div>

---

## Overview

Wallet Ledger is a full-stack digital wallet application that lets users deposit funds, transfer money to other users by email lookup, and review a complete transaction history through a banking-inspired interface. Balances are backed by a **double-entry ledger**, and every wallet-mutating operation runs inside a MongoDB transaction session, so transfers are atomic and auditable rather than a single balance field being incremented and decremented.

## Features

**Authentication**
Registration, login, password hashing, JWT auth, protected routes, persistent sessions, password strength indicator.

**Dashboard**
Real-time wallet balance, quick stats, and fast access to deposit/transfer/history.

**Deposits**
Fund a wallet with validated amounts; every deposit creates a corresponding ledger entry.

**Transfers**
Recipient lookup by email, self-transfer prevention, balance verification, multi-step transfer flow, and an auto-generated bank-style downloadable receipt on success.

**Transaction history**
Searchable and filterable by type (deposit, transfer in, transfer out), with a detailed modal per transaction showing sender/recipient, reference, amount, status, description, and timestamp.

## Architecture

```
Wallet-Ledger/
├── frontend/                        React + TypeScript (Vite)
│   └── src/
│       ├── api/                     Axios instance & endpoint definitions
│       ├── components/
│       │   ├── auth/                Auth cards, layout, social login
│       │   ├── dashboard/           Balance card, stats, quick actions
│       │   ├── layout/              Sidebar, topbar, dashboard shell
│       │   ├── modals/              Transaction details, roadmap
│       │   ├── receipt/             Receipt generation & download
│       │   ├── transactions/        Transaction cards, stepper, stats
│       │   └── ui/                  Reusable primitives (Button, Input, Loader...)
│       ├── context/                 AuthContext
│       ├── pages/                   Login, Register, Dashboard, Deposit, Transfer, Transactions, Settings
│       ├── services/                Feature-scoped API calls
│       └── types/                   Shared frontend types
│
└── backend/                         Node.js + Express + TypeScript
    └── src/
        ├── controllers/             auth, account, transaction
        ├── services/                auth, account, ledger, transaction (business logic)
        ├── models/                  User, Account, Transaction, Ledger
        ├── middleware/               Auth guard, request validation
        ├── validators/               Zod schemas per domain
        ├── utils/                    JWT, hashing, response formatting, reference generation
        ├── config/                   DB connection
        ├── app.ts
        └── index.ts
```

## Tech stack

| Layer | Choices |
|---|---|
| Frontend | React, TypeScript, Vite, TanStack Query, React Router, Tailwind CSS, Framer Motion, Axios, React Hot Toast |
| Backend | Node.js, Express, TypeScript, Mongoose, Zod |
| Auth | JWT, bcrypt |
| Database | MongoDB Atlas, session-based transactions, double-entry ledger model |
| Deployment | Vercel (frontend), Render (backend), MongoDB Atlas (database) |

## Getting started

### Prerequisites
Node.js 18+, a MongoDB instance (local or Atlas).

### Clone and install

```bash
git clone https://github.com/Obomhese-Raphael/wallet-ledger.git
cd wallet-ledger
```

### Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/wallet-ledger
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=7d
```

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

```bash
npm run dev
```

## Security

- Passwords hashed with bcrypt, never stored or logged in plaintext
- JWT-protected routes with auth middleware on every wallet-mutating endpoint
- Server-side input validation with Zod, independent of client-side checks
- Balance verification and self-transfer prevention enforced server-side
- Wallet mutations wrapped in MongoDB session transactions for consistency
- `.env` gitignored; no secrets committed

## Roadmap (v1.1)

- [ ] OAuth (Google, GitHub)
- [ ] Email verification + forgot password
- [ ] Card payment integration
- [ ] Profile & account settings
- [ ] Notification center
- [ ] Dark mode
- [ ] Transaction export (CSV/PDF)
- [ ] Further mobile responsiveness polish

## Author

**Raphael Obomhese**
Full-Stack & Mobile Engineer

[GitHub](https://github.com/Obomhese-Raphael) · [LinkedIn](https://linkedin.com/in/obomheser) · [Portfolio](https://portfolioorm.vercel.app)
