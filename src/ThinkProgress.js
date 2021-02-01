import * as React from "react";
import {dataset}  from "./Data";

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

    /*
    window(windowStart, windowEnd, entries) {
        let currentDate = new Date();
        let nDaysAgo = new Date();
        nDaysAgo.setDate(currentDate.getDate() - windowLength);

        entries.filter(function(entry) {
           return Data.datesetCreatedParser.parse(entry.created);
        });
    }
    */

    render() {
        const name = "Book One";
        const entries = dataset[name];

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