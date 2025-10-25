const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all tickets with optional filters
router.get('/', async (req, res) => {
  try {
    const { status, priority, search } = req.query;
    let query = 'SELECT * FROM tickets WHERE 1=1';
    const params = [];

    if (status && status !== 'All') {
      query += ' AND status = ?';
      params.push(status);
    }

    if (priority && priority !== 'All') {
      query += ' AND priority = ?';
      params.push(priority);
    }

    if (search) {
      query += ' AND (title LIKE ? OR description LIKE ? OR ticket_id LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    query += ' ORDER BY created_at DESC';

    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
});

// GET single ticket by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tickets WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching ticket:', error);
    res.status(500).json({ error: 'Failed to fetch ticket' });
  }
});

// POST create new ticket
router.post('/', async (req, res) => {
  try {
    const { title, description, priority, category } = req.body;

    // Generate ticket ID
    const [countResult] = await db.query('SELECT COUNT(*) as count FROM tickets');
    const ticketNumber = countResult[0].count + 1;
    const ticketId = `TKT-${String(ticketNumber).padStart(3, '0')}`;

    const query = `
      INSERT INTO tickets (ticket_id, title, description, priority, category, created_date)
      VALUES (?, ?, ?, ?, ?, CURDATE())
    `;

    const [result] = await db.query(query, [ticketId, title, description, priority, category]);

    res.status(201).json({
      id: result.insertId,
      ticket_id: ticketId,
      message: 'Ticket created successfully'
    });
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({ error: 'Failed to create ticket' });
  }
});

// PUT update ticket
router.put('/:id', async (req, res) => {
  try {
    const { status, assignee, priority } = req.body;
    const updates = [];
    const params = [];

    if (status) {
      updates.push('status = ?');
      params.push(status);
    }
    if (assignee) {
      updates.push('assignee = ?');
      params.push(assignee);
    }
    if (priority) {
      updates.push('priority = ?');
      params.push(priority);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    params.push(req.params.id);
    const query = `UPDATE tickets SET ${updates.join(', ')} WHERE id = ?`;

    await db.query(query, params);
    res.json({ message: 'Ticket updated successfully' });
  } catch (error) {
    console.error('Error updating ticket:', error);
    res.status(500).json({ error: 'Failed to update ticket' });
  }
});

// DELETE ticket
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM tickets WHERE id = ?', [req.params.id]);
    res.json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    console.error('Error deleting ticket:', error);
    res.status(500).json({ error: 'Failed to delete ticket' });
  }
});

// GET analytics
router.get('/analytics/stats', async (req, res) => {
  try {
    const [analytics] = await db.query('SELECT * FROM ticket_analytics');
    res.json(analytics[0]);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

module.exports = router;
