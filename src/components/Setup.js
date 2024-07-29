import React, { useState } from 'react';
import words from './words.json';

function Setup({ startGame }) {
    const [playerNames, setPlayerNames] = useState('');

    const handleChange = (e) => {
        setPlayerNames(e.target.value);
    };

    const handleStartGame = () => {
        const names = playerNames.split(',').map(name => name.trim());
        const roles = assignRoles(names.length);
        const wordAssignments = assignWords(roles);
        startGame(names, roles, wordAssignments);
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
        // Vérifiez que nous avons suffisamment de paires de mots
        const requiredPairs = Math.ceil(roles.filter(role => role !== 'mr. white').length / 2);
        if (requiredPairs > words.length) {
            throw new Error('Not enough word pairs for the number of players');
        }

        const selectedWords = shuffle(words).slice(0, requiredPairs);
        const wordAssignments = {};
        let undercoverIndex = 0;
        let citizenIndex = 0;

        roles.forEach((role, index) => {
            if (role === 'citizen') {
                wordAssignments[index] = selectedWords[citizenIndex].citizen;
                citizenIndex++;
            } else if (role === 'undercover') {
                wordAssignments[index] = selectedWords[undercoverIndex].undercover;
                undercoverIndex++;
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

    return (
        <div>
            <h2>Setup Game</h2>
            <input
                type="text"
                value={playerNames}
                onChange={handleChange}
                placeholder="Enter player names, separated by commas"
            />
            <button onClick={handleStartGame}>Start Game</button>
        </div>
    );
}

export default Setup;
