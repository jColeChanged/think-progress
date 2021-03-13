import {ThinkProgress} from "./ThinkProgress";
import {Container} from "react-bootstrap";
import {Component} from "react";

class ThinkProgressDashboard extends Component {

    state = {selectedDataset: undefined};
    setSelectedDataset = ((selection) => this.setState({selectedDataset: selection}));

    render() {

        let datasets = this.props.datasets;

        let selectedDataset = this.state.selectedDataset;
        let selectionExists = Boolean(selectedDataset);
        let filteredDatasets = datasets.filter((dataset) => !selectionExists || dataset.id === selectedDataset);

        return (
            <Container>
                {filteredDatasets.map((dataset) => <ThinkProgress key={dataset.id} dataset={dataset}
                                                                  selected={selectionExists} onClick={() => this.setSelectedDataset(dataset.id)}/>)}
            </Container>
        );
    }
}

export default ThinkProgressDashboard;
