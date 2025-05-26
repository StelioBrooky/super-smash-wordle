import React from 'react';

const GameControls = ({
  fetchRandomWord,
  gameStatus,
  wordLength,
  maxGuesses,
  setWordLength,
  setMaxGuesses,
}) => (
  <>
    <div className="text-center mt-4">
      <button className="btn btn-secondary" onClick={fetchRandomWord}>
        {gameStatus === 'playing' ? 'Restart' : 'Play Again'}
      </button>
    </div>

    <div className="text-center mt-4">
      <button
        className="btn btn-secondary btn-sm me-2"
        onClick={() => setWordLength((prev) => Math.max(3, prev - 1))}
        disabled={wordLength <= 3}
      >
        -
      </button>
      <span>{`Word Length: ${wordLength}`}</span>
      <button
        className="btn btn-secondary btn-sm ms-2"
        onClick={() => setWordLength((prev) => Math.min(7, prev + 1))}
        disabled={wordLength >= 7}
      >
        +
      </button>
    </div>

    <div className="text-center mt-2">
      <button
        className="btn btn-secondary btn-sm me-2"
        onClick={() => setMaxGuesses((prev) => Math.max(2, prev - 1))}
        disabled={maxGuesses <= 2}
      >
        -
      </button>
      <span>{`Maximum Guesses: ${maxGuesses}`}</span>
      <button
        className="btn btn-secondary btn-sm ms-2"
        onClick={() => setMaxGuesses((prev) => Math.min(10, prev + 1))}
        disabled={maxGuesses >= 10}
      >
        +
      </button>
    </div>
  </>
);

export default GameControls;