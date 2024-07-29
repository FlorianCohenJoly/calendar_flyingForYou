import React, { useState } from 'react';

function DrawCard({ players, wordAssignments, onAllPlayersDrawn }) {
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [revealedWords, setRevealedWords] = useState({});
    const [showWord, setShowWord] = useState(false);

    const handleDrawCard = () => {
        setShowWord(true);
    };

    const handleNextPlayer = () => {
        setShowWord(false);
        if (currentPlayerIndex < players.length - 1) {
            setCurrentPlayerIndex(currentPlayerIndex + 1);
        } else {
            onAllPlayersDrawn();
        }
    };

    return (
        <div>
            <h2>Draw Cards</h2>
            {currentPlayerIndex < players.length ? (
                <div>
                    <h3>{players[currentPlayerIndex]}, draw your card:</h3>
                    <button onClick={handleDrawCard}>Draw Card</button>
                    {showWord && (
                        <div>
                            <p>Your word: {wordAssignments[currentPlayerIndex]}</p>
                            <button onClick={handleNextPlayer}>Next Player</button>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <h3>All players have drawn their cards. The game is starting.</h3>
                    <button onClick={onAllPlayersDrawn}>Start Voting Phase</button>
                </div>
            )}
        </div>
    );
}

export default DrawCard;
