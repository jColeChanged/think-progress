import * as React from "react";
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
                x: d => d.Created,
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


        let extrapolationsWithProgression = d3.filter(
            this.props.extrapolations,
            extrapolation => extrapolation.hasProgressionExtrapolation()
        );
        let extrapolatedProgressions = extrapolationsWithProgression.map(extrapolation => extrapolation.getData());
        let allProgressions = [dataset].concat(extrapolatedProgressions);
        let allProgressionValues = d3.merge(allProgressions);
        let xScale = d3.scaleTime()
            .domain(d3.extent(allProgressionValues, options.value.x))
            .range([0, options.canvasWidth]);

        let colorScale = d3.scaleOrdinal(d3.schemeAccent);
        let line = d3
            .line()
            .x(d => xScale(options.value.x(d)))
            .y(d => yScale(options.value.y(d)));

        let xAxis = d3.axisBottom()
            .scale(xScale)
            .tickFormat(d3.timeFormat("%m-%d"));

        let svg = d3.select(this._rootNode)
            .append("svg")
            .attr("width", options.width)
            .attr("height", options.height);

        let canvas = svg.append("g")
            .attr("transform", "translate(" + options.margin + "," + options.margin +")");

        canvas.append("g")
            .call(xAxis);

        let progressLines = canvas.selectAll("path.line").data(allProgressions);
        progressLines
            .enter()
            .append("path")
            .classed("line", true)
            .attr("d", line)
            .style("stroke", (d, i) => colorScale(i))
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