-- ============================================================
--  Personal Placement Preparation Portal — MySQL Schema
--  Run:  mysql -u root -p < schema.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS placement_portal
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE placement_portal;

-- ─────────────────────────────────────────────
--  1. PLACEMENT DRIVE TRACKER
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS drives (
  id             INT           NOT NULL AUTO_INCREMENT,
  company        VARCHAR(100)  NOT NULL,
  role           VARCHAR(100)  NOT NULL,
  package        VARCHAR(50)   DEFAULT NULL COMMENT 'e.g. 12 LPA',
  status         ENUM(
                   'Wishlist',
                   'Applied',
                   'OA Completed',
                   'Interview',
                   'Selected',
                   'Rejected'
                 ) NOT NULL DEFAULT 'Wishlist',
  interview_date DATE          DEFAULT NULL,
  notes          TEXT          DEFAULT NULL,
  created_at     TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─────────────────────────────────────────────
--  2. SYLLABUS & CORE CS CHECKLIST
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS prep_topics (
  id         INT           NOT NULL AUTO_INCREMENT,
  subject    VARCHAR(100)  NOT NULL COMMENT 'e.g. DSA, DBMS, OS, CN',
  topic      VARCHAR(200)  NOT NULL COMMENT 'e.g. Binary Search Trees',
  status     ENUM(
               'Not Started',
               'In Progress',
               'Mastered'
             ) NOT NULL DEFAULT 'Not Started',
  created_at TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed default syllabus topics
INSERT INTO prep_topics (subject, topic, status) VALUES
  -- QUANTITATIVE APTITUDE
  ('Quantitative Aptitude', 'Number Systems, Divisibility & Remainder Theorem', 'Not Started'),
  ('Quantitative Aptitude', 'Percentages, Profit & Loss, Discounts', 'Not Started'),
  ('Quantitative Aptitude', 'Ratios, Proportions, Mixtures & Alligations', 'Not Started'),
  ('Quantitative Aptitude', 'Time, Speed & Distance, Relative Speed, Trains', 'Not Started'),
  ('Quantitative Aptitude', 'Time & Work, Pipes & Cisterns, Efficiency', 'Not Started'),
  ('Quantitative Aptitude', 'Permutations, Combinations & Probability', 'Not Started'),
  ('Quantitative Aptitude', 'Simple Interest & Compound Interest', 'Not Started'),
  ('Quantitative Aptitude', 'Averages, Weighted Averages & Age Problems', 'Not Started'),
  ('Quantitative Aptitude', 'Geometry, Mensuration (2D/3D) & Trigonometry', 'Not Started'),
  ('Quantitative Aptitude', 'Data Interpretation (Bar Graphs, Pie Charts, Tables)', 'Not Started'),

  -- LOGICAL REASONING
  ('Logical Reasoning', 'Coding-Decoding, Letter & Number Series', 'Not Started'),
  ('Logical Reasoning', 'Blood Relations & Family Tree Deduction', 'Not Started'),
  ('Logical Reasoning', 'Direction Sense & Multi-Step Distance Tracking', 'Not Started'),
  ('Logical Reasoning', 'Linear & Circular Seating Arrangement', 'Not Started'),
  ('Logical Reasoning', 'Syllogisms & Venn Diagram Validations', 'Not Started'),
  ('Logical Reasoning', 'Puzzles, Ranking, Ordering & Matrix Match', 'Not Started'),
  ('Logical Reasoning', 'Clocks & Calendars (Angles, Leap Year Calculations)', 'Not Started'),
  ('Logical Reasoning', 'Data Sufficiency & Statement-Assumption Arguments', 'Not Started'),

  -- VERBAL ABILITY & SOFT SKILLS
  ('Verbal Ability', 'Reading Comprehension & Critical Inferences', 'Not Started'),
  ('Verbal Ability', 'Sentence Correction & Grammar Rules (Subject-Verb)', 'Not Started'),
  ('Verbal Ability', 'Para Jumbles & Coherent Paragraph Reconstruction', 'Not Started'),
  ('Verbal Ability', 'Vocabulary, High-Frequency Synonyms & Antonyms', 'Not Started'),
  ('Verbal Ability', 'HR Behavioral Questions (STAR Method Framework)', 'Not Started'),

  -- DSA
  ('DSA', 'Arrays & Two Pointers / Prefix Sums', 'Not Started'),
  ('DSA', 'Strings & Sliding Window Techniques', 'Not Started'),
  ('DSA', 'Linked Lists (Reversal, Cycle Detection, Fast-Slow)', 'Not Started'),
  ('DSA', 'Stacks & Queues (Monotonic Stack & Sliding Window Max)', 'Not Started'),
  ('DSA', 'Trees & Binary Search Trees (LCA, Traversals, Views)', 'Not Started'),
  ('DSA', 'Heaps & Priority Queues (Top-K Elements, Median Finder)', 'Not Started'),
  ('DSA', 'Graphs (BFS, DFS, Dijkstra, Bellman-Ford, Topo Sort)', 'Not Started'),
  ('DSA', 'Dynamic Programming (1D, 2D Grid, Knapsack, LCS, LIS)', 'Not Started'),
  ('DSA', 'Backtracking & Recursion (N-Queens, Subsets, Sudoku)', 'Not Started'),
  ('DSA', 'Greedy Algorithms & Interval Scheduling', 'Not Started'),
  ('DSA', 'Tries & Bit Manipulation Techniques', 'Not Started'),

  -- DBMS
  ('DBMS', 'ER Diagrams & Relational Schema Design', 'Not Started'),
  ('DBMS', 'Normalization (1NF, 2NF, 3NF, BCNF) & Dependencies', 'Not Started'),
  ('DBMS', 'Complex SQL Queries (Group By, Having, Subqueries)', 'Not Started'),
  ('DBMS', 'SQL Joins (Inner, Left, Right, Full, Cross)', 'Not Started'),
  ('DBMS', 'Transactions, ACID Properties & Isolation Levels', 'Not Started'),
  ('DBMS', 'Database Indexing, B-Trees & B+ Trees', 'Not Started'),
  ('DBMS', 'Concurrency Control, 2-Phase Locking (2PL) & Deadlocks', 'Not Started'),
  ('DBMS', 'NoSQL vs Relational Databases (MongoDB, Redis)', 'Not Started'),

  -- OS
  ('OS', 'Processes, Threads & Context Switching Mechanism', 'Not Started'),
  ('OS', 'CPU Scheduling Algorithms (FCFS, SJF, Round Robin, Priority)', 'Not Started'),
  ('OS', 'Inter-Process Communication (IPC) & Shared Memory', 'Not Started'),
  ('OS', 'Process Synchronization, Mutex, Semaphores & Critical Section', 'Not Started'),
  ('OS', 'Deadlocks (Coffman Conditions, Prevention & Banker\'s Algorithm)', 'Not Started'),
  ('OS', 'Memory Management, Paging, Segmentation & TLB', 'Not Started'),
  ('OS', 'Virtual Memory & Page Replacement Policies (LRU, FIFO)', 'Not Started'),
  ('OS', 'File Systems, Inodes & Disk Scheduling (SCAN, C-LOOK)', 'Not Started'),

  -- CN
  ('CN', 'OSI 7-Layer & TCP/IP Protocol Stack Reference Models', 'Not Started'),
  ('CN', 'IPv4 vs IPv6 Addressing, Subnetting & CIDR Masks', 'Not Started'),
  ('CN', 'TCP 3-Way Handshake, Flow Control & UDP Protocol', 'Not Started'),
  ('CN', 'Application Protocols: HTTP, HTTPS, SSL/TLS, DNS & DHCP', 'Not Started'),
  ('CN', 'Routing Algorithms (Dijkstra Link State vs Distance Vector)', 'Not Started'),
  ('CN', 'Network Security, Firewalls, NAT & WebSockets Basics', 'Not Started'),

  -- OBJECT-ORIENTED PROGRAMMING (OOPs)
  ('OOPs', '4 Pillars: Encapsulation, Abstraction, Inheritance, Polymorphism', 'Not Started'),
  ('OOPs', 'Classes, Objects, Constructors, Destructors & Copy Semantics', 'Not Started'),
  ('OOPs', 'Method Overloading vs Overriding & Dynamic Binding', 'Not Started'),
  ('OOPs', 'Abstract Classes, Pure Virtual Functions & Interfaces', 'Not Started'),
  ('OOPs', 'SOLID Design Principles (Single Responsibility, Open/Closed)', 'Not Started'),
  ('OOPs', 'Creational & Structural Patterns (Singleton, Factory, Observer)', 'Not Started'),

  -- SYSTEM DESIGN & ARCHITECTURE
  ('System Design', 'Client-Server Architecture, DNS & Reverse Proxies (Nginx)', 'Not Started'),
  ('System Design', 'Load Balancing (Round Robin, Least Connections, Consistent Hashing)', 'Not Started'),
  ('System Design', 'Horizontal vs Vertical Scaling & Stateless Architecture', 'Not Started'),
  ('System Design', 'Caching Strategies (Redis, Memcached, Eviction LRU/LFU)', 'Not Started'),
  ('System Design', 'Message Queues & Asynchronous Workers (Kafka, RabbitMQ)', 'Not Started'),
  ('System Design', 'Database Sharding, Replication, Master-Slave & CAP Theorem', 'Not Started'),
  ('System Design', 'Low-Level Design (LLD): Parking Lot & URL Shortener', 'Not Started'),

  -- WEB DEVELOPMENT & FULL-STACK
  ('Web Development', 'HTML5 Semantic Tags & CSS3 Flexbox / Grid Responsive Layouts', 'Not Started'),
  ('Web Development', 'JavaScript ES6+: Closures, Event Loop, Promises, Async/Await', 'Not Started'),
  ('Web Development', 'React.js Core: State, Props, Hooks (useState, useEffect, useMemo)', 'Not Started'),
  ('Web Development', 'RESTful API Design: HTTP Methods, Status Codes & Idempotency', 'Not Started'),
  ('Web Development', 'User Authentication: JWT, Cookies, Sessions & CORS Policies', 'Not Started');

-- ─────────────────────────────────────────────
--  3. CODING PROGRESS TRACKER
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS coding_progress (
  id         INT          NOT NULL AUTO_INCREMENT,
  platform   VARCHAR(50)  NOT NULL COMMENT 'e.g. LeetCode, GFG, CodeChef',
  difficulty ENUM('Easy', 'Medium', 'Hard') NOT NULL,
  count      INT          NOT NULL DEFAULT 0,
  updated_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
               ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_platform_diff (platform, difficulty)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed default rows for LeetCode and GFG
INSERT INTO coding_progress (platform, difficulty, count) VALUES
  ('LeetCode', 'Easy',   0),
  ('LeetCode', 'Medium', 0),
  ('LeetCode', 'Hard',   0),
  ('GFG',      'Easy',   0),
  ('GFG',      'Medium', 0),
  ('GFG',      'Hard',   0);

-- ─────────────────────────────────────────────
--  4. INTERVIEW NOTES HUB
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS interview_notes (
  id         INT          NOT NULL AUTO_INCREMENT,
  title      VARCHAR(200) NOT NULL,
  content    TEXT         NOT NULL,
  category   VARCHAR(100) DEFAULT 'General' COMMENT 'topic or company tag',
  created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
--  END OF SCHEMA
-- ============================================================
