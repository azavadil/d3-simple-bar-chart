app.directive('lineChart', function(){

  function link(scope, el, attr){



    var margin = {top:20, right:20, bottom: 30, left:40};
    var width = 960 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;


    var y = d3.scale.linear()
      .range([height, 0]);
  
    // var xAxis = d3.svg.axis()
    //   .scale(x)
    //   .orient("bottom");

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(10, "%");

    var svg = d3.select(el[0]).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // svg.append("g")
    //     .attr("class", "x axis")
    //     .attr("transform", "translate(0" + height + ")")
    //     .call(xAxis);

    var barWidth = 200;

    var bar = svg.selectAll("g")
        .data(scope.data[0])
      .enter().append("g");

    console.log(bar);

    bar.append("rect")
      .attr("y", function(d){ 
        console.log("votes:", d.votes);
          return y(d.votes)})
      .attr("height", function(d){ return height - y(d.votes); })
      .attr("width", barWidth);

    svg.append("g")
        // .attr("class", "y axis")
        // .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Votes")

    // svg.selectAll(".bar")
    //   .data(scope.data)
    // .enter().append("rect")
    //   .attr("class", "bar")
    //   .attr("x", function(d) { return x(d.votes); })
    //   .attr("width", x.rangeBand())
    //   .attr("y", function(d) { return y(d.votes); })
    //   .attr("height", function(d) { return height - y(d.frequency); });

     scope.$watch('data', function(data){
      //watch code here
    });
  }


  return {
    link: link,
    restrict: 'E',
    scope:{data: '='}
  };

});