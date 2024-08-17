// src/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [flashcards, setFlashcards] = useState([]);
  const [newCard, setNewCard] = useState({ question: '', answer: '' });
  const [editingCard, setEditingCard] = useState(null);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/flashcards');
      setFlashcards(response.data);
    } catch (error) {
      console.error('Error fetching flashcards:', error);
    }
  };

  const handleAddCard = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/flashcards', newCard);
      setNewCard({ question: '', answer: '' });
      fetchFlashcards();
    } catch (error) {
      console.error('Error adding flashcard:', error);
    }
  };

  const handleEditCard = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/flashcards/${editingCard.id}`, editingCard);
      setEditingCard(null);
      fetchFlashcards();
    } catch (error) {
      console.error('Error editing flashcard:', error);
    }
  };

  const handleDeleteCard = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/flashcards/${id}`);
      fetchFlashcards();
    } catch (error) {
      console.error('Error deleting flashcard:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <form onSubmit={handleAddCard}>
        <input
          type="text"
          placeholder="Question"
          value={newCard.question}
          onChange={(e) => setNewCard({ ...newCard, question: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Answer"
          value={newCard.answer}
          onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
          required
        />
        <button type="submit">Add Flashcard</button>
      </form>
      <h2>Flashcards</h2>
      <ul>
        {flashcards.map((card) => (
          <li key={card.id}>
            {editingCard && editingCard.id === card.id ? (
              <form onSubmit={handleEditCard}>
                <input
                  type="text"
                  value={editingCard.question}
                  onChange={(e) => setEditingCard({ ...editingCard, question: e.target.value })}
                  required
                />
                <input
                  type="text"
                  value={editingCard.answer}
                  onChange={(e) => setEditingCard({ ...editingCard, answer: e.target.value })}
                  required
                />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingCard(null)}>Cancel</button>
              </form>
            ) : (
              <>
                <strong>{card.question}</strong>: {card.answer}
                <button onClick={() => setEditingCard(card)}>Edit</button>
                <button onClick={() => handleDeleteCard(card.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;