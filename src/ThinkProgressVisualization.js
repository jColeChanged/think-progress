import * as React from "react";
import * as d3 from "d3";


class ThinkProgressVisualization extends React.Component {

    componentDidMount() {
        this.drawChart();
    }

    drawChart() {
        const dataset = this.props.dataset;
        let total = dataset.total;
        //const data = this.props.dataset.map((row) => row["Completed"] / row["Total"]);
        let options = {
            width: 500,
            height: 200,
            value: {
                x: d => d.Created,
                y: d => d.Completed
            },
            style: {
                strokeWidth: 1
            },
            margin: 50
        };

        options.canvasWidth = options.width - options.margin * 2;
        options.canvasHeight = options.height - options.margin * 2;

        let yScale = d3.scaleLinear().domain([0, total]).range([options.canvasHeight, 0]);
        let yScalePercentage = d3.scaleLinear()
            .domain([100, 0])
            .range([0, options.canvasHeight]);

        let extrapolationsWithProgression = d3.filter(
            this.props.extrapolations,
            extrapolation => extrapolation.hasProgressionExtrapolation()
        );
        let extrapolatedProgressions = extrapolationsWithProgression.map(extrapolation => extrapolation.getData());
        let allProgressions = [dataset].concat(extrapolatedProgressions);
        let allEntries = allProgressions.map((progressData) => progressData.entries);
        let allProgressionValues = d3.merge(allEntries);

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



        let yAxisLeft = d3.axisLeft()
            .scale(yScale);

        let yAxisRight = d3.axisRight()
            .scale(yScalePercentage)
            .tickFormat((d) => d + "%");

        let svg = d3.select(this._rootNode)
            .append("svg")
            .attr("width", options.width)
            .attr("height", options.height)


        let canvas = svg.append("g")
            .attr("transform", "translate(" + options.margin + "," + options.margin +")");

        canvas.append("g")
            .call(xAxis)
            .attr("transform", "translate(" + 0 + "," + options.canvasHeight +")");


        canvas.append("g")
            .call(yAxisLeft);

        canvas.append("g")
            .call(yAxisRight)
            .attr("transform", "translate(" + options.canvasWidth + "," + 0+")");

        let progressLines = canvas.selectAll("path.line").data(allEntries);
        progressLines
            .enter()
            .append("path")
            .classed("line", true)
            .attr("d", line)
            .style("stroke", (d, i) => colorScale(i))
            .style("stroke-width", options.style.strokeWidth);

        let legend = canvas.append("g")
            .attr("transform", "translate(" + 0 + "," + options.canvasHeight+")");

        // create legend
        legend.selectAll(".legendDot")
            .data(allProgressions)
            .enter()
            .append("circle")
            .classed('legendDot', true)
            .attr("cx", 100)
            .attr("cy", function(d,i){ return 0 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
            .attr("r", 7)
            .style("fill", function(d, i){ return colorScale(i)})

        // Add one dot in the legend for each name.
        legend.selectAll(".legendLabel")
            .data(allProgressions)
            .enter()
            .append("text")
            .classed("legendLabel", true)
            .attr("x", 120)
            .attr("y", function(d,i){ return 0 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", function(d, i){ return colorScale(i)})
            .text(function(d){ return !d.extrapolated ? "progress updates" : d.name; })
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")
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