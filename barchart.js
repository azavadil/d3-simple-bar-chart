app.directive('lineChart', function(){

  function link(scope, el, attr){


    console.log(scope.data);
    var margin = {top:0, right:20, bottom: 0, left:40};
    var width = 960 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;



    var y = d3.scale.linear()
      .range([0, height]);

    var yAxisScale = d3.scale.linear()
      .domain([-1,1])
      .range([height, 0]);
  
    // var xAxis = d3.svg.axis()
    //   .scale(x)
    //   .orient("bottom");

    var yAxis = d3.svg.axis()
      .scale(yAxisScale)
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

    var barWidth = 100;

    var bar = svg.selectAll("g")
        .data([scope.data[0]])
      .enter().append("g");

    // y is the y position
    // height is the height from the y position
    // TODO: put back to d.votes

    // if votes is postive then we build the rectangle from the middle
    // to the top
    // if votes is negative then we build the rectange from the
    // the bottom 
    



    bar.append("rect")
      .attr("y", function(d){ 
          var bottomOfBar = d.votes >= 0 ? 0.5 : 0.5 + 0.5*Math.abs(d.votes/d.voteTotal);
          console.log('bob', bottomOfBar, "y(bob)", y(bottomOfBar), 'height', y(d.votes/d.voteTotal));
          return y(bottomOfBar) + margin.top; })
      .attr("height", function(d){ return y(0.5*Math.abs(d.votes/d.voteTotal)); })
      .attr("width", barWidth)
      .attr("class", "thermometer");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("% Hot")


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


/*
 0: 450
 0.1: 405
 0.2: 360
 0.3: 315
 */ 