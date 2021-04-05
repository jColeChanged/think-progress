import {
    bookOneProgressDataset, bookTwoProgressDataset, bookThreeProgressDataset, bookFourProgressDataaset
} from "./components/think/progress/ThinkProgressDataset";
import ThinkProgressDashboard from "./components/think/progress/ThinkProgressDashboard";

function App() {
  let datasets= [bookOneProgressDataset, bookTwoProgressDataset, bookThreeProgressDataset, bookFourProgressDataaset];
  return (
      <ThinkProgressDashboard datasets={datasets}/>
  );
}

export default App;
