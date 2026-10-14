# 🎯 Personal Placement Preparation Portal

A full-stack web application designed for students and graduates to streamline, track, and master campus placement and off-campus recruitment preparation.

Built with a **React** frontend, **Node.js/Express** backend, and **MySQL** database (with an automated in-memory fallback adapter).

---

## ✨ Key Features

1. **🏢 Placement Drive Tracker**
   - Full CRUD management for target company hiring drives.
   - Status pipeline tracking: *Wishlist ➔ Applied ➔ OA Completed ➔ Interview ➔ Selected ➔ Rejected*.
   - Target compensation (CTC in LPA), role designation, interview scheduling calendar, and interview notes.

2. **📚 Comprehensive Syllabus & CS Checklist (74 Topics Across 10 Subjects)**
   - **🧮 Quantitative Aptitude:** Number systems, percentages, ratios, time-speed-distance, work-time, probability, and data interpretation.
   - **🧩 Logical Reasoning:** Coding-decoding, blood relations, seating arrangements, syllogisms, and puzzles.
   - **🗣️ Verbal Ability:** Reading comprehension, grammar rules, para jumbles, vocabulary, and STAR interview questions.
   - **🌳 Core DSA:** Arrays, strings, linked lists, stacks, trees, heaps, graphs, dynamic programming, and greedy algorithms.
   - **🗄️ Database Management (DBMS):** Relational schema, normalization (1NF–BCNF), complex SQL joins, indexing, and ACID transactions.
   - **⚙️ Operating Systems (OS):** Processes, threads, CPU scheduling, semaphores/mutex, deadlocks, and virtual memory paging.
   - **🌐 Computer Networks (CN):** OSI/TCP-IP models, IP addressing, TCP vs UDP, DNS, and HTTP/HTTPS.
   - **📦 OOPs & Design Patterns:** 4 pillars of OOP, inheritance, polymorphism, SOLID principles, and design patterns.
   - **🏗️ System Design & Architecture:** Low-Level Design (LLD), High-Level Design (HLD), caching (Redis), message queues (Kafka), and scalability.
   - **💻 Web Development:** Modern JavaScript ES6+, React.js hooks, RESTful API conventions, and authentication.
   - Interactive subject filters, keyword search, expand/collapse all, and one-click status cycling (*Not Started ➔ In Progress ➔ Mastered*).

3. **💻 Coding Progress Tracker**
   - Track problem counts across LeetCode, GeeksforGeeks, and competitive programming platforms.
   - Live counter adjustments (`+` / `−`) broken down by difficulty: **Easy**, **Medium**, and **Hard**.

4. **📝 Interview Notes Hub**
   - Save quick revision cheat-sheets, core concepts, and company-specific interview logs.
   - Categorized by subject tag or target company (e.g., Google, Amazon, DBMS, OS).

5. **🔔 Job & Drive Alerts Center**
   - Real-time notification feed of active hiring drives, eligibility cutoffs, CTC brackets, and application deadlines.

6. **🎨 Pleasant, Calm & Inspiring Blue Theme Landing Page**
   - Serene blue theme featured picture symbolizing career heights.
   - Top-left project logo and top-right student profile modal.
   - Bottom **"Get Help ?"** guidance modal with DSA roadmaps and OA test tips.

---

## 🛠️ Technology Stack

- **Frontend:** React 19, React Hooks, CSS3 Custom Properties, Responsive Layouts, Axios
- **Backend:** Node.js, Express.js, CORS, Dotenv, REST API architecture
- **Database:** MySQL (`mysql2/promise` connection pool) with dual-mode transparent fallback

---

## 🚀 Quick Start Guide

### 1. Clone the Repository
```bash
git clone <repository-url>
cd myapp
```

### 2. Backend Setup
```bash
cd backend
npm install
npm start
```
*The backend runs at `http://localhost:5000`.*

### 3. Frontend Setup
In a new terminal window at the project root:
```bash
npm install
npm start
```
*The frontend runs at `http://localhost:3000`.*

### 4. Database Setup (Optional)
If you have local MySQL running on port 3306:
```bash
mysql -u root -p < schema.sql
```
*(If MySQL is not installed or offline, the backend automatically engages its built-in in-memory fallback adapter so all features work seamlessly out of the box!)*

---

## 📄 License
MIT License. Built for placement aspirants and students.
