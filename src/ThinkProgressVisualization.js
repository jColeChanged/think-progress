import * as React from "react";
import {datesetCreatedParser}  from "./Data";
import * as d3 from "d3";


class ThinkProgressVisualization extends React.Component {

    componentDidMount() {
        this.drawChart();
    }

    drawChart() {
        const dataset = this.props.dataset;
        let total = dataset[0]["Total"];
        //const data = this.props.dataset.map((row) => row["Completed"] / row["Total"]);
        let options = {
            width: 500,
            height: 100,
            value: {
                x: d => datesetCreatedParser(d.Created),
                y: d => d.Completed
            },
            style: {
                stroke: "rgb(60, 120, 240)",
                strokeWidth: 1
            },
        };

        let yScale = d3.scaleLinear().domain([0, total]).range([options.height, 0]);


        // TODO: Combine real and extrapolated data.
        // The extent of the x domain includes both the real
        // and extrapolated data. So we need to combine the
        // real data with the extrapolated data.
        let xScale = d3.scaleLinear()
            .domain(d3.extent(dataset, options.value.x))
            .range([0, options.width]);

        let line = d3
            .line()
            .x(d => xScale(options.value.x(d)))
            .y(d => yScale(options.value.y(d)))

        const svg = d3.select(this._rootNode)
            .append("svg")
            .attr("width", options.width)
            .attr("height", options.height);

        // Finally, draw the path object.
        svg
            .append("path")
            .datum(dataset)
            .attr("d", line)
            .style("fill", "none")
            .style("stroke", options.style.stroke)
            .style("stroke-width", options.style.strokeWidth);
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