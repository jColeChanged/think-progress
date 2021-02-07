import './App.css';
import {dataset} from "./Data";
import {ThinkProgress} from "./ThinkProgress";

function App() {
  return (
    <div className="App">
        <ThinkProgress dataset={dataset["Book One"]} />
    </div>
  );
}

export default App;
