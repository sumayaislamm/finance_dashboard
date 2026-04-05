# 💰 Finance Dashboard

A modern and interactive **Finance Dashboard** built with React that helps users track, analyze, and understand their financial activities through clean UI and meaningful insights.

---

## 🚀 Live Demo



---

## 📌 Overview

This project simulates a real-world financial dashboard where users can:

* Monitor overall financial health
* Explore transactions
* Analyze spending patterns
* Gain actionable insights

The application focuses on **frontend architecture, state management, and user experience**, without relying on a backend.

---

## ✨ Features

### 📊 Dashboard Overview

* Total Balance, Income, and Expense summary cards
* 📈 Line chart showing financial trends over time
* 🥧 Pie chart for expense distribution by category

---

### 💳 Transactions Management

* View all transactions in a structured table
* Add, edit, and delete transactions (Admin only)
* Search by category
* Filter by type (income/expense)
* Sort by latest, oldest, or amount

---

### 🔐 Role-Based UI (RBAC Simulation)

* **Viewer** → Can only view data
* **Admin** → Can add, edit, and delete transactions
* Role switching implemented via dropdown

---

### 🧠 Insights & Analytics

* Highest spending category with percentage
* Top 3 expense categories
* Month-to-month expense comparison
* Smart financial insights based on user data
* 📊 Area chart comparing income vs expenses over time

---

### 📁 Reports & Export

* Monthly financial reports
* Export data as:

  * CSV
  * JSON

---


### 💼 Wallet System

* Create and manage multiple wallets
* Track balance, income, and expenses per wallet

---

### 💾 Data Persistence

* LocalStorage used to persist:

  * Transactions
  * Wallets
  * User role

---

## 🛠️ Tech Stack

* **Frontend:** React
* **Routing:** React Router
* **State Management:** Context API
* **Charts:** Recharts
* **Styling:** Tailwind CSS + DaisyUI
* **Icons:** React Icons

---

## 📂 Project Structure

```
src/
│── components/
│── context/
│── pages/
│   ├── Dashboard/
│   ├── Transactions/
│   ├── Analytics (Insights)
│   ├── Reports/
│   ├── Wallets/
│   ├── Settings/
│── Routes/
│── App.jsx
│── main.jsx
```

---

## ⚙️ Installation & Setup

1. Clone the repository:

```bash
git clone 
```

2. Navigate to project folder:

```bash
cd finance-dashboard
```

3. Install dependencies:

```bash
npm install
```

4. Run the development server:

```bash
npm run dev
```

---

## 📱 Responsiveness

* Fully responsive layout
* Works on mobile, tablet, and desktop

---

## 🎯 Key Highlights

* Clean and intuitive UI
* Real-time state synchronization using Context API
* Modular and scalable component structure
* Meaningful financial insights (not just raw data)
* Handles empty states and loading states

---

## ⚠️ Assumptions

* No backend integration (mock/local data used)
* Role-based access is simulated on frontend only

---

## 🔮 Future Improvements


* Backend integration (Firebase / Node.js)
* Authentication system
* Advanced filtering & analytics
* Budget tracking

---

## 📜 License

This project is for educational and evaluation purposes.

---

## 🙋‍♂️ Author

Sumaya Islam

* GitHub: 
* LinkedIn: 

---

## ⭐ Final Note

This project demonstrates my ability to design and build a **functional, scalable, and user-friendly dashboard interface**, focusing on real-world usability and clean frontend architecture.
