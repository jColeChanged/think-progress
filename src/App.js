import './App.css';
import {bookOneProgressDataset} from "./ThinkProgressDataset";
import {ThinkProgress} from "./ThinkProgress";

function App() {
  return (
    <div className="App">
        <ThinkProgress dataset={bookOneProgressDataset} />
    </div>
  );
}

export default App;
