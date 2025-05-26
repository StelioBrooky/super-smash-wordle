import React from 'react';

const WordGrid = ({ guesses, wordLength, maxGuesses, getLetterStatuses }) => {
  return (
    <div className="guess-grid mt-4">
      {guesses.map((guess, i) => {
        const statuses = getLetterStatuses(guess);
        return (
          <div key={i} className="d-flex justify-content-center mb-2">
            {guess.split('').map((letter, j) => (
              <div key={j} className={`letter-box me-1 ${statuses[j]}`}>
                {letter.toUpperCase()}
              </div>
            ))}
          </div>
        );
      })}

      {Array.from({ length: maxGuesses - guesses.length }).map((_, i) => (
        <div key={i} className="d-flex justify-content-center mb-2">
          {Array.from({ length: wordLength }).map((_, j) => (
            <div key={j} className="letter-box me-1 empty" />
          ))}
        </div>
      ))}
    </div>
  );
};

export default WordGrid;