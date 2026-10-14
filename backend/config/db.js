const mysql = require('mysql2/promise');

const realPool = mysql.createPool({
  host:               process.env.DB_HOST     || 'localhost',
  port:               parseInt(process.env.DB_PORT || '3306'),
  user:               process.env.DB_USER     || 'root',
  password:           process.env.DB_PASSWORD || '',
  database:           process.env.DB_NAME     || 'placement_portal',
  waitForConnections: true,
  connectionLimit:    10,
  queueLimit:         0,
  connectTimeout:     1500, // Quick timeout so fallback engages quickly if MySQL is down
});

let mysqlAvailable = false;
let hasLoggedOffline = false;

// Check MySQL connection on startup
realPool.getConnection()
  .then(conn => {
    mysqlAvailable = true;
    console.log('✅ MySQL connected successfully via connection pool');
    conn.release();
  })
  .catch(err => {
    mysqlAvailable = false;
    console.log('⚠️ Notice: MySQL server is not currently reachable (' + (err.code || err.message) + ').');
    console.log('⚡ Enabled built-in fallback mode: All portal features (Drives, Syllabus, Coding, Notes) will work seamlessly!');
  });

// ── In-Memory Seed Data for Fallback ──────────────────────────
let mockDrives = [
  { id: 1, company: 'Google', role: 'Software Engineer', package: '32 LPA', status: 'Applied', interview_date: '2026-11-20', notes: 'Prepare DSA Graphs & DP thoroughly', created_at: new Date() },
  { id: 2, company: 'Microsoft', role: 'Software Engineer - 1', package: '28 LPA', status: 'Interview', interview_date: '2026-10-28', notes: 'Round 1 System Design scheduled', created_at: new Date() },
  { id: 3, company: 'Amazon', role: 'SDE-1', package: '25 LPA', status: 'OA Completed', interview_date: null, notes: 'Completed HackerRank OA, waiting for results', created_at: new Date() },
  { id: 4, company: 'Atlassian', role: 'Graduate Engineer', package: '36 LPA', status: 'Wishlist', interview_date: null, notes: 'Referral requested on LinkedIn', created_at: new Date() }
];

