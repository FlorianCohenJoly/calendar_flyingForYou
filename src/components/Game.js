import React, { useState } from 'react';

function Game({ players, roles, resetGame }) {
    const [votedPlayerIndex, setVotedPlayerIndex] = useState(null);
    const [remainingPlayers, setRemainingPlayers] = useState(players);

    // Fonction pour gérer le vote
    const handleVote = (index) => {
        console.log('Index du joueur voté:', index);
        console.log('Joueurs restants avant le vote:', remainingPlayers);

        // Afficher le joueur voté
        const votedPlayer = remainingPlayers[index];
        console.log('Joueur voté:', votedPlayer);

        // Trouver le rôle du joueur voté en utilisant l'index
        const originalIndex = players.indexOf(votedPlayer);
        const playerRole = roles[originalIndex];
        console.log('Rôle du joueur voté:', playerRole);

        // Mettre à jour l'état du joueur voté
        setVotedPlayerIndex(index);

        // Éliminer le joueur voté
        const newRemainingPlayers = remainingPlayers.filter((_, i) => i !== index);
        console.log('Joueurs restants après le vote:', newRemainingPlayers);
        setRemainingPlayers(newRemainingPlayers);
    };

    // Fonction pour retourner à la phase de vote
    const handleReturnToVoting = () => {
        setVotedPlayerIndex(null);
        resetGame(remainingPlayers);
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
                                {player} <button onClick={() => handleVote(index)}>Vote</button>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>
                    <h3>Vote Results:</h3>
                    <p>
                        Player {remainingPlayers[votedPlayerIndex]} is a {roles[players.indexOf(remainingPlayers[votedPlayerIndex])]}
                    </p>
                    <button onClick={handleReturnToVoting}>Return to Voting</button>
                </div>
            )}
        </div>
    );
}

export default Game;
