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
            "progress extrapolated from " + analysis.name,
            analysis.endDate,
            analysis.completed,
            analysis.total,
            analysis.getCompletedPerUnit()
        ));

        let extrapolationsWithProgression = d3.filter(
            extrapolations,
            extrapolation => extrapolation.hasProgressionExtrapolation()
        );
        let extrapolatedProgressions = extrapolationsWithProgression.map(extrapolation => extrapolation.getData());

        if (this.props.selected) {
            return <div>
                <figure>
                    <figcaption><h1>{dataset.name} Progress</h1></figcaption>
                    <figure>
                        <ThinkProgressVisualization dataset={dataset} extrapolations={extrapolations}/>
                    </figure>
                </figure>
                <ThinkProgressTable name="actual progress" dataset={dataset.entries}/>
                {extrapolatedProgressions.map(eds => <ThinkProgressTable key={eds.name} name={eds.name} dataset={eds.entries}/>)}
            </div>;
        }
        else {
            return <div onClick={this.props.onClick}>
                <ThinkProgressVisualization dataset={dataset} extrapolations={extrapolations}/>
            </div>;
        }
    }
}

export {ThinkProgress, daysSinceStart};