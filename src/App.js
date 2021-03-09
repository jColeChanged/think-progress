import './App.css';
import {
    bookOneProgressDataset, bookTwoProgressDataset, bookThreeProgressDataset
} from "./ThinkProgressDataset";
import {ThinkProgress} from "./ThinkProgress";

function App() {
  return (
    <div className="App">
        <ThinkProgress dataset={bookOneProgressDataset} />
        <ThinkProgress dataset={bookTwoProgressDataset} />
        <ThinkProgress dataset={bookThreeProgressDataset} />
    </div>
  );
}

export default App;
