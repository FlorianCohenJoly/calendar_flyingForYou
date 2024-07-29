import React, { useState } from 'react';
import Setup from './components/Setup';
import DrawCard from './components/DrawCard';
import Game from './components/Game';

function App() {
  const [players, setPlayers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [wordAssignments, setWordAssignments] = useState({});
  const [phase, setPhase] = useState('setup');

  const startGame = (players, roles, wordAssignments) => {
    setPlayers(players);
    setRoles(roles);
    setWordAssignments(wordAssignments);
    setPhase('draw');
  };

  const startGamePhase = () => {
    setPhase('game');
  };

  return (
    <div>
      {phase === 'setup' && <Setup startGame={startGame} />}
      {phase === 'draw' && <DrawCard players={players} wordAssignments={wordAssignments} handleNext={startGamePhase} />}
      {phase === 'game' && <Game players={players} roles={roles} wordAssignments={wordAssignments} />}
    </div>
  );
}

export default App;
