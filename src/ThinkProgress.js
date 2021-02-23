import * as React from "react";
import * as d3 from "d3";

import {ThinkProgressTable} from "./ThinkProgressTable";
import {ThinkProgressVisualization} from "./ThinkProgressVisualization";
import {ThinkProgressAnalysis} from "./ThinkProgressAnalysis";
import {ThinkProgressExtrapolation} from "./ThinkProgressExtrapolation";
import {datesetCreatedParser} from "./ThinkProgressDataset";


class ThinkProgress extends React.Component {

    render() {
        let now = new Date();
        let start = datesetCreatedParser(this.props.dataset[0].Created);
        let numDaysSinceStart = d3.timeDay.count(start, now);
        let windowLengths = [1, 7, 30, 365].filter((windowLength) => windowLength < numDaysSinceStart);
        windowLengths.push(numDaysSinceStart);

        const analyses = windowLengths.map(
            (windowLength) => new ThinkProgressAnalysis(this.props.dataset, windowLength, "days")
        );

        const extrapolations = analyses.map((analysis) => new ThinkProgressExtrapolation(
            analysis.name,
            analysis.endDate,
            analysis.completed,
            analysis.total,
            analysis.getCompletedPerUnit()
        ));
        return <div>
            <ThinkProgressVisualization dataset={this.props.dataset} extrapolations={extrapolations}/>
            <ThinkProgressTable dataset={this.props.dataset} extrapolations={extrapolations}/>
        </div>
    }
}

export {ThinkProgress};