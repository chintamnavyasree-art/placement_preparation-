import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 2500 // Quick timeout so it fails over gracefully if backend is offline
});

// ── DEFAULT SEED DATA (Used when backend is offline or for standalone mode) ──
const DEFAULT_TOPICS = [
  // ── QUANTITATIVE APTITUDE ──
  { id: 1, subject: 'Quantitative Aptitude', topic: 'Number Systems, Divisibility & Remainder Theorem', status: 'Mastered', created_at: new Date().toISOString() },
  { id: 2, subject: 'Quantitative Aptitude', topic: 'Percentages, Profit & Loss, Discounts', status: 'Mastered', created_at: new Date().toISOString() },
  { id: 3, subject: 'Quantitative Aptitude', topic: 'Ratios, Proportions, Mixtures & Alligations', status: 'In Progress', created_at: new Date().toISOString() },
  { id: 4, subject: 'Quantitative Aptitude', topic: 'Time, Speed & Distance, Relative Speed, Trains', status: 'In Progress', created_at: new Date().toISOString() },
  { id: 5, subject: 'Quantitative Aptitude', topic: 'Time & Work, Pipes & Cisterns, Efficiency', status: 'Mastered', created_at: new Date().toISOString() },
  { id: 6, subject: 'Quantitative Aptitude', topic: 'Permutations, Combinations & Probability', status: 'Not Started', created_at: new Date().toISOString() },
  { id: 7, subject: 'Quantitative Aptitude', topic: 'Simple Interest & Compound Interest', status: 'Mastered', created_at: new Date().toISOString() },
  { id: 8, subject: 'Quantitative Aptitude', topic: 'Averages, Weighted Averages & Age Problems', status: 'In Progress', created_at: new Date().toISOString() },
  { id: 9, subject: 'Quantitative Aptitude', topic: 'Geometry, Mensuration (2D/3D) & Trigonometry', status: 'Not Started', created_at: new Date().toISOString() },
  { id: 10, subject: 'Quantitative Aptitude', topic: 'Data Interpretation (Bar Graphs, Pie Charts, Tables)', status: 'In Progress', created_at: new Date().toISOString() },

  // ── LOGICAL REASONING ──
  { id: 11, subject: 'Logical Reasoning', topic: 'Coding-Decoding, Letter & Number Series', status: 'Mastered', created_at: new Date().toISOString() },
  { id: 12, subject: 'Logical Reasoning', topic: 'Blood Relations & Family Tree Deduction', status: 'Mastered', created_at: new Date().toISOString() },
  { id: 13, subject: 'Logical Reasoning', topic: 'Direction Sense & Multi-Step Distance Tracking', status: 'Mastered', created_at: new Date().toISOString() },
  { id: 14, subject: 'Logical Reasoning', topic: 'Linear & Circular Seating Arrangement', status: 'In Progress', created_at: new Date().toISOString() },
  { id: 15, subject: 'Logical Reasoning', topic: 'Syllogisms & Venn Diagram Validations', status: 'In Progress', created_at: new Date().toISOString() },
  { id: 16, subject: 'Logical Reasoning', topic: 'Puzzles, Ranking, Ordering & Matrix Match', status: 'Not Started', created_at: new Date().toISOString() },
  { id: 17, subject: 'Logical Reasoning', topic: 'Clocks & Calendars (Angles, Leap Year Calculations)', status: 'In Progress', created_at: new Date().toISOString() },
  { id: 18, subject: 'Logical Reasoning', topic: 'Data Sufficiency & Statement-Assumption Arguments', status: 'Not Started', created_at: new Date().toISOString() },

  // ── VERBAL ABILITY & SOFT SKILLS ──
  { id: 19, subject: 'Verbal Ability', topic: 'Reading Comprehension & Critical Inferences', status: 'Mastered', created_at: new Date().toISOString() },
  { id: 20, subject: 'Verbal Ability', topic: 'Sentence Correction & Grammar Rules (Subject-Verb)', status: 'Mastered', created_at: new Date().toISOString() },
  { id: 21, subject: 'Verbal Ability', topic: 'Para Jumbles & Coherent Paragraph Reconstruction', status: 'In Progress', created_at: new Date().toISOString() },
  { id: 22, subject: 'Verbal Ability', topic: 'Vocabulary, High-Frequency Synonyms & Antonyms', status: 'In Progress', created_at: new Date().toISOString() },
  { id: 23, subject: 'Verbal Ability', topic: 'HR Behavioral Questions (STAR Method Framework)', status: 'Mastered', created_at: new Date().toISOString() },

  // ── DATA STRUCTURES & ALGORITHMS (DSA) ──
  { id: 24, subject: 'DSA', topic: 'Arrays & Two Pointers / Prefix Sums', status: 'Mastered', created_at: new Date().toISOString() },
  { id: 25, subject: 'DSA', topic: 'Strings & Sliding Window Techniques', status: 'Mastered', created_at: new Date().toISOString() },
  { id: 26, subject: 'DSA', topic: 'Linked Lists (Reversal, Cycle Detection, Fast-Slow)', status: 'Mastered', created_at: new Date().toISOString() },
  { id: 27, subject: 'DSA', topic: 'Stacks & Queues (Monotonic Stack & Sliding Window Max)', status: 'Mastered', created_at: new Date().toISOString() },
  { id: 28, subject: 'DSA', topic: 'Trees & Binary Search Trees (LCA, Traversals, Views)', status: 'In Progress', created_at: new Date().toISOString() },
  { id: 29, subject: 'DSA', topic: 'Heaps & Priority Queues (Top-K Elements, Median Finder)', status: 'In Progress', created_at: new Date().toISOString() },
  { id: 30, subject: 'DSA', topic: 'Graphs (BFS, DFS, Dijkstra, Bellman-Ford, Topo Sort)', status: 'In Progress', created_at: new Date().toISOString() },
  { id: 31, subject: 'DSA', topic: 'Dynamic Programming (1D, 2D Grid, Knapsack, LCS, LIS)', status: 'In Progress', created_at: new Date().toISOString() },
  { id: 32, subject: 'DSA', topic: 'Backtracking & Recursion (N-Queens, Subsets, Sudoku)', status: 'Not Started', created_at: new Date().toISOString() },
  { id: 33, subject: 'DSA', topic: 'Greedy Algorithms & Interval Scheduling', status: 'Mastered', created_at: new Date().toISOString() },
  { id: 34, subject: 'DSA', topic: 'Tries & Bit Manipulation Techniques', status: 'Not Started', created_at: new Date().toISOString() },

  // ── DATABASE MANAGEMENT SYSTEMS (DBMS) ──
  { id: 35, subject: 'DBMS', topic: 'ER Diagrams & Relational Schema Design', status: 'Mastered', created_at: new Date().toISOString() },
  { id: 36, subject: 'DBMS', topic: 'Normalization (1NF, 2NF, 3NF, BCNF) & Dependencies', status: 'Mastered', created_at: new Date().toISOString() },
  { id: 37, subject: 'DBMS', topic: 'Complex SQL Queries (Group By, Having, Subqueries)', status: 'Mastered', created_at: new Date().toISOString() },
  { id: 38, subject: 'DBMS', topic: 'SQL Joins (Inner, Left, Right, Full, Cross)', status: 'Mastered', created_at: new Date().toISOString() },
  { id: 39, subject: 'DBMS', topic: 'Transactions, ACID Properties & Isolation Levels', status: 'Mastered', created_at: new Date().toISOString() },
  { id: 40, subject: 'DBMS', topic: 'Database Indexing, B-Trees & B+ Trees', status: 'In Progress', created_at: new Date().toISOString() },
  { id: 41, subject: 'DBMS', topic: 'Concurrency Control, 2-Phase Locking (2PL) & Deadlocks', status: 'In Progress', created_at: new Date().toISOString() },
  { id: 42, subject: 'DBMS', topic: 'NoSQL vs Relational Databases (MongoDB, Redis)', status: 'Not Started', created_at: new Date().toISOString() },

  // ── OPERATING SYSTEMS (OS) ──
  { id: 43, subject: 'OS', topic: 'Processes, Threads & Context Switching Mechanism', status: 'Mastered', created_at: new Date().toISOString() },
  { id: 44, subject: 'OS', topic: 'CPU Scheduling Algorithms (FCFS, SJF, Round Robin, Priority)', status: 'Mastered', created_at: new Date().toISOString() },
  { id: 45, subject: 'OS', topic: 'Inter-Process Communication (IPC) & Shared Memory', status: 'In Progress', created_at: new Date().toISOString() },
  { id: 46, subject: 'OS', topic: 'Process Synchronization, Mutex, Semaphores & Critical Section', status: 'In Progress', created_at: new Date().toISOString() },
  { id: 47, subject: 'OS', topic: 'Deadlocks (Coffman Conditions, Prevention & Banker\'s Algorithm)', status: 'In Progress', created_at: new Date().toISOString() },
  { id: 48, subject: 'OS', topic: 'Memory Management, Paging, Segmentation & TLB', status: 'Mastered', created_at: new Date().toISOString() },
  { id: 49, subject: 'OS', topic: 'Virtual Memory & Page Replacement Policies (LRU, FIFO)', status: 'In Progress', created_at: new Date().toISOString() },
  { id: 50, subject: 'OS', topic: 'File Systems, Inodes & Disk Scheduling (SCAN, C-LOOK)', status: 'Not Started', created_at: new Date().toISOString() },

  // ── COMPUTER NETWORKS (CN) ──
  { id: 51, subject: 'CN', topic: 'OSI 7-Layer & TCP/IP Protocol Stack Reference Models', status: 'Mastered', created_at: new Date().toISOString() },
  { id: 52, subject: 'CN', topic: 'IPv4 vs IPv6 Addressing, Subnetting & CIDR Masks', status: 'In Progress', created_at: new Date().toISOString() },
  { id: 53, subject: 'CN', topic: 'TCP 3-Way Handshake, Flow Control & UDP Protocol', status: 'Mastered', created_at: new Date().toISOString() },
  { id: 54, subject: 'CN', topic: 'Application Protocols: HTTP, HTTPS, SSL/TLS, DNS & DHCP', status: 'Mastered', created_at: new Date().toISOString() },
  { id: 55, subject: 'CN', topic: 'Routing Algorithms (Dijkstra Link State vs Distance Vector)', status: 'Not Started', created_at: new Date().toISOString() },
  { id: 56, subject: 'CN', topic: 'Network Security, Firewalls, NAT & WebSockets Basics', status: 'Not Started', created_at: new Date().toISOString() },

  // ── OBJECT-ORIENTED PROGRAMMING (OOPs) ──
  { id: 57, subject: 'OOPs', topic: '4 Pillars: Encapsulation, Abstraction, Inheritance, Polymorphism', status: 'Mastered', created_at: new Date().toISOString() },
  { id: 58, subject: 'OOPs', topic: 'Classes, Objects, Constructors, Destructors & Copy Semantics', status: 'Mastered', created_at: new Date().toISOString() },
  { id: 59, subject: 'OOPs', topic: 'Method Overloading vs Overriding & Dynamic Binding', status: 'Mastered', created_at: new Date().toISOString() },
  { id: 60, subject: 'OOPs', topic: 'Abstract Classes, Pure Virtual Functions & Interfaces', status: 'Mastered', created_at: new Date().toISOString() },
  { id: 61, subject: 'OOPs', topic: 'SOLID Design Principles (Single Responsibility, Open/Closed)', status: 'In Progress', created_at: new Date().toISOString() },
  { id: 62, subject: 'OOPs', topic: 'Creational & Structural Patterns (Singleton, Factory, Observer)', status: 'Not Started', created_at: new Date().toISOString() },

  // ── SYSTEM DESIGN & ARCHITECTURE ──
  { id: 63, subject: 'System Design', topic: 'Client-Server Architecture, DNS & Reverse Proxies (Nginx)', status: 'In Progress', created_at: new Date().toISOString() },
  { id: 64, subject: 'System Design', topic: 'Load Balancing (Round Robin, Least Connections, Consistent Hashing)', status: 'In Progress', created_at: new Date().toISOString() },
  { id: 65, subject: 'System Design', topic: 'Horizontal vs Vertical Scaling & Stateless Architecture', status: 'Mastered', created_at: new Date().toISOString() },
  { id: 66, subject: 'System Design', topic: 'Caching Strategies (Redis, Memcached, Eviction LRU/LFU)', status: 'In Progress', created_at: new Date().toISOString() },
  { id: 67, subject: 'System Design', topic: 'Message Queues & Asynchronous Workers (Kafka, RabbitMQ)', status: 'Not Started', created_at: new Date().toISOString() },
  { id: 68, subject: 'System Design', topic: 'Database Sharding, Replication, Master-Slave & CAP Theorem', status: 'Not Started', created_at: new Date().toISOString() },
  { id: 69, subject: 'System Design', topic: 'Low-Level Design (LLD): Parking Lot & URL Shortener', status: 'Not Started', created_at: new Date().toISOString() },

  // ── WEB DEVELOPMENT & FULL-STACK ──
  { id: 70, subject: 'Web Development', topic: 'HTML5 Semantic Tags & CSS3 Flexbox / Grid Responsive Layouts', status: 'Mastered', created_at: new Date().toISOString() },
  { id: 71, subject: 'Web Development', topic: 'JavaScript ES6+: Closures, Event Loop, Promises, Async/Await', status: 'Mastered', created_at: new Date().toISOString() },
  { id: 72, subject: 'Web Development', topic: 'React.js Core: State, Props, Hooks (useState, useEffect, useMemo)', status: 'Mastered', created_at: new Date().toISOString() },
  { id: 73, subject: 'Web Development', topic: 'RESTful API Design: HTTP Methods, Status Codes & Idempotency', status: 'Mastered', created_at: new Date().toISOString() },
  { id: 74, subject: 'Web Development', topic: 'User Authentication: JWT, Cookies, Sessions & CORS Policies', status: 'In Progress', created_at: new Date().toISOString() }
];

