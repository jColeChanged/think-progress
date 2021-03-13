import {ThinkProgress} from "./ThinkProgress";
import {Container} from "react-bootstrap";

function ThinkProgressDashboard(props) {
    let datasets = props.datasets;
    let selectedDataset = undefined;
    let selectionExists = Boolean(selectedDataset);
    let filteredDatasets = datasets.filter((dataset) => !selectionExists || dataset.id === selectedDataset);

    return (
        <Container>
            {filteredDatasets.map((dataset) => <ThinkProgress dataset={dataset} selected={selectionExists} />)}
        </Container>
    );
}

export default ThinkProgressDashboard;
