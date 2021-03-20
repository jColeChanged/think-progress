import {ThinkProgress} from "./ThinkProgress";
import {Breadcrumb, Card, CardGroup, Container} from "react-bootstrap";
import {Component} from "react";

class ThinkProgressDashboard extends Component {

    state = {selectedDataset: undefined};
    setSelectedDataset = ((selection) => this.setState({selectedDataset: selection}));

    render() {

        let datasets = this.props.datasets;

        let selectedDataset = this.state.selectedDataset;
        let selectionExists = Boolean(selectedDataset);
        let filteredDatasets = datasets.filter((dataset) => !selectionExists || dataset.id === selectedDataset);
        const sampleStyle = {
            minWidth: "45%",
            maxWidth: "45%",
            border: 'none',
            flexGrow: 1,
        };
        return (
            <Container>
                <Breadcrumb>
                    <Breadcrumb.Item onClick={() => this.setSelectedDataset(null)}
                                     href="#">Progress Dashboard</Breadcrumb.Item>
                    {selectionExists ? <Breadcrumb.Item active>{filteredDatasets[0].name}</Breadcrumb.Item> : null}
                </Breadcrumb>
                <CardGroup>
                {filteredDatasets.map((dataset) => (
                    <Card style={sampleStyle}>
                        <ThinkProgress key={dataset.id} dataset={dataset} selected={selectionExists} onClick={() => this.setSelectedDataset(dataset.id)}/>
                    </Card>
                ))}
                </CardGroup>

            </Container>
        );
    }
}

export default ThinkProgressDashboard;
