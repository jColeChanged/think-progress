import * as React from "react";
import {datesetCreatedParser}  from "./Data";
import * as d3 from "d3";


class ThinkProgressVisualization extends React.Component {

    componentDidMount() {
        this.drawChart();
    }

    drawChart() {
        const data = this.props.dataset.map((row) => row["Completed"] / row["Total"]);
        const w = 500;
        const h = 500;
        const svg = d3.select(this._rootNode)
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .style("margin-left", 100);

        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * 70)
            .attr("y", (d, i) => h - 10 * d)
            .attr("width", 65)
            .attr("height", (d, i) => d * 10)
            .attr("fill", "green")
    }

    shouldComponentUpdate() {
        // Prevents component re-rendering
        return false;
    }

    _setRef(componentNode) {
        this._rootNode = componentNode;
    }

    render() {
        return <div ref={this._setRef.bind(this)}/>
    }
}

export {ThinkProgressVisualization};