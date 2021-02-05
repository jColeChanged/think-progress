import logo from './logo.svg';
import './App.css';
import {ThinkProgressVisualization} from './ThinkProgressVisualization';
import {ThinkProgressTable} from "./ThinkProgressTable";

function App() {
  return (
    <div className="App">
      <ThinkProgressVisualization />
      <ThinkProgressTable />
    </div>
  );
}

export default App;