let mockTopics = [
  // ── QUANTITATIVE APTITUDE ──
  { id: 1, subject: 'Quantitative Aptitude', topic: 'Number Systems, Divisibility & Remainder Theorem', status: 'Mastered', created_at: new Date() },
  { id: 2, subject: 'Quantitative Aptitude', topic: 'Percentages, Profit & Loss, Discounts', status: 'Mastered', created_at: new Date() },
  { id: 3, subject: 'Quantitative Aptitude', topic: 'Ratios, Proportions, Mixtures & Alligations', status: 'In Progress', created_at: new Date() },
  { id: 4, subject: 'Quantitative Aptitude', topic: 'Time, Speed & Distance, Relative Speed, Trains', status: 'In Progress', created_at: new Date() },
  { id: 5, subject: 'Quantitative Aptitude', topic: 'Time & Work, Pipes & Cisterns, Efficiency', status: 'Mastered', created_at: new Date() },
  { id: 6, subject: 'Quantitative Aptitude', topic: 'Permutations, Combinations & Probability', status: 'Not Started', created_at: new Date() },
  { id: 7, subject: 'Quantitative Aptitude', topic: 'Simple Interest & Compound Interest', status: 'Mastered', created_at: new Date() },
  { id: 8, subject: 'Quantitative Aptitude', topic: 'Averages, Weighted Averages & Age Problems', status: 'In Progress', created_at: new Date() },
  { id: 9, subject: 'Quantitative Aptitude', topic: 'Geometry, Mensuration (2D/3D) & Trigonometry', status: 'Not Started', created_at: new Date() },
  { id: 10, subject: 'Quantitative Aptitude', topic: 'Data Interpretation (Bar Graphs, Pie Charts, Tables)', status: 'In Progress', created_at: new Date() },

  // ── LOGICAL REASONING ──
  { id: 11, subject: 'Logical Reasoning', topic: 'Coding-Decoding, Letter & Number Series', status: 'Mastered', created_at: new Date() },
  { id: 12, subject: 'Logical Reasoning', topic: 'Blood Relations & Family Tree Deduction', status: 'Mastered', created_at: new Date() },
  { id: 13, subject: 'Logical Reasoning', topic: 'Direction Sense & Multi-Step Distance Tracking', status: 'Mastered', created_at: new Date() },
  { id: 14, subject: 'Logical Reasoning', topic: 'Linear & Circular Seating Arrangement', status: 'In Progress', created_at: new Date() },
  { id: 15, subject: 'Logical Reasoning', topic: 'Syllogisms & Venn Diagram Validations', status: 'In Progress', created_at: new Date() },
  { id: 16, subject: 'Logical Reasoning', topic: 'Puzzles, Ranking, Ordering & Matrix Match', status: 'Not Started', created_at: new Date() },
  { id: 17, subject: 'Logical Reasoning', topic: 'Clocks & Calendars (Angles, Leap Year Calculations)', status: 'In Progress', created_at: new Date() },
  { id: 18, subject: 'Logical Reasoning', topic: 'Data Sufficiency & Statement-Assumption Arguments', status: 'Not Started', created_at: new Date() },

  // ── VERBAL ABILITY & SOFT SKILLS ──
  { id: 19, subject: 'Verbal Ability', topic: 'Reading Comprehension & Critical Inferences', status: 'Mastered', created_at: new Date() },
  { id: 20, subject: 'Verbal Ability', topic: 'Sentence Correction & Grammar Rules (Subject-Verb)', status: 'Mastered', created_at: new Date() },
  { id: 21, subject: 'Verbal Ability', topic: 'Para Jumbles & Coherent Paragraph Reconstruction', status: 'In Progress', created_at: new Date() },
  { id: 22, subject: 'Verbal Ability', topic: 'Vocabulary, High-Frequency Synonyms & Antonyms', status: 'In Progress', created_at: new Date() },
  { id: 23, subject: 'Verbal Ability', topic: 'HR Behavioral Questions (STAR Method Framework)', status: 'Mastered', created_at: new Date() },

  // ── DATA STRUCTURES & ALGORITHMS (DSA) ──
  { id: 24, subject: 'DSA', topic: 'Arrays & Two Pointers / Prefix Sums', status: 'Mastered', created_at: new Date() },
  { id: 25, subject: 'DSA', topic: 'Strings & Sliding Window Techniques', status: 'Mastered', created_at: new Date() },
  { id: 26, subject: 'DSA', topic: 'Linked Lists (Reversal, Cycle Detection, Fast-Slow)', status: 'Mastered', created_at: new Date() },
  { id: 27, subject: 'DSA', topic: 'Stacks & Queues (Monotonic Stack & Sliding Window Max)', status: 'Mastered', created_at: new Date() },
  { id: 28, subject: 'DSA', topic: 'Trees & Binary Search Trees (LCA, Traversals, Views)', status: 'In Progress', created_at: new Date() },
  { id: 29, subject: 'DSA', topic: 'Heaps & Priority Queues (Top-K Elements, Median Finder)', status: 'In Progress', created_at: new Date() },
  { id: 30, subject: 'DSA', topic: 'Graphs (BFS, DFS, Dijkstra, Bellman-Ford, Topo Sort)', status: 'In Progress', created_at: new Date() },
  { id: 31, subject: 'DSA', topic: 'Dynamic Programming (1D, 2D Grid, Knapsack, LCS, LIS)', status: 'In Progress', created_at: new Date() },
  { id: 32, subject: 'DSA', topic: 'Backtracking & Recursion (N-Queens, Subsets, Sudoku)', status: 'Not Started', created_at: new Date() },
  { id: 33, subject: 'DSA', topic: 'Greedy Algorithms & Interval Scheduling', status: 'Mastered', created_at: new Date() },
  { id: 34, subject: 'DSA', topic: 'Tries & Bit Manipulation Techniques', status: 'Not Started', created_at: new Date() },

  // ── DATABASE MANAGEMENT SYSTEMS (DBMS) ──
  { id: 35, subject: 'DBMS', topic: 'ER Diagrams & Relational Schema Design', status: 'Mastered', created_at: new Date() },
  { id: 36, subject: 'DBMS', topic: 'Normalization (1NF, 2NF, 3NF, BCNF) & Dependencies', status: 'Mastered', created_at: new Date() },
  { id: 37, subject: 'DBMS', topic: 'Complex SQL Queries (Group By, Having, Subqueries)', status: 'Mastered', created_at: new Date() },
  { id: 38, subject: 'DBMS', topic: 'SQL Joins (Inner, Left, Right, Full, Cross)', status: 'Mastered', created_at: new Date() },
  { id: 39, subject: 'DBMS', topic: 'Transactions, ACID Properties & Isolation Levels', status: 'Mastered', created_at: new Date() },
  { id: 40, subject: 'DBMS', topic: 'Database Indexing, B-Trees & B+ Trees', status: 'In Progress', created_at: new Date() },
  { id: 41, subject: 'DBMS', topic: 'Concurrency Control, 2-Phase Locking (2PL) & Deadlocks', status: 'In Progress', created_at: new Date() },
  { id: 42, subject: 'DBMS', topic: 'NoSQL vs Relational Databases (MongoDB, Redis)', status: 'Not Started', created_at: new Date() },

  // ── OPERATING SYSTEMS (OS) ──
  { id: 43, subject: 'OS', topic: 'Processes, Threads & Context Switching Mechanism', status: 'Mastered', created_at: new Date() },
  { id: 44, subject: 'OS', topic: 'CPU Scheduling Algorithms (FCFS, SJF, Round Robin, Priority)', status: 'Mastered', created_at: new Date() },
  { id: 45, subject: 'OS', topic: 'Inter-Process Communication (IPC) & Shared Memory', status: 'In Progress', created_at: new Date() },
  { id: 46, subject: 'OS', topic: 'Process Synchronization, Mutex, Semaphores & Critical Section', status: 'In Progress', created_at: new Date() },
  { id: 47, subject: 'OS', topic: 'Deadlocks (Coffman Conditions, Prevention & Banker\'s Algorithm)', status: 'In Progress', created_at: new Date() },
  { id: 48, subject: 'OS', topic: 'Memory Management, Paging, Segmentation & TLB', status: 'Mastered', created_at: new Date() },
  { id: 49, subject: 'OS', topic: 'Virtual Memory & Page Replacement Policies (LRU, FIFO)', status: 'In Progress', created_at: new Date() },
  { id: 50, subject: 'OS', topic: 'File Systems, Inodes & Disk Scheduling (SCAN, C-LOOK)', status: 'Not Started', created_at: new Date() },

  // ── COMPUTER NETWORKS (CN) ──
  { id: 51, subject: 'CN', topic: 'OSI 7-Layer & TCP/IP Protocol Stack Reference Models', status: 'Mastered', created_at: new Date() },
  { id: 52, subject: 'CN', topic: 'IPv4 vs IPv6 Addressing, Subnetting & CIDR Masks', status: 'In Progress', created_at: new Date() },
  { id: 53, subject: 'CN', topic: 'TCP 3-Way Handshake, Flow Control & UDP Protocol', status: 'Mastered', created_at: new Date() },
  { id: 54, subject: 'CN', topic: 'Application Protocols: HTTP, HTTPS, SSL/TLS, DNS & DHCP', status: 'Mastered', created_at: new Date() },
  { id: 55, subject: 'CN', topic: 'Routing Algorithms (Dijkstra Link State vs Distance Vector)', status: 'Not Started', created_at: new Date() },
  { id: 56, subject: 'CN', topic: 'Network Security, Firewalls, NAT & WebSockets Basics', status: 'Not Started', created_at: new Date() },

  // ── OBJECT-ORIENTED PROGRAMMING (OOPs) ──
  { id: 57, subject: 'OOPs', topic: '4 Pillars: Encapsulation, Abstraction, Inheritance, Polymorphism', status: 'Mastered', created_at: new Date() },
  { id: 58, subject: 'OOPs', topic: 'Classes, Objects, Constructors, Destructors & Copy Semantics', status: 'Mastered', created_at: new Date() },
  { id: 59, subject: 'OOPs', topic: 'Method Overloading vs Overriding & Dynamic Binding', status: 'Mastered', created_at: new Date() },
  { id: 60, subject: 'OOPs', topic: 'Abstract Classes, Pure Virtual Functions & Interfaces', status: 'Mastered', created_at: new Date() },
  { id: 61, subject: 'OOPs', topic: 'SOLID Design Principles (Single Responsibility, Open/Closed)', status: 'In Progress', created_at: new Date() },
  { id: 62, subject: 'OOPs', topic: 'Creational & Structural Patterns (Singleton, Factory, Observer)', status: 'Not Started', created_at: new Date() },

  // ── SYSTEM DESIGN & ARCHITECTURE ──
  { id: 63, subject: 'System Design', topic: 'Client-Server Architecture, DNS & Reverse Proxies (Nginx)', status: 'In Progress', created_at: new Date() },
  { id: 64, subject: 'System Design', topic: 'Load Balancing (Round Robin, Least Connections, Consistent Hashing)', status: 'In Progress', created_at: new Date() },
  { id: 65, subject: 'System Design', topic: 'Horizontal vs Vertical Scaling & Stateless Architecture', status: 'Mastered', created_at: new Date() },
  { id: 66, subject: 'System Design', topic: 'Caching Strategies (Redis, Memcached, Eviction LRU/LFU)', status: 'In Progress', created_at: new Date() },
  { id: 67, subject: 'System Design', topic: 'Message Queues & Asynchronous Workers (Kafka, RabbitMQ)', status: 'Not Started', created_at: new Date() },
  { id: 68, subject: 'System Design', topic: 'Database Sharding, Replication, Master-Slave & CAP Theorem', status: 'Not Started', created_at: new Date() },
  { id: 69, subject: 'System Design', topic: 'Low-Level Design (LLD): Parking Lot & URL Shortener', status: 'Not Started', created_at: new Date() },

  // ── WEB DEVELOPMENT & FULL-STACK ──
  { id: 70, subject: 'Web Development', topic: 'HTML5 Semantic Tags & CSS3 Flexbox / Grid Responsive Layouts', status: 'Mastered', created_at: new Date() },
  { id: 71, subject: 'Web Development', topic: 'JavaScript ES6+: Closures, Event Loop, Promises, Async/Await', status: 'Mastered', created_at: new Date() },
  { id: 72, subject: 'Web Development', topic: 'React.js Core: State, Props, Hooks (useState, useEffect, useMemo)', status: 'Mastered', created_at: new Date() },
  { id: 73, subject: 'Web Development', topic: 'RESTful API Design: HTTP Methods, Status Codes & Idempotency', status: 'Mastered', created_at: new Date() },
  { id: 74, subject: 'Web Development', topic: 'User Authentication: JWT, Cookies, Sessions & CORS Policies', status: 'In Progress', created_at: new Date() }
];

