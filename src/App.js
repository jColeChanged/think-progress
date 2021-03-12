import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    bookOneProgressDataset, bookTwoProgressDataset, bookThreeProgressDataset
} from "./ThinkProgressDataset";
import {ThinkProgress} from "./ThinkProgress";
import {Container} from "react-bootstrap";

function App() {
  return (
      <Container>
          <ThinkProgress dataset={bookOneProgressDataset} />
          <ThinkProgress dataset={bookTwoProgressDataset} />
          <ThinkProgress dataset={bookThreeProgressDataset} />
      </Container>

  );
}

export default App;
