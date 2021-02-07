import * as React from "react";

import {ThinkProgressTable} from "./ThinkProgressTable";
import {ThinkProgressVisualization} from "./ThinkProgressVisualization";


class ThinkProgress extends React.Component {

    render() {
        return <div>
            <ThinkProgressVisualization dataset={this.props.dataset}/>
            <ThinkProgressTable dataset={this.props.dataset}/>
        </div>
    }
}

export {ThinkProgress};