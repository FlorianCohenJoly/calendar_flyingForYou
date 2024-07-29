import React, { useState } from 'react';
import Game from './Game';
import DrawCard from './DrawCard';
import words from './words.json'; // Assurez-vous que ce chemin est correct
import '/Users/floriancohen-joly/Documents/GitHub/calendar_flyingForYou/src/style.css'; // Importez le fichier CSS

function Setup() {
    const [playerNames, setPlayerNames] = useState('');
    const [players, setPlayers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [wordAssignments, setWordAssignments] = useState({});
    const [gameStarted, setGameStarted] = useState(false);
    const [allPlayersDrawn, setAllPlayersDrawn] = useState(false);

    const handleChange = (e) => {
        setPlayerNames(e.target.value);
    };

    const handleStartGame = () => {
        const names = playerNames.split(',').map(name => name.trim());
        console.log('Player names:', names);
        const roles = assignRoles(names.length);
        console.log('Assigned roles:', roles);
        const wordAssignments = assignWords(roles);
        console.log('Word assignments:', wordAssignments);
        setPlayers(names);
        setRoles(roles);
        setWordAssignments(wordAssignments);
        setGameStarted(true);
    };

    const assignRoles = (numPlayers) => {
        let roles = new Array(numPlayers).fill('citizen');
        if (numPlayers >= 3) {
            roles[0] = 'undercover';
            roles[1] = 'mr. white';
        }
        if (numPlayers > 4) {
            roles[2] = 'undercover';
        }
        return shuffle(roles);
    };

    const assignWords = (roles) => {
        const selectedWords = words[Math.floor(Math.random() * words.length)];
        console.log('Selected words:', selectedWords);
        const wordAssignments = {};
        roles.forEach((role, index) => {
            if (role === 'citizen') {
                wordAssignments[index] = selectedWords.citizen;
            } else if (role === 'undercover') {
                wordAssignments[index] = selectedWords.undercover;
            } else {
                wordAssignments[index] = 'Aucun mot'; // Mr. White n'a pas de mot
            }
        });
        return wordAssignments;
    };

    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const handleAllPlayersDrawn = () => {
        console.log('All players have drawn their cards.');
        setAllPlayersDrawn(true);
    };

    return (
        <div className="container">
            {!gameStarted ? (
                <>
                    <h2>Setup Game</h2>
                    <input
                        type="text"
                        value={playerNames}
                        onChange={handleChange}
                        placeholder="Enter player names, separated by commas"
                    />
                    <button onClick={handleStartGame}>Start Game</button>
                </>
            ) : !allPlayersDrawn ? (
                <DrawCard players={players} wordAssignments={wordAssignments} onAllPlayersDrawn={handleAllPlayersDrawn} />
            ) : (
                <Game players={players} roles={roles} />
            )}
        </div>
    );
}

export default Setup;
