import * as React from "react";
import * as d3 from "d3";

import {ThinkProgressTable} from "./ThinkProgressTable";
import {ThinkProgressVisualization} from "./ThinkProgressVisualization";
import {ThinkProgressAnalysis} from "./ThinkProgressAnalysis";
import {ThinkProgressExtrapolation} from "./ThinkProgressExtrapolation";


function daysSinceStart(dataset) {
    // Calculates the length of time passed since the first entry was entered.
    // When no entries exist the days since the start of data collection is zero.
    let now = new Date();
    let start = dataset.isEmpty() ? now : dataset.entries[0].Created;
    let numDaysSinceStart = d3.timeDay.count(start, now);
    return numDaysSinceStart;
}

const DAILY_WINDOW = 1;
const WEEKLY_WINDOW = 7;
const MONTHLY_WINDOW = 30;
const YEARLY_WINDOW = 365;


class ThinkProgress extends React.Component {

    render() {
        let dataset = this.props.dataset;

        // We're going to analyze the dataset to determine moving averages at
        // various time windows. If we don't have data for a time window of that
        // length we don't give an estimate. We also don't try if we don't have
        // any data.
        let numDaysSinceStart = daysSinceStart(dataset);
        let windowLengthsToAnalyze = [
            numDaysSinceStart,
            DAILY_WINDOW,
            WEEKLY_WINDOW,
            MONTHLY_WINDOW,
            YEARLY_WINDOW
        ].filter(
            (windowLength) => !dataset.isEmpty() && windowLength <= numDaysSinceStart
        );
        const analyses = windowLengthsToAnalyze.map(
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
                        <ThinkProgressVisualization preview={!this.props.selected} dataset={dataset} extrapolations={extrapolations}/>
                    </figure>
                </figure>
                <ThinkProgressTable name="actual progress" dataset={dataset.entries}/>
                {extrapolatedProgressions.map(eds => <ThinkProgressTable key={eds.name} name={eds.name} dataset={eds.entries}/>)}
            </div>;
        }
        else {
            return <div onClick={this.props.onClick}>
                <ThinkProgressVisualization preview={!this.props.selected} dataset={dataset} extrapolations={extrapolations}/>
            </div>;
        }
    }
}

export {ThinkProgress, daysSinceStart};