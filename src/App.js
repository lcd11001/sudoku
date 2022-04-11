import logo from './logo.svg';
import './App.css';
import SudokuTable from './SudokuTable';
import { solver, generate, TABLE_SIZE } from './SudokuSolver'
import { useState } from 'react';

const emptyTable = Array(TABLE_SIZE).fill().map(_ =>
{
  return Array(TABLE_SIZE).fill(0)
})

function App()
{
  /*
  // has solution
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
  */

  /*
  // no solution
  const input = [
    [0, 0, 0, 9, 0, 6, 0, 1, 3],
    [4, 1, 0, 7, 2, 0, 8, 0, 0],
    [0, 0, 0, 0, 4, 1, 9, 0, 2],
    [0, 0, 0, 6, 0, 4, 0, 5, 0],
    [0, 9, 7, 1, 0, 8, 0, 4, 6],
    [0, 0, 2, 0, 3, 0, 1, 0, 0],
    [5, 6, 0, 0, 0, 7, 0, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 6, 0],
    [1, 0, 8, 5, 0, 3, 4, 0, 7]
  ]
  */
  // const input = generate(30)

  // const output = solver(input)

  const [input, setInput] = useState(emptyTable)
  const [output, setOutput] = useState(emptyTable)

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
