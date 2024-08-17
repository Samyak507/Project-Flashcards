// src/Flashcard.js
import React, { useState } from 'react';

function Flashcard({ card }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flashcard" onClick={handleClick}>
      <div className={`flashcard-inner ${isFlipped ? 'flipped' : ''}`}>
        <div className="flashcard-front">{card.question}</div>
        <div className="flashcard-back">{card.answer}</div>
      </div>
    </div>
  );
}

export default Flashcard;