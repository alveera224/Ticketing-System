# IT Support Ticket Management System

<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-4.18.2-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

**A full-stack web application for managing IT support tickets with real-time analytics**

[![GitHub stars](https://img.shields.io/github/stars/alveera224/Ticketing-System?style=social)](https://github.com/alveera224/Ticketing-System)
[![GitHub license](https://img.shields.io/github/license/alveera224/Ticketing-System)](https://github.com/alveera224/Ticketing-System/blob/main/LICENSE)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

---

## Overview

A modern full-stack web application for managing IT support tickets with real-time analytics. Built with React, Node.js, Express.js, and MySQL to streamline support operations and provide comprehensive ticket management capabilities.

### Key Features

- **Real-time Analytics Dashboard** - Track KPIs and performance metrics
- **Advanced Search & Filtering** - Find tickets instantly across multiple fields  
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Modern UI** - Clean interface with smooth animations
- **RESTful API** - Scalable backend with proper error handling

---

## Features

### Ticket Management
- Complete CRUD operations for tickets
- Auto-generated ticket IDs (TKT-001, TKT-002, etc.)
- Priority levels: High, Medium, Low
- Status workflow: Open → In Progress → Resolved
- Category organization and assignee management
- Date tracking and timestamps

### Analytics Dashboard
- Real-time statistics and KPIs
- Performance metrics and resolution times
- Status distribution visualization
- Team productivity tracking

### Search & Filtering
- Global search across title, description, and ticket ID
- Multi-criteria filtering by status, priority, category
- Real-time search results
- Advanced query capabilities

### User Experience
- Responsive design for all devices
- Modern UI with smooth animations
- Color-coded status indicators
- Intuitive navigation and user interface

---

## Tech Stack

### Frontend
- **React 18.2.0** - Modern JavaScript library for building user interfaces
- **JavaScript ES6+** - Latest JavaScript features and syntax
- **CSS3** - Advanced styling with animations and responsive design
- **HTML5** - Semantic markup and modern web standards

### Backend
- **Node.js 18.x** - JavaScript runtime for server-side development
- **Express.js 4.18.2** - Fast, unopinionated web framework
- **MySQL 8.0** - Relational database management system
- **mysql2** - High-performance MySQL client for Node.js

### Architecture
- **MVC Pattern** - Model-View-Controller separation
- **RESTful API** - Representational State Transfer architecture
- **Component-Based** - Modular React component architecture
- **Database Normalization** - Optimized relational database design

## Project Structure

```
support-ticket-system/
├── backend/                    # Node.js Backend
│   ├── server.js              # Express server
│   ├── db.js                  # MySQL connection
│   ├── routes/tickets.js      # API routes
│   └── package.json           # Dependencies
├── frontend/                  # React Frontend
│   ├── src/
│   │   ├── App.js             # Main component
│   │   ├── App.css            # Styling
│   │   ├── api.js             # API integration
│   │   └── index.js           # Entry point
│   └── package.json           # Dependencies
├── database/
│   └── schema.sql             # MySQL schema
└── README.md                  # Documentation
```

---

## Quick Start

### Prerequisites
- Node.js (v14.0+)
- MySQL (v8.0+)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/alveera224/Ticketing-System.git
   cd Ticketing-System
   ```

2. **Setup Database**
   ```bash
   # Start MySQL server
   net start mysql  # Windows
   sudo systemctl start mysql  # Linux/macOS
   
   # Import schema
   mysql -u root -p < database/schema.sql
   ```

3. **Configure Database Connection**
   
   Update `backend/db.js` with your MySQL credentials:
   ```javascript
   const pool = mysql.createPool({
     host: 'localhost',
     user: 'root',
     password: 'your_mysql_password',
     database: 'support_ticket_db',
     waitForConnections: true,
     connectionLimit: 10,
     queueLimit: 0
   });
   ```

4. **Start Backend**
   ```bash
   cd backend
   npm install
   npm start
   ```

5. **Start Frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```

### Access Points
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health**: http://localhost:5000/api/health

---

## API Documentation

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tickets` | Get all tickets with optional filters |
| `GET` | `/api/tickets/:id` | Get single ticket by ID |
| `POST` | `/api/tickets` | Create new ticket |
| `PUT` | `/api/tickets/:id` | Update ticket |
| `DELETE` | `/api/tickets/:id` | Delete ticket |
| `GET` | `/api/tickets/analytics/stats` | Get ticket statistics |

### Example Usage

**Get all tickets:**
```bash
curl http://localhost:5000/api/tickets
```

**Create new ticket:**
```bash
curl -X POST http://localhost:5000/api/tickets \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Server Issue",
    "description": "Server is running slow",
    "priority": "High",
    "category": "Performance"
  }'
```

**Get analytics:**
```bash
curl http://localhost:5000/api/tickets/analytics/stats
```

**Search tickets:**
```bash
curl "http://localhost:5000/api/tickets?search=database&status=Open"
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by [Alveera Fatima](https://github.com/alveera224)

</div>