let mockCoding = [
  { id: 1, platform: 'LeetCode', difficulty: 'Easy', count: 145, updated_at: new Date() },
  { id: 2, platform: 'LeetCode', difficulty: 'Medium', count: 98, updated_at: new Date() },
  { id: 3, platform: 'LeetCode', difficulty: 'Hard', count: 24, updated_at: new Date() },
  { id: 4, platform: 'GFG', difficulty: 'Easy', count: 80, updated_at: new Date() },
  { id: 5, platform: 'GFG', difficulty: 'Medium', count: 52, updated_at: new Date() },
  { id: 6, platform: 'GFG', difficulty: 'Hard', count: 12, updated_at: new Date() }
];

let mockNotes = [
  { id: 1, title: 'Top 10 DBMS Revision Points', content: '1. ACID Properties: Atomicity, Consistency, Isolation, Durability\n2. 2NF removes partial dependency, 3NF removes transitive dependency\n3. Clustered index sorts physical data rows, Non-clustered creates separate index pointers\n4. INNER JOIN vs LEFT JOIN differences', category: 'DBMS', created_at: new Date() },
  { id: 2, title: 'OS Process vs Thread', content: '• Process has its own address space, memory, file descriptors\n• Threads share memory of the parent process (faster context switching)\n• IPC mechanisms: Pipes, Shared Memory, Message Queues, Sockets', category: 'OS', created_at: new Date() },
  { id: 3, title: 'Amazon Leadership Principles Checklist', content: 'Customer Obsession, Ownership, Bias for Action, Deliver Results. Prepare STAR format answers with specific metrics for each.', category: 'Amazon', created_at: new Date() }
];

