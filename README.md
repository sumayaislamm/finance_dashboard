📊 Finance Dashboard

A modern, responsive Personal Finance Dashboard built with React, Tailwind CSS, and Context API.
It allows users to track income, expenses, manage wallets, and gain meaningful insights into their financial activity.

🔗 Live Demo

👉 https://finance-dashboard-seven-eosin.vercel.app/

📂 Source Code

👉 https://github.com/sumayaislamm/finance_dashboard

🚀 Overview

This project was built as part of a Frontend Developer Internship assignment, focusing on:

🎨 Clean UI design.

🧩 Component-based architecture.

🔄 State management.

📊 Data visualization.

💡 User experience.

The application simulates a real-world finance tracker using mock data + localStorage persistence.

##Features: 

*** Dashboard Overview ***

1. Displays Total Balance, Income, and Expenses.

2. Time-based Balance Trend (Line Chart)

3. Category-based Expense Breakdown (Pie Chart)

4.  Financial health indicator (Good / Warning)

*** Transactions Management ***

1. Add, Edit, Delete transactions (Admin only)

2. Search by category

3. Filter by type (Income / Expense)

4. Sort by: Latest / Oldest , Amount (High → Low / Low → High)


*** Wallet System ***

1. Multiple wallet (card) support

2. Assign transactions to wallets

3. Real-time wallet balance calculation 

4 .Wallet-wise transaction history.


*** Insights & Analytics ***

1. Highest spending category 

2. Top 3 expense categories

3. Monthly comparison (expense change %)

4. Smart financial insights message

5. Area chart for income vs expenses

*** Categories Breakdown ***

1. Income and Expense grouped by category. 

2. Visual progress bars with percentage distribution


*** Reports ***

1. Monthly income & expense summary

2. Export data as:
📄 CSV
📦 JSON
👤 Role-Based UI (Simulated)

*** Role	Permissions ***
👁 Viewer	Can only view data
🛠 Admin	Can manage transactions (Add/Edit/Delete)

Role is stored in localStorage and applied globally.

***🎨 UI & UX Highlights ***
📱 Fully responsive design

🎨 Tailwind CSS + DaisyUI

✨ Smooth page animations

⏳ Skeleton loading screen

🔔 Toast notifications (React Toastify)

❌ Clean error page handling

🌙 Dark mode toggle

🧱 Tech Stack

### Layer	Technology ###
# Frontend	React (Vite)
# Styling	Tailwind CSS + DaisyUI
# Routing	React Router
# State Management	Context API
# Charts	Recharts
# Notifications	React Toastify
# Storage	localStorage
# Deployment	Vercel


### 📁 Project Structure
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
⚙️ Setup & Installation
# Clone the repository
git clone https://github.com/sumayaislamm/finance_dashboard.git

# Navigate into the project
cd finance_dashboard

# Install dependencies
npm install

# Run development server
npm run dev

👉 Open in browser:
http://localhost:5173

### 💾 Data Handling
# Initial data is loaded from mockdata.json
# All updates are saved in localStorage
# Data persists even after page refresh
### 🧠 Key Implementation Details
# 📌 Transaction Persistence
useEffect(() => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}, [transactions]);
# 💳 Wallet Balance Calculation
const balance = walletTx.reduce(
  (sum, t) => (t.type === "income" ? sum + t.amount : sum - t.amount),
  0
);
### 🔐 Role-Based UI Logic
UI changes dynamically based on selected role
Stored in localStorage for persistence


### 🎯 Assignment Requirements Coverage
# Requirement	Status
# Dashboard Summary	✅ Completed
# Transactions (Filter/Search/Sort)	✅ Completed
# Role-Based UI	✅ Completed
# Insights Section	✅ Completed
# State Management	✅ Completed
# Responsive UI	✅ Completed
# Optional Features	✅ Added (Export, Dark Mode, Wallets, Animations)



### 🚀 Highlights

Built with scalable component structure

Clean separation of concerns using Context API

Enhanced UX with animations and feedback

Extended features beyond requirements (wallet system, export)

🙌 Acknowledgements

# This project was built using:

⚛️ React + Vite
🎨 Tailwind CSS + DaisyUI
📊 Recharts
🔔 React Toastify


#### 📬 Contact
sheikhsumaya622@gmail.com
Feel free to connect or give feedback! 😊