const DEFAULT_DRIVES = [
  { id: 1, company: 'Google', role: 'Software Engineer', package: '32 LPA', status: 'Applied', interview_date: '2026-11-20', notes: 'Prepare DSA Graphs & DP thoroughly', created_at: new Date().toISOString() },
  { id: 2, company: 'Microsoft', role: 'Software Engineer - 1', package: '28 LPA', status: 'Interview', interview_date: '2026-10-28', notes: 'Round 1 System Design scheduled', created_at: new Date().toISOString() },
  { id: 3, company: 'Amazon', role: 'SDE-1', package: '25 LPA', status: 'OA Completed', interview_date: null, notes: 'Completed HackerRank OA, waiting for results', created_at: new Date().toISOString() },
  { id: 4, company: 'Atlassian', role: 'Graduate Engineer', package: '36 LPA', status: 'Wishlist', interview_date: null, notes: 'Referral requested on LinkedIn', created_at: new Date().toISOString() }
];

const DEFAULT_CODING = [
  { id: 1, platform: 'LeetCode', difficulty: 'Easy', count: 145, updated_at: new Date().toISOString() },
  { id: 2, platform: 'LeetCode', difficulty: 'Medium', count: 98, updated_at: new Date().toISOString() },
  { id: 3, platform: 'LeetCode', difficulty: 'Hard', count: 24, updated_at: new Date().toISOString() },
  { id: 4, platform: 'GFG', difficulty: 'Easy', count: 80, updated_at: new Date().toISOString() },
  { id: 5, platform: 'GFG', difficulty: 'Medium', count: 52, updated_at: new Date().toISOString() },
  { id: 6, platform: 'GFG', difficulty: 'Hard', count: 12, updated_at: new Date().toISOString() }
];

