import React from 'react';

const InputForm = ({ currentGuess, setCurrentGuess, wordLength, onSubmit, disabled }) => (
  <form onSubmit={onSubmit} className="mt-3 d-flex justify-content-center gap-2">
    <input
      type="text"
      className="form-control text-center"
      maxLength={wordLength}
      value={currentGuess}
      onChange={(e) => setCurrentGuess(e.target.value)}
      disabled={disabled}
      style={{ maxWidth: '150px' }}
    />
    <button className="btn btn-primary" type="submit" disabled={disabled}>
      Submit
    </button>
  </form>
);

export default InputForm;