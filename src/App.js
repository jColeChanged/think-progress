import {
    bookOneProgressDataset, bookTwoProgressDataset, bookThreeProgressDataset
} from "./components/think/progress/ThinkProgressDataset";
import ThinkProgressDashboard from "./components/think/progress/ThinkProgressDashboard";

function App() {
  let datasets= [bookOneProgressDataset, bookTwoProgressDataset, bookThreeProgressDataset];
  return (
      <ThinkProgressDashboard datasets={datasets}/>
  );
}

export default App;