const DEFAULT_NOTES = [
  { id: 1, title: 'Top 10 DBMS Revision Points', content: '1. ACID Properties: Atomicity, Consistency, Isolation, Durability\n2. 2NF removes partial dependency, 3NF removes transitive dependency\n3. Clustered index sorts physical data rows, Non-clustered creates separate index pointers\n4. INNER JOIN vs LEFT JOIN differences', category: 'DBMS', created_at: new Date().toISOString() },
  { id: 2, title: 'OS Process vs Thread', content: '• Process has its own address space, memory, file descriptors\n• Threads share memory of the parent process (faster context switching)\n• IPC mechanisms: Pipes, Shared Memory, Message Queues, Sockets', category: 'OS', created_at: new Date().toISOString() },
  { id: 3, title: 'Amazon Leadership Principles Checklist', content: 'Customer Obsession, Ownership, Bias for Action, Deliver Results. Prepare STAR format answers with specific metrics for each.', category: 'Amazon', created_at: new Date().toISOString() }
];

// Helper to access LocalStorage with fallback
function getLocal(key, defaultVal) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(defaultVal));
      return defaultVal;
    }
    return JSON.parse(raw);
  } catch {
    return defaultVal;
  }
}

function setLocal(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }
}

// ── 1. DRIVES API (With Offline Fallback) ───────────────────
export const getDrives = async () => {
  try {
    const res = await api.get('/drives');
    if (Array.isArray(res.data) && res.data.length > 0) {
      setLocal('portal_drives', res.data);
      return res;
    }
  } catch (err) {
    console.info('Backend unreachable, using local storage for Drives:', err.message);
  }
  return { data: getLocal('portal_drives', DEFAULT_DRIVES) };
};

