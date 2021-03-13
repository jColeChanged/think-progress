import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    bookOneProgressDataset, bookTwoProgressDataset, bookThreeProgressDataset
} from "./ThinkProgressDataset";
import {Container} from "react-bootstrap";
import ThinkProgressDashboard from "./ThinkProgressDashboard";

function App() {
    let datasets= [bookOneProgressDataset, bookTwoProgressDataset, bookThreeProgressDataset];
  return (
      <Container>
          <ThinkProgressDashboard datasets={datasets}/>
      </Container>
  );
}

export default App;
