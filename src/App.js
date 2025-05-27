import React, { useState, useEffect } from 'react';
import axios from 'axios';
import smashWords from './data/smashWords.json';
import Container from './components/Container';
import WordGrid from './components/WordGrid';
import Keyboard from './components/Keyboard';
import InputForm from './components/InputForm';
import GameControls from './components/GameControls';
import StatusMessage from './components/StatusMessage';
import { Helmet } from 'react-helmet';

function App() {
  const [randomWord, setRandomWord] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameStatus, setGameStatus] = useState('playing');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [letterStatuses, setLetterStatuses] = useState({});
  const [wordLength, setWordLength] = useState(5);
  const [maxGuesses, setMaxGuesses] = useState(6);
  const [gameMode, setGameMode] = useState('smash'); // 'standard' | 'smash'
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');

  useEffect(() => {
    fetchRandomWord();
  }, [wordLength, gameMode, maxGuesses]);

  const fetchRandomWord = async () => {
    try {
      setLoading(true);
      setError(null);

      if (gameMode === 'standard') {
        const response = await axios.get(`https://random-word-api.herokuapp.com/word?length=${wordLength}`);
        setRandomWord(response.data[0].toLowerCase());
        setCurrentHint(''); // no hint in standard mode
      } else {
        const filtered = smashWords.filter(wordObj => wordObj.word.length === wordLength);
        if (!filtered.length) {
          throw new Error(`No smash words of length ${wordLength}`);
        }
        const randomObj = filtered[Math.floor(Math.random() * filtered.length)];
        setRandomWord(randomObj.word.toLowerCase());
        setCurrentHint(randomObj.hint);
      }
      setShowHint(false); // hide hint on new word

      setGuesses([]);
      setCurrentGuess('');
      setGameStatus('playing');
      setLetterStatuses({});
    } catch (err) {
      console.error(err);
      setError('Failed to fetch a word.');
    } finally {
      setLoading(false);
    }
  };

  const getLetterStatuses = (guess) => {
    return guess.split('').map((letter, i) => {
      if (letter === randomWord[i]) return 'correct';
      if (randomWord.includes(letter)) return 'present';
      return 'absent';
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentGuess.length !== wordLength || gameStatus !== 'playing') return;

    const newGuesses = [...guesses, currentGuess.toLowerCase()];
    setGuesses(newGuesses);
    setCurrentGuess('');

    const newStatuses = { ...letterStatuses };
    currentGuess.toLowerCase().split('').forEach((letter, idx) => {
      if (randomWord[idx] === letter) {
        newStatuses[letter] = 'correct';
      } else if (randomWord.includes(letter)) {
        if (newStatuses[letter] !== 'correct') newStatuses[letter] = 'present';
      } else {
        if (!newStatuses[letter]) newStatuses[letter] = 'absent';
      }
    });
    setLetterStatuses(newStatuses);

    if (currentGuess.toLowerCase() === randomWord) {
      setGameStatus('won');
    } else if (newGuesses.length === maxGuesses) {
      setGameStatus('lost');
    }
  };

  return (
    <>
      <Helmet>
        <title>Smash Wordle</title>
        <meta name="description" content="Test your Super Smash Bros. knowledge with this fun word guessing game!" />
      </Helmet>
      <Container>
        <div className="text-center mb-4">
          <img src={process.env.PUBLIC_URL + '/smash-wordle.svg'} alt="Smash Wordle Logo" style={{ height: '60px' }} />
        </div>

        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status" />
          </div>
        ) : error ? (
          <div className="alert alert-danger text-center">{error}</div>
        ) : (
          <>
            {/* Game Mode Toggle */}
            <div className="text-center mb-3">
              <label className="me-2">Game Mode:</label>
              <select
                value={gameMode}
                onChange={(e) => setGameMode(e.target.value)}
                className="form-select w-auto d-inline-block"
              >
                <option value="smash">Smash Bros</option>
                <option value="standard">Standard</option>
              </select>
            </div>
            <WordGrid
              guesses={guesses}
              wordLength={wordLength}
              maxGuesses={maxGuesses}
              getLetterStatuses={getLetterStatuses}
            />
            <StatusMessage gameStatus={gameStatus} answer={randomWord} />
            <InputForm
              currentGuess={currentGuess}
              setCurrentGuess={setCurrentGuess}
              wordLength={wordLength}
              onSubmit={handleSubmit}
              disabled={gameStatus !== 'playing'}
            />
            {gameMode === 'smash' && (
              <div className="text-center mt-3">
                <button
                  className="btn btn-info btn-sm"
                  onClick={() => setShowHint((prev) => !prev)}
                  disabled={gameStatus !== 'playing'}
                >
                  {showHint ? 'Hide Hint' : 'Show Hint'}
                </button>

                {showHint && (
                  <div className="mt-2">
                    <strong>Hint:</strong> {currentHint}
                  </div>
                )}
              </div>
            )}
            <Keyboard letterStatuses={letterStatuses} />
            <GameControls
              fetchRandomWord={fetchRandomWord}
              gameStatus={gameStatus}
              wordLength={wordLength}
              maxGuesses={maxGuesses}
              setWordLength={setWordLength}
              setMaxGuesses={setMaxGuesses}
            />
          </>
        )}
      </Container>
    </>
  );
}

export default App;