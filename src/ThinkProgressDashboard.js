import {ThinkProgress} from "./ThinkProgress";
import {Container} from "react-bootstrap";

function ThinkProgressDashboard(props) {
    let datasets = props.datasets;
    return (
        <Container>
            {datasets.map((dataset) => <ThinkProgress dataset={dataset} />)}
        </Container>
    );
}

export default ThinkProgressDashboard;
