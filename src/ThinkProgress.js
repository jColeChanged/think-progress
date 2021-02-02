import * as React from "react";
import {dataset, datesetCreatedParser}  from "./Data";

class ThinkProgressBarRow extends React.Component {

    render() {
        return <tr>
            <td>{this.props.created}</td>
            <td>{this.props.completed}</td>
            <td>{this.props.total}</td>
            <td>{this.props.completed / this.props.total * 100}%</td>
        </tr>;
    }
}

class ThinkProgress extends React.Component {

    // Returns [windowStart, windowEnd] given a windowLength.
    makeWindow(windowLength, windowUnits) {
        windowUnits = "days";

        if (windowUnits === "days") {
            let currentDate = new Date();
            let nDaysAgo = new Date();
            nDaysAgo.setDate(currentDate.getDate() - windowLength);
            return [nDaysAgo, currentDate];
        }
    }


    // A function which calculates the percentage of work which has been completed
    // from the start of a window until the end of the window. The progress prior to the
    // start of a window is the progress just before the window is reached.
    progressDuringWindow(entries, window) {

        // No progress over a window if the window is empty.
        if (entries.length === 0) {
            return 0;
        }

        let [windowStartDate, windowEndDate] = window;

        let isInWindow = ((entry) => {
            let date = datesetCreatedParser(entry.Created)
            return windowStartDate <= date && date <= windowEndDate;
        });

        let windowStartIndex = -1;
        for (let i=0; i < entries.length; i++) {
            if (isInWindow(entries[i])) {
                windowStartIndex = i;
                break;
            }
        }

        // There is no data in the window so no progress was made.
        if (windowStartIndex === -1) {
            return 0;
        }

        let windowEndIndex = entries.length - 1;
        for (let i=windowStartIndex; i < entries.length; i++) {
            if (!isInWindow(entries[i])) {
                windowEndIndex = i-1;
                break;
            }
        }

        // At this point windowsEnd is the last entry in the window,
        // window start is the first, and window start minus one is
        // the entry proceeding the window. Progress is therefore
        // window end entry progress minus the entry just before
        // window start.
        let initialRowIndex = windowStartIndex - 1
        let initiallyCompleted = initialRowIndex === 0 ? 0 : entries[initialRowIndex].Completed;
        let finalCompleted = entries[windowEndIndex].Completed;
        return finalCompleted - initiallyCompleted;
    }


    render() {
        const name = "Book One";
        const entries = dataset[name];
        const window = this.makeWindow(28, "days");
        const recentProgress = this.progressDuringWindow(entries, window);
        console.log(recentProgress);

        return <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Progress</th>
                    <th>Total</th>
                    <th>Percentage Complete</th>
                </tr>
            </thead>
            <tbody>
            {entries.map((row) => {
                return <ThinkProgressBarRow
                    created={row.Created}
                    completed={row.Completed}
                    total={row.Total}
                />
            })}
            </tbody>
        </table>;
    }
}

export default ThinkProgress;