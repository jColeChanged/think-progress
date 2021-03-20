import {
    bookOneProgressDataset, bookTwoProgressDataset, bookThreeProgressDataset
} from "./think/progress/ThinkProgressDataset";
import ThinkProgressDashboard from "./think/progress/ThinkProgressDashboard";

function App() {
  let datasets= [bookOneProgressDataset, bookTwoProgressDataset, bookThreeProgressDataset];
  return (
      <ThinkProgressDashboard datasets={datasets}/>
  );
}

export default App;