export const createDrive = async (data) => {
  try {
    const res = await api.post('/drives', data);
    return res;
  } catch {
    const list = getLocal('portal_drives', DEFAULT_DRIVES);
    const newEntry = { id: Date.now(), ...data, created_at: new Date().toISOString() };
    const updated = [newEntry, ...list];
    setLocal('portal_drives', updated);
    return { data: newEntry };
  }
};

export const updateDrive = async (id, d) => {
  try {
    const res = await api.put(`/drives/${id}`, d);
    return res;
  } catch {
    const list = getLocal('portal_drives', DEFAULT_DRIVES);
    const updated = list.map(item => item.id === id ? { ...item, ...d } : item);
    setLocal('portal_drives', updated);
    return { data: updated.find(item => item.id === id) };
  }
};

export const deleteDrive = async (id) => {
  try {
    const res = await api.delete(`/drives/${id}`);
    return res;
  } catch {
    const list = getLocal('portal_drives', DEFAULT_DRIVES);
    const updated = list.filter(item => item.id !== id);
    setLocal('portal_drives', updated);
    return { data: { success: true } };
  }
};

// ── 2. SYLLABUS TOPICS API (With Guaranteed Fallback) ───────
export const getTopics = async () => {
  try {
    const res = await api.get('/topics');
    if (Array.isArray(res.data) && res.data.length > 0) {
      setLocal('portal_topics', res.data);
      return res;
    }
  } catch (err) {
    console.info('Backend unreachable, using local storage for Syllabus:', err.message);
  }
  return { data: getLocal('portal_topics', DEFAULT_TOPICS) };
};

