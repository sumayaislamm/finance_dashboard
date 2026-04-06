# 📊 Finance Dashboard

A modern, responsive Personal Finance Dashboard built with React, Tailwind CSS, and Context API.
It allows users to track income, expenses, manage wallets, and gain meaningful insights into their financial activity.

---

## 🔗 Live Demo

👉 https://finance-dashboard-seven-eosin.vercel.app/

## 📂 Source Code

👉 https://github.com/sumayaislamm/finance_dashboard

---

## 🚀 Overview

This project was built as part of a Frontend Developer Internship assignment, focusing on:

* 🎨 Clean UI design
* 🧩 Component-based architecture
* 🔄 State management
* 📊 Data visualization
* 💡 User experience

The application simulates a real-world finance tracker using mock data + localStorage persistence.

---

## ✨ Features

### 📊 Dashboard Overview

* Displays Total Balance, Income, and Expenses
* Time-based Balance Trend (Line Chart)
* Category-based Expense Breakdown (Pie Chart)
* Financial health indicator (Good / Warning)

### 💸 Transactions Management

* Add, Edit, Delete transactions (Admin only)
* Search by category
* Filter by type (Income / Expense)
* Sort by:

  * Latest / Oldest
  * Amount (High → Low / Low → High)

### 💳 Wallet System

* Multiple wallet (card) support
* Assign transactions to wallets
* Real-time wallet balance calculation
* Wallet-wise transaction history

### 📈 Insights & Analytics

* Highest spending category
* Top 3 expense categories
* Monthly comparison (expense change %)
* Smart financial insights message
* Area chart for income vs expenses

### 📂 Categories Breakdown

* Income and Expense grouped by category
* Visual progress bars with percentage distribution

### 📑 Reports

* Monthly income & expense summary

Export data as:

* 📄 CSV
* 📦 JSON

---

## 👤 Role-Based UI (Simulated)

| Role      | Permissions                               |
| --------- | ----------------------------------------- |
| 👁 Viewer | Can only view data                        |
| 🛠 Admin  | Can manage transactions (Add/Edit/Delete) |

Role is stored in localStorage and applied globally.

---

## 🎨 UI & UX Highlights

* 📱 Fully responsive design
* 🎨 Tailwind CSS + DaisyUI
* ✨ Smooth page animations
* ⏳ Skeleton loading screen
* 🔔 Toast notifications (React Toastify)
* ❌ Clean error page handling
* 🌙 Dark mode toggle

---

## 🧱 Tech Stack

| Layer            | Technology             |
| ---------------- | ---------------------- |
| Frontend         | React (Vite)           |
| Styling          | Tailwind CSS + DaisyUI |
| Routing          | React Router           |
| State Management | Context API            |
| Charts           | Recharts               |
| Notifications    | React Toastify         |
| Storage          | localStorage           |
| Deployment       | Vercel                 |

---

## 📁 Project Structure

```
finance_dashboard/
├── public/
│   └── mockdata.json
├── src/
│   ├── components/
│   ├── context/
│   │   ├── RoleContext.jsx
│   │   ├── TransactionContext.jsx
│   │   └── WalletContext.jsx
│   ├── pages/
│   │   ├── Dashboard/
│   │   ├── Transactions/
│   │   ├── Wallets/
│   │   ├── Categories/
│   │   ├── Reports/
│   │   ├── Analytics/
│   │   └── Settings/
│   ├── Routes/
│   └── index.css
├── package.json
└── README.md
```

---

## ⚙️ Setup & Installation

```bash
# Clone the repository
git clone https://github.com/sumayaislamm/finance_dashboard.git

# Navigate into the project
cd finance_dashboard

# Install dependencies
npm install

# Run development server
npm run dev
```

👉 Open in browser:
http://localhost:5173

---

## 💾 Data Handling

* Initial data is loaded from mockdata.json
* All updates are saved in localStorage
* Data persists even after page refresh

---

## 🧠 Key Implementation Details

### 📌 Transaction Persistence

```js
useEffect(() => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}, [transactions]);
```

### 💳 Wallet Balance Calculation

```js
const balance = walletTx.reduce(
  (sum, t) => (t.type === "income" ? sum + t.amount : sum - t.amount),
  0
);
```

### 🔐 Role-Based UI Logic

* UI changes dynamically based on selected role
* Stored in localStorage for persistence

---

## 🎯 Assignment Requirements Coverage

| Requirement                       | Status                                           |
| --------------------------------- | ------------------------------------------------ |
| Dashboard Summary                 | ✅ Completed                                      |
| Transactions (Filter/Search/Sort) | ✅ Completed                                      |
| Role-Based UI                     | ✅ Completed                                      |
| Insights Section                  | ✅ Completed                                      |
| State Management                  | ✅ Completed                                      |
| Responsive UI                     | ✅ Completed                                      |
| Optional Features                 | ✅ Added (Export, Dark Mode, Wallets, Animations) |

---

## 🚀 Highlights

* Built with scalable component structure
* Clean separation of concerns using Context API
* Enhanced UX with animations and feedback
* Extended features beyond requirements (wallet system, export)

---

## 🙌 Acknowledgements

This project was built using:

* ⚛️ React + Vite
* 🎨 Tailwind CSS + DaisyUI
* 📊 Recharts
* 🔔 React Toastify

---

## 📬 Contact

📧 [sheikhsumaya622@gmail.com](mailto:sheikhsumaya622@gmail.com)

Feel free to connect or give feedback! 😊
