import logo from './logo.svg';
import './App.css';
import SudokuTable from './SudokuTable';

function App()
{
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Sudoku Solver</p>
      </header>

      <SudokuTable />
    </div>
  );
}

export default App;
