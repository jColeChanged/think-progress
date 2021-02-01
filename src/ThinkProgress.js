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

    // A function which calculates the percentage of work which has been completed
    // from the start of a window until the end of the window. The progress prior to the
    // start of a window is the progress just before the window is reached.
    progressOverWindow(entries, windowLength) {

        // No progress over a window if the window is empty.
        if (entries.length === 0) {
            return 0;
        }

        let currentDate = new Date();
        let nDaysAgo = new Date();
        nDaysAgo.setDate(currentDate.getDate() - windowLength);

        let isInWindow = ((entry) => {
            let date = datesetCreatedParser(entry.Created)
            return nDaysAgo <= date && date <= currentDate;
        });

        let windowStart = -1;
        for (let i=0; i < entries.length; i++) {
            if (isInWindow(entries[i])) {
                windowStart = i;
                break;
            }
        }

        // There is no data in the window so no progress was made.
        if (windowStart === -1) {
            return 0;
        }

        let windowEnd = entries.length - 1;
        for (let i=windowStart; i < entries.length; i++) {
            if (!isInWindow(entries[i])) {
                windowEnd = i-1;
                break;
            }
        }

        // At this point windowsEnd is the last entry in the window,
        // window start is the first, and window start minus one is
        // the entry proceeding the window. Progress is therefore
        // window end entry progress minus the entry just before
        // window start.
        let initialRowIndex = windowStart - 1
        let initiallyCompleted = initialRowIndex === 0 ? 0 : entries[initialRowIndex].Completed;
        let finalCompleted = entries[windowEnd].Completed;
        return finalCompleted - initiallyCompleted;
    }


    render() {
        const name = "Book One";
        const entries = dataset[name];
        const recentProgress = this.progressOverWindow(entries, 28)
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