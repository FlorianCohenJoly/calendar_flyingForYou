import React, { useState } from 'react';

function Vote({ players, handleVote }) {
    const [selectedPlayer, setSelectedPlayer] = useState('');

    const submitVote = () => {
        if (selectedPlayer) {
            handleVote(selectedPlayer);
        }
    };

    return (
        <div>
            <h2>Vote for a Player</h2>
            <select
                value={selectedPlayer}
                onChange={(e) => setSelectedPlayer(e.target.value)}
            >
                <option value="">Select a player</option>
                {players.map((player) => (
                    <option key={player} value={player}>
                        {player}
                    </option>
                ))}
            </select>
            <button onClick={submitVote}>Submit Vote</button>
        </div>
    );
}

export default Vote;
