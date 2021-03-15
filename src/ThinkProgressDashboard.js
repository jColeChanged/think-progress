import {ThinkProgress} from "./ThinkProgress";
import {Breadcrumb, Container} from "react-bootstrap";
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
                <Breadcrumb>
                    <Breadcrumb.Item onClick={() => this.setSelectedDataset(null)}
                                     href="#">Progress Dashboard</Breadcrumb.Item>
                    {selectionExists ? <Breadcrumb.Item active>{filteredDatasets[0].name}</Breadcrumb.Item> : null}
                </Breadcrumb>
                {filteredDatasets.map((dataset) => <ThinkProgress key={dataset.id} dataset={dataset}
                                                                  selected={selectionExists} onClick={() => this.setSelectedDataset(dataset.id)}/>)}
            </Container>
        );
    }
}

export default ThinkProgressDashboard;
