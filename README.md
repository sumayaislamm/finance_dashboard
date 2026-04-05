📊 Finance Dashboard

A responsive and interactive Personal Finance Dashboard built with React, Tailwind CSS, and modern frontend patterns.
This project helps users track income & expenses, manage multiple wallets, and gain insights into their financial activity — all in a sleek dashboard UI.

Live Demo: https://finance-dashboard-seven-eosin.vercel.app/

Source Code: https://github.com/sumayaislamm/finance_dashboard

🚀 Features
✅ Core Functionality
📅 Dashboard Overview
Shows total income, total expenses, and net balance
Visual charts for expense by category and trend over time
💰 Transactions Management
Add, edit, and delete transactions (Admin only)
Filter by category and type (income/expense)
Sort transactions (latest, oldest, amount)
🏦 Multiple Wallets Support
Add and manage wallets
Assign transactions to wallets
Real-time wallet balance update based on linked transactions
📈 Insights and Analytics
Highest spending category
Monthly comparisons and trend charts
🎨 UI & UX Highlights
Tailwind CSS for rapid, responsive styling
Full-page skeleton loader with shimmer effect
Toast notifications using React Toastify
Clean error page and loading state handling
Mobile-friendly layout and smooth navigation
🧱 Tech Stack
Layer	Technology
Frontend	React (Vite)
Styling	Tailwind CSS
Routing	React Router DOM
State Management	React Context API
Notifications	React Toastify
Data Storage	Browser localStorage
Charts	Recharts
Deployment	Vercel
📁 Project Structure (Simplified)
finance_dashboard/
├── public/
│   ├── index.html
│   └── mockdata.json
├── src/
│   ├── components/
│   ├── context/
│   │   ├── WalletContext.jsx
│   │   ├── TransactionContext.jsx
│   │   └── RoleContext.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Wallets.jsx
│   │   └── Transactions.jsx
│   ├── Routes/
│   ├── App.css
│   └── index.jsx
├── package.json
├── vite.config.js
└── README.md
📌 Setup & Installation

Clone the repository:

git clone https://github.com/sumayaislamm/finance_dashboard.git
cd finance_dashboard

Install dependencies:

npm install

Run the development server:

npm run dev

Open the app in your browser:

http://localhost:3000
💾 How Data Works
On first load, transactions are loaded from mockdata.json
All user changes (add/edit/delete) are stored in localStorage
Wallet balances are computed dynamically from transactions
Data persists between page reloads thanks to localStorage
🧠 Key Implementation Details
🧩 Transaction Storage

Transactions are centralized in the TransactionContext, and persist using:

useEffect(() => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}, [transactions]);

This ensures all user interactions are stored locally for persistence even after reload.

✨ Wallet Balance Logic

Wallet balances are computed in WalletContext, mapping transactions to wallet totals at runtime:

const walletsWithBalance = wallets.map(wallet => {
  const walletTx = transactions.filter(t => t.walletId === wallet.id);
  const balance = walletTx.reduce(
    (sum, t) => (t.type === "income" ? sum + t.amount : sum - t.amount),
    0
  );
  return { ...wallet, balance };
});
🤝 Role-Based Access
Viewer: Can browse transactions and dashboard
Admin: Can add/edit/delete transactions and manage financial records

Toggle roles via the Settings panel.

🎯 Potential Improvements

Here are some enhancements you can consider:

Integrate a backend API for real user authentication
Add Dark Mode support
Export reports (PDF/Excel)
Add date range filtering
Add recurring transactions
📝 License

This project is open-source and available under the MIT License.

🙌 Acknowledgements

This project was built with:

React & Vite
Tailwind CSS
React Toastify
Recharts
And a lot of learning along the way 😄