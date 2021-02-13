import * as React from "react";

import {ThinkProgressTable} from "./ThinkProgressTable";
import {ThinkProgressVisualization} from "./ThinkProgressVisualization";
import {ThinkProgressAnalysis} from "./ThinkProgressAnalysis";


class ThinkProgress extends React.Component {

    render() {
        const analysis = [
            new ThinkProgressAnalysis(this.props.dataset, 1, "days"),
            new ThinkProgressAnalysis(this.props.dataset, 7, "days"),
            new ThinkProgressAnalysis(this.props.dataset, 30, "days"),
            new ThinkProgressAnalysis(this.props.dataset, 365, "days")
        ];

        return <div>
            <ThinkProgressVisualization dataset={this.props.dataset}/>
            <ThinkProgressTable dataset={this.props.dataset}/>
        </div>
    }
}

export {ThinkProgress};