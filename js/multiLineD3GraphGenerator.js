/*eslint-disable */
var	margin = {top: 30, right: 40, bottom: 70, left: 50},
        width = 1300 - margin.left - margin.right,
        height = 440 - margin.top - margin.bottom;

        //var	parseDate = d3.time.format("%d-%b-%y").parse;

        var x = d3.scale.ordinal()
        .rangeRoundBands([0,width], 0.0,0.0);
        var	y = d3.scale.linear().range([height, 0]);

        var	xAxis = d3.svg.axis().scale(x)
        .orient("bottom");

        var	yAxis = d3.svg.axis().scale(y)
        .orient("left");

        var	valueline = d3.svg.line()
        .x(function(d) { return x(d.year); })
        .y(function(d) { return y(d['Birthratecrude']); });

        var	valueline2 = d3.svg.line()
        .x(function(d) { return x(d.year); })
        .y(function(d) { return y(d['Deathratecrude']); });

        var	svg = d3.select("#multiline")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Get the data
        d3.json("../outputdata/birth_vs_death.json", function(error, data) {
        data.forEach(function(d) {
            d.year = d.year;
            d['Birthratecrude'] = +d['Birthratecrude'];
            d['Deathratecrude'] = +d['Deathratecrude'];
        });

        x.domain(data.map(function(d){
          return d.year;
        }));
        // Scale the range of the data
        //x.domain(d3.extent(data, function(d) { return d.countries; }));
        y.domain([0, d3.max(data, function(d) { return Math.max(d['Deathratecrude'], d['Birthratecrude']); })+5]);

        svg.append("path")		// Add the valueline path.
        .attr("class", "line")
        .style("stroke", "red")
        .attr("d", valueline(data));

        svg.append("path")		// Add the valueline2 path.
        .attr("class", "line")
        .style("stroke", "green")
        .attr("d", valueline2(data));


        svg.append("g")			// Add the X Axis
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
               .style("text-anchor", "end")
               .attr("dx", "-.522em")
               .attr("dy", "-.100em")
               .attr("transform", "rotate(-90)")
               .style("font-size", "15px");

        svg.append("g")			// Add the Y Axis
        .attr("class", "y axis")
        .call(yAxis);

        svg.append("text")
        .attr("transform", "translate(" + (width-60) + "," + y(data[0]['Birthratecrude']) + ")")
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .style("fill", "red")
        .text("Birth");

        svg.append("text")
        .attr("transform", "translate(" + (width-60) + "," + y(data[0]['Deathratecrude']) + ")")
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .style("fill", "green")
        .text("Death");

        // console.log(data.length-1);
        // console.log(data[data.length-1].open);
        // console.log(data[0].open);
        // console.log(y(data[0].open));
        // console.log(y(data[0].close));

        });
/*eslint-enable */
