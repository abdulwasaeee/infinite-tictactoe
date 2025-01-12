import  { JSXElementConstructor, ReactElement, ReactNode, ReactPortal} from "react";
import "./App.css";
import { useState } from "react";


// Helper function to check the winner in a single 3x3 grid
const checkWinner = (board: string[]) => {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  for (const [a, b, c] of winningCombinations) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // Return 'X' or 'O'
    }
  }
  return null;
};

const App = () => {
  const [boards, setBoards] = useState(Array(6).fill(Array(9).fill("")));
  const [isXNext, setIsXNext] = useState(true);
  const [points, setPoints] = useState({ X: 0, O: 0 });

  const handleClick = (boardIndex: number, cellIndex: number) => {
    const newBoards = boards.map((board, index) => {
      if (index === boardIndex) {
        const newBoard = [...board];
        if (newBoard[cellIndex] !== "") return newBoard;
  
        newBoard[cellIndex] = isXNext ? "X" : "O";
  
        const winner = checkWinner(newBoard);
        if (winner) {
          // Type assertion here ensures that TypeScript knows winner is "X" or "O"
          setPoints((prev) => ({ ...prev, [winner as 'X' | 'O']: prev[winner as 'X' | 'O'] + 1 }));
          return Array(9).fill("");
        }
        return newBoard;
      }
      return board;
    });
  
    setBoards(newBoards);
    setIsXNext(!isXNext);
  };
  

  return (
    <div className="game-container">
      <h1>Infinite Tic Tac Toe</h1>
      <div className="scoreboard">
        <div className="player player1">
          <p>Player 1 (X)</p>
          <p id="player1-score">{points.X}</p>
        </div>
        
        <div className="separator"></div>
        
        <div className="player player2">
          <p>Player 2 (O)</p>
          <p id="player2-score">{points.O}</p>
        </div>
      </div>

      <div className="board-container">
        {boards.map((board, boardIndex) => (
          <div key={boardIndex} className="tic-tac-toe-board">
            {board.map((cell: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined, cellIndex: number) => (
              <div
                key={cellIndex}
                className="tic-tac-toe-cell"
                onClick={() => handleClick(boardIndex, cellIndex)}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