export const createTopic = async (data) => {
  try {
    const res = await api.post('/topics', data);
    return res;
  } catch {
    const list = getLocal('portal_topics', DEFAULT_TOPICS);
    const newEntry = { id: Date.now(), ...data, created_at: new Date().toISOString() };
    const updated = [...list, newEntry];
    setLocal('portal_topics', updated);
    return { data: newEntry };
  }
};

export const updateTopic = async (id, d) => {
  try {
    const res = await api.put(`/topics/${id}`, d);
    return res;
  } catch {
    const list = getLocal('portal_topics', DEFAULT_TOPICS);
    const updated = list.map(item => item.id === id ? { ...item, ...d } : item);
    setLocal('portal_topics', updated);
    return { data: updated.find(item => item.id === id) };
  }
};

export const deleteTopic = async (id) => {
  try {
    const res = await api.delete(`/topics/${id}`);
    return res;
  } catch {
    const list = getLocal('portal_topics', DEFAULT_TOPICS);
    const updated = list.filter(item => item.id !== id);
    setLocal('portal_topics', updated);
    return { data: { success: true } };
  }
};

// ── 3. CODING PROGRESS API (With Offline Fallback) ───────────
export const getCoding = async () => {
  try {
    const res = await api.get('/coding');
    if (Array.isArray(res.data) && res.data.length > 0) {
      setLocal('portal_coding', res.data);
      return res;
    }
  } catch (err) {
    console.info('Backend unreachable, using local storage for Coding:', err.message);
  }
  return { data: getLocal('portal_coding', DEFAULT_CODING) };
};

