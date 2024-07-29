import React, { useState, useEffect } from 'react';
import Vote from './Vote';
import EndGame from './EndGame';

function Game({ players, roles, wordAssignments }) {
    const [round, setRound] = useState(1);
    const [votes, setVotes] = useState([]);
    const [eliminated, setEliminated] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState('');

    useEffect(() => {
        if (eliminated.length > 0) {
            checkWinCondition();
        }
    }, [eliminated]);

    const handleVote = (vote) => {
        setVotes([...votes, vote]);
        if (votes.length + 1 === players.filter(p => !eliminated.includes(p)).length) {
            const mostVotedPlayer = getMostVotedPlayer([...votes, vote]);
            setEliminated([...eliminated, mostVotedPlayer]);
            setVotes([]);
            setRound(round + 1);
        }
    };

    const getMostVotedPlayer = (votes) => {
        const voteCount = {};
        votes.forEach((vote) => {
            voteCount[vote] = (voteCount[vote] || 0) + 1;
        });
        const sortedVotes = Object.entries(voteCount).sort((a, b) => b[1] - a[1]);
        return sortedVotes[0][0];
    };

    const checkWinCondition = () => {
        const remainingRoles = roles.filter((role, index) => !eliminated.includes(players[index]));
        const undercovers = remainingRoles.filter(role => role === 'undercover').length;
        const mrWhite = remainingRoles.filter(role => role === 'mr. white').length;
        const citizens = remainingRoles.filter(role => role === 'citizen').length;

        if (undercovers === 0 && mrWhite === 0) {
            setWinner('Citizens');
            setGameOver(true);
        } else if (undercovers >= citizens || (mrWhite > 0 && citizens === 0)) {
            setWinner('Undercovers');
            setGameOver(true);
        }
    };

    return gameOver ? (
        <EndGame winner={winner} />
    ) : (
        <div>
            <h2>Game Round {round}</h2>
            <ul>
                {players.map((player, index) => (
                    !eliminated.includes(player) && (
                        <li key={index}>{player} - Your word: {wordAssignments[index]}</li>
                    )
                ))}
            </ul>
            <Vote players={players.filter(player => !eliminated.includes(player))} handleVote={handleVote} />
        </div>
    );
}

export default Game;
