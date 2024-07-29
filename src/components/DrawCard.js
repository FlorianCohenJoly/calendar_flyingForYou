import React, { useState } from 'react';

function DrawCard({ players, wordAssignments, handleNext }) {
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [word, setWord] = useState('');

    const drawWord = () => {
        setWord(wordAssignments[currentPlayer]);
    };

    const nextPlayer = () => {
        if (currentPlayer < players.length - 1) {
            setCurrentPlayer(currentPlayer + 1);
            setWord('');
        } else {
            handleNext();
        }
    };

    return (
        <div>
            <h2>Player {players[currentPlayer]} Draw Your Word</h2>
            {word ? (
                <>
                    <p>Your word: {word}</p>
                    <button onClick={nextPlayer}>Next Player</button>
                </>
            ) : (
                <button onClick={drawWord}>Draw Word</button>
            )}
        </div>
    );
}

export default DrawCard;
