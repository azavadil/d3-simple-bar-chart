var margin = 40;
var width = 700 - margin;
var height = 300 - margin;


var data = {}; 
data.times_square = [];
data.grand_central = [];

for(var i = 0; i < 100; i++){
  data.times_square.push( {count:Math.floor(Math.random()*100))} );
  data.grand_central.push( {count:Math.floor(Math.random()*100))} );                      
  
}

var draw0 = function(data){
  d3.select("body")
    .append("svg")
      .attr("width", width + margin)
      .attr("width", height + margin)
    .append(g)
      .attr("class", "chart")

  d3.select("svg")
    .selectAll("circle.times_square")
    .data(data.times_square)
    .enter()
    .append("circle")
      .attr("class","times_square");

  d3.select("svg")
    .selectAll("circle.grand_central")
    .data(data.grand_central)
    .enter()
    .append("circle")
      .attr("class", "grand_central")

  var count_extent = d3.extent(
    data.times_square.concat(data.grand_central),
    function(d){ return d.count; }
  };

  var count_scale = d3.scale.linear()
    .domain(count_extent)
    .range([height, margin]);


  var time_extent = d3.extent(
    data.times_square.concat(data.grand_central),
    function(d){ return d.time; }
  };

  var time_scale = d3.time.scale()
    .domain(time_extent)
    .range([margin, width]);


  var time_axis = d3.svg.axis()
    .scale(time_scale);

    
