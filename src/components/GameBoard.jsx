import { useState } from "react";


export default function GameBoard({handleSquareClickFn, playerSymbol, board}){
    let gameBoard = board;


    function handleSquareClick(rowIndex, colIndex){
        handleSquareClickFn(rowIndex, colIndex);
    }

    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex)=>(
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) =>(
                            <li key={colIndex}>
                                <button 
                                    onClick={()=>handleSquareClick(rowIndex, colIndex)} 
                                    disabled={playerSymbol !== null}
                                >{playerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}