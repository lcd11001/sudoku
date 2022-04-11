import logo from './logo.svg';
import './App.css';
import SudokuTable from './SudokuTable';
import { solver, generate, TABLE_SIZE, deepCopy, emptyTable } from './SudokuSolver'
import { useEffect, useState } from 'react';

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

  const [stackCount, setStackCount] = useState(0)
  const [input, setInput] = useState(deepCopy(emptyTable))
  const [output, setOutput] = useState(deepCopy(emptyTable))

  const refresh = (board, count) =>
  {
    // setInput(board)
    setStackCount(count)
  }

  useEffect(() =>
  {
    async function waitGenerate()
    {
      console.log('waitGenerate')
      const resultInput = await generate(input, 20, refresh, 200)
      return resultInput
    }

    async function waitSolver(resultInput)
    {
      console.log('waitSolver')

      // optimize useEffect
      for (var i = 0; i < TABLE_SIZE; i++)
      {
        for (var j = 0; j < TABLE_SIZE; j++)
        {
          output[i][j] = resultInput[i][j]
        }
      }

      const resultOutput = await solver(output, refresh, 10)
      return resultOutput
    }

    waitGenerate()
      .then(resultInput =>
      {
        return waitSolver(resultInput)
      })
      .then(resultOutput =>
      {
        console.log('Finish', resultOutput)
      })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Sudoku Solver</p>
      </header>

      <div className="App-content">
        <SudokuTable input={input} output={output} />
      </div>

    </div>
  );
}

export default App;
