import React from 'react';

function EndGame({ winner }) {
    return (
        <div>
            <h2>Game Over</h2>
            <p>The winner is: {winner}</p>
        </div>
    );
}

export default EndGame;
