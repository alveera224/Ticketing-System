import React, { useState, useEffect } from 'react';
import { ticketAPI } from './api';
import './App.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    category: 'General'
  });

  // Load tickets
  const loadTickets = async () => {
    try {
      const filters = {
        search: searchTerm,
        status: filterStatus,
        priority: filterPriority
      };
      const data = await ticketAPI.getAllTickets(filters);
      setTickets(data);
    } catch (error) {
      console.error('Error loading tickets:', error);
    }
  };

  // Load analytics
  const loadAnalytics = async () => {
    try {
      const data = await ticketAPI.getAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error('Error loading analytics:', error);
    }
  };

  useEffect(() => {
    loadTickets();
    loadAnalytics();
  }, [searchTerm, filterStatus, filterPriority]);

  // Create ticket
  const handleCreateTicket = async () => {
    if (newTicket.title && newTicket.description) {
      try {
        await ticketAPI.createTicket(newTicket);
        setNewTicket({ title: '', description: '', priority: 'Medium', category: 'General' });
        setShowForm(false);
        loadTickets();
        loadAnalytics();
      } catch (error) {
        console.error('Error creating ticket:', error);
      }
    }
  };

  // Update ticket status
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await ticketAPI.updateTicket(id, { status: newStatus });
      loadTickets();
      loadAnalytics();
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  // Delete ticket
  const handleDeleteTicket = async (id) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      try {
        await ticketAPI.deleteTicket(id);
        loadTickets();
        loadAnalytics();
      } catch (error) {
        console.error('Error deleting ticket:', error);
      }
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>🎫 IT Support Ticket Management System</h1>
        <p>Streamline your IT support operations with real-time analytics</p>
      </header>
      
      {/* Analytics Dashboard */}
      {analytics && (
        <div className="analytics">
          <div className="analytics-header">
            <h2>📊 Dashboard Analytics</h2>
          </div>
          <div className="stats-grid">
            <div className="stat-card total">
              <div className="stat-icon">📋</div>
              <div className="stat-content">
                <h3>Total Tickets</h3>
                <p className="stat-number">{analytics.total_tickets}</p>
              </div>
            </div>
            <div className="stat-card open">
              <div className="stat-icon">🔴</div>
              <div className="stat-content">
                <h3>Open</h3>
                <p className="stat-number">{analytics.open_tickets}</p>
              </div>
            </div>
            <div className="stat-card in-progress">
              <div className="stat-icon">🟡</div>
              <div className="stat-content">
                <h3>In Progress</h3>
                <p className="stat-number">{analytics.in_progress}</p>
              </div>
            </div>
            <div className="stat-card resolved">
              <div className="stat-icon">🟢</div>
              <div className="stat-content">
                <h3>Resolved</h3>
                <p className="stat-number">{analytics.resolved_tickets}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="controls">
        <div className="search-section">
          <input
            type="text"
            placeholder="🔍 Search tickets by title, description, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-section">
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="All">All Status</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
          <select 
            value={filterPriority} 
            onChange={(e) => setFilterPriority(e.target.value)}
            className="filter-select"
          >
            <option value="All">All Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="new-ticket-btn"
          >
            ➕ New Ticket
          </button>
        </div>
      </div>

      {/* Ticket Form */}
      {showForm && (
        <div className="ticket-form">
          <div className="form-header">
            <h2>📝 Create New Ticket</h2>
            <button onClick={() => setShowForm(false)} className="close-btn">✕</button>
          </div>
          <div className="form-content">
            <input
              type="text"
              placeholder="Ticket Title"
              value={newTicket.title}
              onChange={(e) => setNewTicket({...newTicket, title: e.target.value})}
              className="form-input"
            />
            <textarea
              placeholder="Describe the issue in detail..."
              value={newTicket.description}
              onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
              className="form-textarea"
              rows="4"
            />
            <div className="form-row">
              <select
                value={newTicket.priority}
                onChange={(e) => setNewTicket({...newTicket, priority: e.target.value})}
                className="form-select"
              >
                <option value="Low">🟢 Low Priority</option>
                <option value="Medium">🟡 Medium Priority</option>
                <option value="High">🔴 High Priority</option>
              </select>
              <select
                value={newTicket.category}
                onChange={(e) => setNewTicket({...newTicket, category: e.target.value})}
                className="form-select"
              >
                <option value="General">General</option>
                <option value="Database">Database</option>
                <option value="API">API</option>
                <option value="Access">Access</option>
                <option value="Hardware">Hardware</option>
                <option value="Software">Software</option>
              </select>
            </div>
            <div className="form-actions">
              <button onClick={handleCreateTicket} className="create-btn">
                ✅ Create Ticket
              </button>
              <button onClick={() => setShowForm(false)} className="cancel-btn">
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tickets List */}
      <div className="tickets-section">
        <h2>🎫 Support Tickets ({tickets.length})</h2>
        <div className="tickets-list">
          {tickets.length === 0 ? (
            <div className="no-tickets">
              <p>📭 No tickets found matching your criteria</p>
            </div>
          ) : (
            tickets.map(ticket => (
              <div key={ticket.id} className="ticket-card">
                <div className="ticket-header">
                  <span className="ticket-id">#{ticket.ticket_id}</span>
                  <span className={`status ${ticket.status.toLowerCase().replace(' ', '-')}`}>
                    {ticket.status === 'Open' && '🔴'}
                    {ticket.status === 'In Progress' && '🟡'}
                    {ticket.status === 'Resolved' && '🟢'}
                    {ticket.status}
                  </span>
                  <span className={`priority ${ticket.priority.toLowerCase()}`}>
                    {ticket.priority === 'High' && '🔴'}
                    {ticket.priority === 'Medium' && '🟡'}
                    {ticket.priority === 'Low' && '🟢'}
                    {ticket.priority}
                  </span>
                </div>
                <div className="ticket-content">
                  <h3>{ticket.title}</h3>
                  <p className="ticket-description">{ticket.description}</p>
                  <div className="ticket-meta">
                    <span className="category">📂 {ticket.category}</span>
                    <span className="assignee">👤 {ticket.assignee}</span>
                    <span className="date">📅 {ticket.created_date}</span>
                  </div>
                </div>
                <div className="ticket-actions">
                  {ticket.status !== 'Resolved' && (
                    <select 
                      value={ticket.status} 
                      onChange={(e) => handleUpdateStatus(ticket.id, e.target.value)}
                      className="status-select"
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  )}
                  <button 
                    onClick={() => handleDeleteTicket(ticket.id)}
                    className="delete-btn"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
