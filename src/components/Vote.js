import React, { useState } from 'react';

function Vote({ players, handleVote }) {
    const [selectedPlayer, setSelectedPlayer] = useState('');

    const handleChange = (e) => {
        setSelectedPlayer(e.target.value);
    };

    const handleSubmit = () => {
        handleVote(selectedPlayer);
        setSelectedPlayer('');
    };

    return (
        <div>
            <h3>Vote</h3>
            <select value={selectedPlayer} onChange={handleChange}>
                <option value="">Select a player</option>
                {players.map((player, index) => (
                    <option key={index} value={player}>{player}</option>
                ))}
            </select>
            <button onClick={handleSubmit}>Submit Vote</button>
        </div>
    );
}

export default Vote;
