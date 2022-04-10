import logo from './logo.svg';
import './App.css';
import SudokuTable from './SudokuTable';
import { solver } from './SudokuSolver'

function App()
{
  const input = [
    [1, 0, 3, 6, 0, 4, 7, 0, 9],
    [0, 2, 0, 0, 9, 0, 0, 1, 0],
    [7, 0, 0, 0, 0, 0, 0, 0, 6],
    [2, 0, 4, 0, 3, 0, 9, 0, 8],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [5, 0, 0, 9, 0, 7, 0, 0, 1],
    [6, 0, 0, 0, 5, 0, 0, 0, 2],
    [0, 0, 0, 0, 7, 0, 0, 0, 0],
    [9, 0, 0, 8, 0, 2, 0, 0, 5]
  ]

  const output = solver(input)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Sudoku Solver</p>
      </header>

      <SudokuTable input={input} output={output} />

    </div>
  );
}

export default App;
