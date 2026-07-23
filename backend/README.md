# 💰 Wallet Ledger API

A **production-inspired Digital Wallet REST API** built with **Node.js**, **Express**, **TypeScript**, and **MongoDB**.

The application implements a **double-entry ledger accounting system**, ensuring every financial transaction is balanced and auditable.

---

## ✨ Features

- 🔐 JWT Authentication
- 👤 User Registration & Login
- 👛 Automatic Wallet Creation
- 🏦 Account-based Ledger System
- 💰 Deposit Money
- 💸 Withdraw Money
- 🔄 Transfer Money Between Users
- 📊 Real-time Wallet Balance Calculation
- 📜 Transaction History
- 🔍 Transaction Details
- 📄 Swagger API Documentation
- ✅ Request Validation using Zod

---

# 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express | REST API |
| TypeScript | Type Safety |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| Zod | Validation |
| Swagger | API Documentation |
| bcrypt | Password Hashing |

---

# 📁 Project Structure

```text
src
│
├── config/
├── controllers/
├── docs/
├── middleware/
├── models/
├── routes/
├── scripts/
├── services/
├── utils/
├── validators/
├── app.ts
└── index.ts
```

---

# 🚀 Installation

Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY>
```

Move into the backend folder

```bash
cd backend
```

Install dependencies

```bash
npm install
```

---

# ⚙️ Environment Variables

Create a `.env` file.

```env
PORT=5000

MONGO_URI=mongodb://localhost:27017/wallet-ledger

JWT_SECRET=your-super-secret-key

JWT_EXPIRES_IN=7d
```

---

# ▶️ Running the Project

Development

```bash
npm run dev
```

Production

```bash
npm run build

npm start
```

---

# 🌱 Seed System Accounts

Run

```bash
npm run seed
```

This creates the required system accounts used by the double-entry ledger.

---

# 📖 API Documentation

Swagger UI

```
http://localhost:5000/api-docs
```

---

# 🔐 Authentication

Login returns a JWT.

Example

```text
Authorization: Bearer YOUR_TOKEN
```

Use this token for all protected endpoints.

---

# 📌 API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | /api/v1/auth/register |
| POST | /api/v1/auth/login |

---

## Wallet

| Method | Endpoint |
|---------|----------|
| GET | /api/v1/wallet |
| GET | /api/v1/wallet/balance |
| POST | /api/v1/wallet/withdraw |
| POST | /api/v1/wallet/transfer |

---

## Transactions

| Method | Endpoint |
|---------|----------|
| POST | /api/v1/transaction/deposit |
| GET | /api/v1/transaction |
| GET | /api/v1/transaction/:id |

---

# 💳 Double Entry Accounting

Every money movement creates **two ledger entries**.

Example Deposit

```text
Debit  → System Cash Account

Credit → User Wallet Account
```

Example Withdrawal

```text
Debit  → User Wallet Account

Credit → System Cash Account
```

Example Transfer

```text
Debit  → Sender Wallet

Credit → Recipient Wallet
```

This guarantees that:

```
Total Debits = Total Credits
```

for every transaction.

---

# 📊 Database Collections

- Users
- Wallets
- Accounts
- Transactions
- LedgerEntries

---

# 🧪 Testing

The API can be tested using:

- Postman
- Swagger UI

---

# 🚧 Future Improvements

- Email Verification
- Password Reset
- Refresh Tokens
- Role-Based Access Control
- Rate Limiting
- Docker Support
- Unit Tests
- CI/CD Pipeline

---

# 👨‍💻 Author

**Raphael Obomhese**

Built with ❤️ using Node.js, Express, TypeScript, and MongoDB.