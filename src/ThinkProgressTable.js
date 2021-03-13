import * as React from "react";
import {datasetCreatedTimeFormat} from "./ThinkProgressDataset";
import {Table} from "react-bootstrap";

let roundOff = (num, places) => {
    const x = Math.pow(10,places);
    return Math.round(num * x) / x;
};

class ThinkProgressBarRow extends React.Component {
    render() {
        return <tr>
            <td>{datasetCreatedTimeFormat(this.props.created)}</td>
            <td>{roundOff(this.props.completed, 2)}</td>
            <td>{this.props.total}</td>
            <td>{roundOff(this.props.completed / this.props.total * 100, 2)}%</td>
        </tr>;
    }
}



class ThinkProgressTable extends React.Component {
    render() {
        return <div>
            <h2>{this.props.name}</h2>

            <Table responsive borderless>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Progress</th>
                    <th>Total</th>
                    <th>% Completed</th>
                </tr>
                </thead>
                <tbody>
                {this.props.dataset.map((row, index) => {
                    return <ThinkProgressBarRow
                            key={index}
                            created={row.Created}
                            completed={row.Completed}
                            total={row.Total}
                        />
                })}
                </tbody>
            </Table>
            <small>
                * Percentages in the table above are rounded to two decimal places.
            </small>
        </div>;
    }
}

export {ThinkProgressTable};