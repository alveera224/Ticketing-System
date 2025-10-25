# 🎫 IT Support Ticket Management System

<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange?style=for-the-badge&logo=mysql)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)

**A comprehensive full-stack web application for managing IT support tickets with real-time analytics and modern UI**

[🚀 Live Demo](#-quick-start) • [📖 Documentation](#-features) • [🛠️ Setup](#-setup-instructions) • [💼 Resume Ready](#-resume-description)

</div>

---

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Setup Instructions](#-setup-instructions)
- [📊 API Documentation](#-api-documentation)
- [🎨 Screenshots](#-screenshots)
- [💼 Resume Description](#-resume-description)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)

---

## 🎯 Overview

The **IT Support Ticket Management System** is a production-ready, full-stack web application designed to streamline IT support operations. Built with modern technologies, it provides a comprehensive solution for ticket management, real-time analytics, and team collaboration.

### 🎯 Key Highlights

- **📊 Real-time Analytics Dashboard** - Track KPIs and performance metrics
- **🔍 Advanced Search & Filtering** - Find tickets instantly across multiple fields
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **⚡ High Performance** - Optimized database queries and efficient API design
- **🎨 Modern UI/UX** - Beautiful interface with smooth animations

---

## ✨ Features

### 🎫 Ticket Management
- ✅ **Complete CRUD Operations** - Create, read, update, and delete tickets
- ✅ **Auto-generated Ticket IDs** - Unique identifiers (TKT-001, TKT-002, etc.)
- ✅ **Priority Management** - High, Medium, Low priority levels
- ✅ **Status Tracking** - Open, In Progress, Resolved workflow
- ✅ **Category Organization** - Database, API, Access, Hardware, Software
- ✅ **Assignee Management** - Track ticket ownership

### 📊 Analytics & Reporting
- ✅ **Real-time Dashboard** - Live statistics and metrics
- ✅ **Performance Tracking** - Average resolution times
- ✅ **Status Distribution** - Visual breakdown of ticket statuses
- ✅ **Trend Analysis** - Historical data insights

### 🔍 Search & Filtering
- ✅ **Global Search** - Search across title, description, and ticket ID
- ✅ **Status Filtering** - Filter by Open, In Progress, Resolved
- ✅ **Priority Filtering** - Filter by High, Medium, Low priority
- ✅ **Category Filtering** - Filter by ticket categories
- ✅ **Real-time Results** - Instant search results

### 🎨 User Experience
- ✅ **Modern UI Design** - Clean, professional interface
- ✅ **Responsive Layout** - Mobile-first design approach
- ✅ **Smooth Animations** - Engaging user interactions
- ✅ **Color-coded Status** - Visual status indicators
- ✅ **Intuitive Navigation** - Easy-to-use interface

---

## 🏗️ Architecture

### 🏛️ System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend │◄──►│  Express.js API │◄──►│   MySQL Database│
│   (Port 3000)   │    │   (Port 5000)   │    │   (Port 3306)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 📁 Project Structure

```
support-ticket-system/
├── 📁 backend/                    # Node.js Backend
│   ├── 📄 server.js               # Express server configuration
│   ├── 📄 db.js                   # MySQL database connection
│   ├── 📁 routes/
│   │   └── 📄 tickets.js          # API routes and controllers
│   └── 📄 package.json            # Backend dependencies
├── 📁 frontend/                   # React Frontend
│   ├── 📁 src/
│   │   ├── 📄 App.js              # Main React component
│   │   ├── 📄 App.css             # Modern CSS styling
│   │   ├── 📄 api.js              # API integration layer
│   │   ├── 📄 index.js            # React entry point
│   │   └── 📄 index.css           # Base styles
│   ├── 📁 public/
│   │   └── 📄 index.html          # HTML template
│   └── 📄 package.json            # Frontend dependencies
├── 📁 database/                   # Database Schema
│   └── 📄 schema.sql              # MySQL schema and sample data
└── 📄 README.md                   # Project documentation
```

### 🗄️ Database Schema

```sql
-- Core Tickets Table
CREATE TABLE tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_id VARCHAR(20) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    priority ENUM('Low', 'Medium', 'High') DEFAULT 'Medium',
    status ENUM('Open', 'In Progress', 'Resolved') DEFAULT 'Open',
    category VARCHAR(50) NOT NULL,
    assignee VARCHAR(100) DEFAULT 'Unassigned',
    created_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Analytics View for Performance
CREATE VIEW ticket_analytics AS
SELECT 
    COUNT(*) as total_tickets,
    SUM(CASE WHEN status = 'Open' THEN 1 ELSE 0 END) as open_tickets,
    SUM(CASE WHEN status = 'In Progress' THEN 1 ELSE 0 END) as in_progress,
    SUM(CASE WHEN status = 'Resolved' THEN 1 ELSE 0 END) as resolved_tickets,
    AVG(DATEDIFF(updated_at, created_at)) as avg_resolution_days
FROM tickets;
```

---

## 🛠️ Setup Instructions

### 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0 or higher) - [Download here](https://nodejs.org/)
- **MySQL** (v8.0 or higher) - [Download here](https://dev.mysql.com/downloads/)
- **npm** or **yarn** package manager
- **Git** for version control

### 🚀 Quick Start

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/support-ticket-system.git
cd support-ticket-system
```

#### 2️⃣ Database Setup

1. **Start MySQL Server**
   ```bash
   # Windows
   net start mysql
   
   # macOS/Linux
   sudo systemctl start mysql
   ```

2. **Create Database and Tables**
   ```bash
   mysql -u root -p < database/schema.sql
   ```

3. **Verify Database Setup**
   ```bash
   mysql -u root -p
   USE support_ticket_db;
   SHOW TABLES;
   ```

#### 3️⃣ Backend Setup

1. **Navigate to Backend Directory**
   ```bash
   cd backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Database Connection**
   
   Update `backend/db.js` with your MySQL credentials:
   ```javascript
   const pool = mysql.createPool({
     host: 'localhost',
     user: 'root',
     password: 'your_mysql_password',  // Update this
     database: 'support_ticket_db',
     waitForConnections: true,
     connectionLimit: 10,
     queueLimit: 0
   });
   ```

4. **Start Backend Server**
   ```bash
   npm start
   # Server runs on http://localhost:5000
   ```

#### 4️⃣ Frontend Setup

1. **Navigate to Frontend Directory**
   ```bash
   cd frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start React Development Server**
   ```bash
   npm start
   # Frontend runs on http://localhost:3000
   ```

#### 5️⃣ Access the Application

- **Frontend Application**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

---

## 📊 API Documentation

### 🎫 Tickets Endpoints

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| `GET` | `/api/tickets` | Get all tickets | `?status=Open&priority=High&search=keyword` |
| `GET` | `/api/tickets/:id` | Get single ticket | `id` (ticket ID) |
| `POST` | `/api/tickets` | Create new ticket | `title`, `description`, `priority`, `category` |
| `PUT` | `/api/tickets/:id` | Update ticket | `status`, `assignee`, `priority` |
| `DELETE` | `/api/tickets/:id` | Delete ticket | `id` (ticket ID) |

### 📈 Analytics Endpoints

| Method | Endpoint | Description | Response |
|--------|----------|-------------|----------|
| `GET` | `/api/tickets/analytics/stats` | Get ticket statistics | `{total_tickets, open_tickets, in_progress, resolved_tickets, avg_resolution_days}` |

### 🔍 Example API Calls

#### Create a New Ticket
```bash
curl -X POST http://localhost:5000/api/tickets \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Server Performance Issue",
    "description": "Server response time is slow during peak hours",
    "priority": "High",
    "category": "Performance"
  }'
```

#### Search Tickets
```bash
curl "http://localhost:5000/api/tickets?search=database&status=Open&priority=High"
```

#### Get Analytics
```bash
curl http://localhost:5000/api/tickets/analytics/stats
```

---

## 🎨 Screenshots

### 📊 Analytics Dashboard
![Analytics Dashboard](https://via.placeholder.com/800x400/667eea/ffffff?text=Analytics+Dashboard)

### 🎫 Ticket Management
![Ticket Management](https://via.placeholder.com/800x400/764ba2/ffffff?text=Ticket+Management)

### 📱 Mobile Responsive
![Mobile View](https://via.placeholder.com/400x600/4299e1/ffffff?text=Mobile+Responsive)

---

## 💼 Resume Description

### 🎯 Professional Summary

**IT Support Ticket Management System** - Full-stack web application built with React, Node.js, Express.js, and MySQL for streamlining IT support operations with real-time analytics and modern UI.

### 📝 Resume Bullet Points

```markdown
• Developed full-stack support ticket management system with MySQL database integration, 
  RESTful APIs, and real-time analytics dashboard tracking 4+ KPIs (total tickets, 
  open, in-progress, resolved) for stakeholder reporting

• Implemented CRUD operations with advanced search and filtering capabilities using 
  Express.js backend, enabling support teams to efficiently manage and prioritize 
  tickets based on status, priority, and category

• Built responsive React frontend with intuitive UI for ticket creation, tracking, 
  and analytics visualization, demonstrating strong problem-solving skills and 
  full-stack development expertise

• Designed normalized MySQL schema with proper indexing and created SQL views for 
  efficient analytics calculation, optimizing query performance and data integrity

• Integrated RESTful API architecture following REST conventions with comprehensive 
  error handling, validation, and proper HTTP status codes for production readiness
```

### 🎯 Interview Talking Points

1. **Database Design**: "I designed a normalized MySQL schema with proper indexing and created a view for analytics to optimize query performance."

2. **API Development**: "Built RESTful APIs following REST conventions with proper error handling and validation."

3. **Problem Solving**: "Implemented advanced search functionality using SQL LIKE queries across multiple fields for better user experience."

4. **Analytics**: "Created a SQL view for efficient analytics calculation and real-time dashboard updates."

5. **Full Stack Integration**: "Seamlessly integrated React frontend with Express backend using proper API design patterns."

---

## 🚀 Deployment

### 🌐 Production Deployment

#### 1. Build Frontend
```bash
cd frontend
npm run build
```

#### 2. Environment Variables
Create `.env` file in backend directory:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_production_password
DB_NAME=support_ticket_db
PORT=5000
NODE_ENV=production
```

#### 3. Process Management
```bash
# Install PM2 for process management
npm install -g pm2

# Start application
pm2 start backend/server.js --name "ticket-system"
pm2 startup
pm2 save
```

#### 4. Web Server Configuration
Configure your web server (Nginx/Apache) to serve the built React app and proxy API requests to the Node.js backend.

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the Repository**
   ```bash
   git fork https://github.com/yourusername/support-ticket-system.git
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Changes**
   - Write clean, documented code
   - Follow existing code style
   - Add tests for new features

4. **Commit Changes**
   ```bash
   git commit -m "Add amazing feature"
   ```

5. **Push to Branch**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Create Pull Request**
   - Describe your changes
   - Link any related issues
   - Request review from maintainers

### 🐛 Bug Reports

Found a bug? Please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

### 💡 Feature Requests

Have an idea? We'd love to hear it! Please include:
- Detailed description of the feature
- Use cases and benefits
- Mockups or examples if possible

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **React Team** - For the amazing frontend framework
- **Express.js Team** - For the robust backend framework
- **MySQL Team** - For the reliable database system
- **Open Source Community** - For the incredible tools and libraries

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

[🔗 Live Demo](https://your-demo-url.com) • [📧 Contact](mailto:your-email@example.com) • [🐦 Twitter](https://twitter.com/yourusername)

Made with ❤️ by [Your Name](https://github.com/yourusername)

</div>
#   T i c k e t i n g - S y s t e m 
 
 
