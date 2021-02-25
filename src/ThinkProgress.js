import * as React from "react";
import * as d3 from "d3";

import {ThinkProgressTable} from "./ThinkProgressTable";
import {ThinkProgressVisualization} from "./ThinkProgressVisualization";
import {ThinkProgressAnalysis} from "./ThinkProgressAnalysis";
import {ThinkProgressExtrapolation} from "./ThinkProgressExtrapolation";

function daysSinceStart(dataset) {
    let now = new Date();
    let start = dataset.entries[0].Created;
    let numDaysSinceStart = d3.timeDay.count(start, now);
    return numDaysSinceStart;
}

class ThinkProgress extends React.Component {

    render() {
        let dataset = this.props.dataset;
        let numDaysSinceStart = daysSinceStart(dataset);
        let windowLengths = [1, 7, 30, 365].filter((windowLength) => windowLength < numDaysSinceStart);
        windowLengths.push(numDaysSinceStart);

        const analyses = windowLengths.map(
            (windowLength) => new ThinkProgressAnalysis(dataset.entries, windowLength, "days")
        );

        const extrapolations = analyses.map((analysis) => new ThinkProgressExtrapolation(
            analysis.name,
            analysis.endDate,
            analysis.completed,
            analysis.total,
            analysis.getCompletedPerUnit()
        ));
        return <div>
            <ThinkProgressVisualization dataset={dataset.entries} extrapolations={extrapolations}/>
            <ThinkProgressTable dataset={dataset.entries} extrapolations={extrapolations}/>
        </div>
    }
}

export {ThinkProgress};