let nextId = 200;

// Universal query runner that uses real MySQL if available, or in-memory fallback
const pool = {
  getConnection: () => realPool.getConnection(),

  async query(sql, params = []) {
    if (mysqlAvailable) {
      try {
        return await realPool.query(sql, params);
      } catch (err) {
        if (['ECONNREFUSED', 'ETIMEDOUT', 'ENOTFOUND'].includes(err.code)) {
          mysqlAvailable = false;
        } else {
          throw err;
        }
      }
    }

    // Fallback in-memory handler
    const s = sql.trim();

    // ── DRIVES ──
    if (s.startsWith('SELECT * FROM drives WHERE id = ?')) {
      const row = mockDrives.find(d => d.id == params[0]);
      return [row ? [row] : [], []];
    }
    if (s.startsWith('SELECT * FROM drives')) {
      return [[...mockDrives].sort((a,b) => b.id - a.id), []];
    }
    if (s.startsWith('INSERT INTO drives')) {
      const [company, role, pkg, status, interview_date, notes] = params;
      const newDrive = { id: ++nextId, company, role, package: pkg, status, interview_date, notes, created_at: new Date() };
      mockDrives.unshift(newDrive);
      return [{ insertId: newDrive.id, affectedRows: 1 }, []];
    }
    if (s.startsWith('UPDATE drives SET')) {
      const [company, role, pkg, status, interview_date, notes, id] = params;
      const idx = mockDrives.findIndex(d => d.id == id);
      if (idx !== -1) {
        mockDrives[idx] = { ...mockDrives[idx], company, role, package: pkg, status, interview_date, notes };
        return [{ affectedRows: 1 }, []];
      }
      return [{ affectedRows: 0 }, []];
    }
    if (s.startsWith('DELETE FROM drives')) {
      const id = params[0];
      const prevLen = mockDrives.length;
      mockDrives = mockDrives.filter(d => d.id != id);
      return [{ affectedRows: prevLen !== mockDrives.length ? 1 : 0 }, []];
    }

    // ── TOPICS ──
    if (s.startsWith('SELECT * FROM prep_topics WHERE id = ?')) {
      const row = mockTopics.find(t => t.id == params[0]);
      return [row ? [row] : [], []];
    }
    if (s.startsWith('SELECT * FROM prep_topics')) {
      return [[...mockTopics], []];
    }
    if (s.startsWith('INSERT INTO prep_topics')) {
      const [subject, topic, status] = params;
      const newTopic = { id: ++nextId, subject, topic, status, created_at: new Date() };
      mockTopics.push(newTopic);
      return [{ insertId: newTopic.id, affectedRows: 1 }, []];
    }
    if (s.startsWith('UPDATE prep_topics SET')) {
      const [subject, topic, status, id] = params;
      const idx = mockTopics.findIndex(t => t.id == id);
      if (idx !== -1) {
        mockTopics[idx] = { ...mockTopics[idx], subject, topic, status };
        return [{ affectedRows: 1 }, []];
      }
      return [{ affectedRows: 0 }, []];
    }
    if (s.startsWith('DELETE FROM prep_topics')) {
      const id = params[0];
      const prevLen = mockTopics.length;
      mockTopics = mockTopics.filter(t => t.id != id);
      return [{ affectedRows: prevLen !== mockTopics.length ? 1 : 0 }, []];
    }

    // ── CODING ──
    if (s.startsWith('SELECT * FROM coding_progress WHERE platform=? AND difficulty=?')) {
      const [plat, diff] = params;
      const row = mockCoding.find(c => c.platform === plat && c.difficulty === diff);
      return [row ? [row] : [], []];
    }
    if (s.startsWith('SELECT * FROM coding_progress WHERE id = ?')) {
      const row = mockCoding.find(c => c.id == params[0]);
      return [row ? [row] : [], []];
    }
    if (s.startsWith('SELECT * FROM coding_progress')) {
      return [[...mockCoding], []];
    }
    if (s.startsWith('INSERT INTO coding_progress')) {
      const [platform, difficulty, count] = params;
      const existing = mockCoding.find(c => c.platform === platform && c.difficulty === difficulty);
      if (existing) {
        existing.count = count;
        return [{ insertId: existing.id, affectedRows: 1 }, []];
      }
      const newRow = { id: ++nextId, platform, difficulty, count, updated_at: new Date() };
      mockCoding.push(newRow);
      return [{ insertId: newRow.id, affectedRows: 1 }, []];
    }
    if (s.startsWith('UPDATE coding_progress SET count=?')) {
      const [count, id] = params;
      const idx = mockCoding.findIndex(c => c.id == id);
      if (idx !== -1) {
        mockCoding[idx].count = count;
        mockCoding[idx].updated_at = new Date();
        return [{ affectedRows: 1 }, []];
      }
      return [{ affectedRows: 0 }, []];
    }
    if (s.startsWith('DELETE FROM coding_progress')) {
      const id = params[0];
      const prevLen = mockCoding.length;
      mockCoding = mockCoding.filter(c => c.id != id);
      return [{ affectedRows: prevLen !== mockCoding.length ? 1 : 0 }, []];
    }

    // ── NOTES ──
    if (s.startsWith('SELECT * FROM interview_notes WHERE id = ?')) {
      const row = mockNotes.find(n => n.id == params[0]);
      return [row ? [row] : [], []];
    }
    if (s.startsWith('SELECT * FROM interview_notes')) {
      if (params.length > 0) {
        return [mockNotes.filter(n => n.category === params[0]), []];
      }
      return [[...mockNotes].sort((a,b) => b.id - a.id), []];
    }
    if (s.startsWith('INSERT INTO interview_notes')) {
      const [title, content, category] = params;
      const newNote = { id: ++nextId, title, content, category, created_at: new Date() };
      mockNotes.unshift(newNote);
      return [{ insertId: newNote.id, affectedRows: 1 }, []];
    }
    if (s.startsWith('DELETE FROM interview_notes')) {
      const id = params[0];
      const prevLen = mockNotes.length;
      mockNotes = mockNotes.filter(n => n.id != id);
      return [{ affectedRows: prevLen !== mockNotes.length ? 1 : 0 }, []];
    }

    return [[], []];
  }
};

module.exports = pool;
