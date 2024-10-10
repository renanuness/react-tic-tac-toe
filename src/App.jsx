import { useState } from 'react'
import './App.css'
import Player from './components/Player'
import GameBoard from './components/GameBoard'
import Logs from './components/Logs';
import { WINNING_COMBINATIONS } from './winning-combinations';
import GameOver from './components/GameOver';

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function getCurrentPlayer(turns){
  let currentPlayer = 'X';
  if(turns.length > 0 && turns[0].player === 'X'){
    currentPlayer = 'O';
  }
  
  return currentPlayer;
}

function App() {
  const [players, setPlayers] = useState({X: "Player 1", O: "Player 2"})
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = getCurrentPlayer(gameTurns);
  let winner = null;
  let gameBoard = [...initialBoard.map((array)=> [...array])];

  for(let turn of gameTurns){
    const { square, player} = turn;
    const {col, row} = square;

    gameBoard[row][col] = player;
  }
  for(let combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol == null){
      continue;
    }

    if(firstSquareSymbol == secondSquareSymbol && secondSquareSymbol == thirdSquareSymbol){
      winner = players[firstSquareSymbol];
    }
  }
  console.log(winner);

  function handleSquareClick(row, col){
    setGameTurns((prevTurns) =>{
      const currentPlayer = getCurrentPlayer(prevTurns);

      const updatedTurns = [
        { square:{ col: col, row: row}, player: currentPlayer},
        ...prevTurns
      ]
      
      return updatedTurns;
    })
  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers((prevPlayer)=>{
      return { 
        ...prevPlayer,
        [symbol]: newName
      }
    });
  }

  const hasDrawn = gameTurns.length == 9 && !winner;
  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player symbol="X" name={players.X} onNameChange={(s, n)=>handlePlayerNameChange(s, n)}  isActive={activePlayer === 'X'} />
          <Player symbol="O" name={players.O} onNameChange={(s, n)=>handlePlayerNameChange(s, n)} isActive={activePlayer === 'O'} />
        </ol>
        {winner || hasDrawn ? <GameOver onRestart={handleRestart} winner={winner}/> : ''}
        <GameBoard activePlayer={activePlayer} handleSquareClickFn={(row, col) => handleSquareClick(row, col)} playerSymbol={activePlayer} board={gameBoard}/>
        <Logs turns={gameTurns} />
      </div>
    </main>
  )
}


export default App
