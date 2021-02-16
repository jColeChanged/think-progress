import * as React from "react";

import {ThinkProgressTable} from "./ThinkProgressTable";
import {ThinkProgressVisualization} from "./ThinkProgressVisualization";
import {ThinkProgressAnalysis} from "./ThinkProgressAnalysis";
import {ThinkProgressExtrapolation} from "./ThinkProgressExtrapolation";


class ThinkProgress extends React.Component {

    render() {
        const analyses = [
            new ThinkProgressAnalysis(this.props.dataset, 1, "days"),
            new ThinkProgressAnalysis(this.props.dataset, 7, "days"),
            new ThinkProgressAnalysis(this.props.dataset, 30, "days"),
            new ThinkProgressAnalysis(this.props.dataset, 365, "days")
        ];
        const extrapolations = analyses.map((analysis) => new ThinkProgressExtrapolation(
            analysis.name,
            analysis.endDate,
            analysis.completed,
            analysis.total,
            analysis.progessDelta
        ));
        return <div>
            <ThinkProgressVisualization dataset={this.props.dataset}/>
            <ThinkProgressTable dataset={this.props.dataset}/>
        </div>
    }
}

export {ThinkProgress};