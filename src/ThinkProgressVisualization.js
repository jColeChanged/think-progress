import * as React from "react";
import {datesetCreatedParser}  from "./ThinkProgressDataset";
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
            height: 500,
            value: {
                x: d => datesetCreatedParser(d.Created),
                y: d => d.Completed
            },
            style: {
                stroke: "rgb(60, 120, 240)",
                strokeWidth: 1
            },
            margin: 50
        };

        options.canvasWidth = options.width - options.margin * 2;
        options.canvasHeight = options.height - options.margin * 2;

        let yScale = d3.scaleLinear().domain([0, total]).range([options.canvasHeight, 0]);


        let allProgressions = d3.merge(
            [
                dataset,
                d3.merge(
                    d3.filter(
                        this.props.extrapolations,
                        extrapolation => extrapolation.hasProgressionExtrapolation()
                    ).map(extrapolation => extrapolation.getData())
                )
            ]
        );
        let xScale = d3.scaleTime()
            .domain(d3.extent(allProgressions, options.value.x))
            .range([0, options.canvasWidth]);


        let line = d3
            .line()
            .x(d => xScale(options.value.x(d)))
            .y(d => yScale(options.value.y(d)))

        let xAxis = d3.axisBottom()
            .scale(xScale);


        const svg = d3.select(this._rootNode)
            .append("svg")
            .attr("width", options.width)
            .attr("height", options.height);

        const canvas = svg.append("g")
            .attr("transform", "translate(" + options.margin + "," + options.margin +")");

        canvas.append("g")
            .call(xAxis);
        // Finally, draw the path object.
        canvas
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