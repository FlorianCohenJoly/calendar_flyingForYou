import React, { useState } from 'react';

function Game({ players, roles }) {
    const [votedPlayerIndex, setVotedPlayerIndex] = useState(null);
    const [remainingPlayers, setRemainingPlayers] = useState(players);

    const handleVote = (index) => {
        console.log(`Player ${remainingPlayers[index]} was voted.`);
        setVotedPlayerIndex(index);
    };

    const handleReturnToVoting = () => {
        console.log(`Player ${remainingPlayers[votedPlayerIndex]} (role: ${roles[players.indexOf(remainingPlayers[votedPlayerIndex])]}) was eliminated.`);
        const newRemainingPlayers = remainingPlayers.filter((_, i) => i !== votedPlayerIndex);
        setRemainingPlayers(newRemainingPlayers);
        setVotedPlayerIndex(null);
    };

    return (
        <div>
            <h2>Game in Progress</h2>
            {votedPlayerIndex === null ? (
                <div>
                    <h3>Select a player to vote for:</h3>
                    <ul>
                        {remainingPlayers.map((player, index) => (
                            <li key={index}>
                                {player} <button className="vote-button" onClick={() => handleVote(index)}>Vote</button>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>
                    <h3>Vote Results:</h3>
                    <p>
                        Player {remainingPlayers[votedPlayerIndex]} is a {roles[players.indexOf(remainingPlayers[votedPlayerIndex])]}.
                    </p>
                    <button onClick={handleReturnToVoting}>Return to Voting</button>
                </div>
            )}
        </div>
    );
}

export default Game;
