-- Create Database
CREATE DATABASE IF NOT EXISTS support_ticket_db;
USE support_ticket_db;

-- Create Tickets Table
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

-- Insert Sample Data
INSERT INTO tickets (ticket_id, title, description, priority, status, category, assignee, created_date) VALUES
('TKT-001', 'Database Connection Error', 'Unable to connect to production database', 'High', 'Open', 'Database', 'John Doe', '2024-10-20'),
('TKT-002', 'API Timeout Issues', 'REST API calls timing out after 30 seconds', 'Medium', 'In Progress', 'API', 'Jane Smith', '2024-10-21'),
('TKT-003', 'User Access Request', 'New user needs access to analytics dashboard', 'Low', 'Resolved', 'Access', 'Mike Johnson', '2024-10-19');

-- Create Analytics View
CREATE VIEW ticket_analytics AS
SELECT 
    COUNT(*) as total_tickets,
    SUM(CASE WHEN status = 'Open' THEN 1 ELSE 0 END) as open_tickets,
    SUM(CASE WHEN status = 'In Progress' THEN 1 ELSE 0 END) as in_progress,
    SUM(CASE WHEN status = 'Resolved' THEN 1 ELSE 0 END) as resolved_tickets,
    AVG(DATEDIFF(updated_at, created_at)) as avg_resolution_days
FROM tickets;
