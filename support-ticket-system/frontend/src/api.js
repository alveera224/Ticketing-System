const API_BASE_URL = 'http://localhost:5000/api';

export const ticketAPI = {
  // Get all tickets
  getAllTickets: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await fetch(`${API_BASE_URL}/tickets?${params}`);
    return response.json();
  },

  // Create ticket
  createTicket: async (ticketData) => {
    const response = await fetch(`${API_BASE_URL}/tickets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ticketData)
    });
    return response.json();
  },

  // Update ticket
  updateTicket: async (id, updates) => {
    const response = await fetch(`${API_BASE_URL}/tickets/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    return response.json();
  },

  // Delete ticket
  deleteTicket: async (id) => {
    const response = await fetch(`${API_BASE_URL}/tickets/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  },

  // Get analytics
  getAnalytics: async () => {
    const response = await fetch(`${API_BASE_URL}/tickets/analytics/stats`);
    return response.json();
  }
};
