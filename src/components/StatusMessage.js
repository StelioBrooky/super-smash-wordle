import React from 'react';

const StatusMessage = ({ gameStatus, answer }) => {
  if (gameStatus === 'playing') return null;

  return (
    <div className={`alert mt-3 text-center ${gameStatus === 'won' ? 'alert-success' : 'alert-danger'}`}>
      {gameStatus === 'won'
        ? '🎉 Correct! You won!'
        : `❌ The word was "${answer.toUpperCase()}".`}
    </div>
  );
};

export default StatusMessage;