import React from 'react';

const Keyboard = ({ letterStatuses }) => {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ];

  return (
    <div className="keyboard mt-4">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="d-flex justify-content-center mb-2">
          {row.map((key) => {
            const status = letterStatuses[key.toLowerCase()];
            return (
              <div key={key} className={`key ${status ?? ''}`}>
                {key}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;