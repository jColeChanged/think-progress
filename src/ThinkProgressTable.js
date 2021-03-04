import * as React from "react";
import {datasetCreatedTimeFormat} from "./ThinkProgressDataset";

class ThinkProgressBarRow extends React.Component {

    render() {
        return <tr>
            <td>{datasetCreatedTimeFormat(this.props.created)}</td>
            <td>{this.props.completed.toFixed(2)}</td>
            <td>{this.props.total}</td>
            <td>{(this.props.completed / this.props.total * 100).toFixed(2)}%</td>
        </tr>;
    }
}



class ThinkProgressTable extends React.Component {
    render() {

        return <table>
            <caption>{this.props.name}</caption>
            <thead>
            <tr>
                <th>Date</th>
                <th>Progress</th>
                <th>Total</th>
                <th>Percentage Complete</th>
            </tr>
            </thead>
            <tbody>
            {this.props.dataset.map((row) => {
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

export {ThinkProgressTable};