export const createCoding = async (data) => {
  try {
    const res = await api.post('/coding', data);
    return res;
  } catch {
    const list = getLocal('portal_coding', DEFAULT_CODING);
    const newEntry = { id: Date.now(), ...data, updated_at: new Date().toISOString() };
    const updated = [...list, newEntry];
    setLocal('portal_coding', updated);
    return { data: newEntry };
  }
};

export const updateCoding = async (id, d) => {
  try {
    const res = await api.put(`/coding/${id}`, d);
    return res;
  } catch {
    const list = getLocal('portal_coding', DEFAULT_CODING);
    const updated = list.map(item => item.id === id ? { ...item, ...d } : item);
    setLocal('portal_coding', updated);
    return { data: updated.find(item => item.id === id) };
  }
};

export const deleteCoding = async (id) => {
  try {
    const res = await api.delete(`/coding/${id}`);
    return res;
  } catch {
    const list = getLocal('portal_coding', DEFAULT_CODING);
    const updated = list.filter(item => item.id !== id);
    setLocal('portal_coding', updated);
    return { data: { success: true } };
  }
};

// ── 4. NOTES HUB API (With Offline Fallback) ────────────────
export const getNotes = async (cat) => {
  try {
    const res = await api.get('/notes', { params: cat ? { category: cat } : {} });
    if (Array.isArray(res.data)) {
      setLocal('portal_notes', res.data);
      return res;
    }
  } catch (err) {
    console.info('Backend unreachable, using local storage for Notes:', err.message);
  }
  const allNotes = getLocal('portal_notes', DEFAULT_NOTES);
  const filtered = cat ? allNotes.filter(n => n.category === cat) : allNotes;
  return { data: filtered };
};

export const createNote = async (data) => {
  try {
    const res = await api.post('/notes', data);
    return res;
  } catch {
    const list = getLocal('portal_notes', DEFAULT_NOTES);
    const newEntry = { id: Date.now(), ...data, created_at: new Date().toISOString() };
    const updated = [newEntry, ...list];
    setLocal('portal_notes', updated);
    return { data: newEntry };
  }
};

export const deleteNote = async (id) => {
  try {
    const res = await api.delete(`/notes/${id}`);
    return res;
  } catch {
    const list = getLocal('portal_notes', DEFAULT_NOTES);
    const updated = list.filter(item => item.id !== id);
    setLocal('portal_notes', updated);
    return { data: { success: true } };
  }
};
