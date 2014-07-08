

/*
  select the body of the page
  append our chart div
  select all the div tags with class [newClassName]
  join the empty selection with data
  enter the selection
  append the div tag of the class [newClassName]

*/


var data0 = [1,2,3,4,5];

function draw0(data) {
  d3.select("body")
    .append("ul")   //append a ul
    .selectAll("li") //select li, there are none, preparing the empty selection
    .data(data)  //joins data with dataset
    .enter()  // the elements for which we have data but don't have items on the page
    .append("li")  // enter is now ready for us to append elements
    .text(function (d) {
      return "" + d;
    }); 
}


function draw1(data){
  d3.select("body")
    .append("div")  // enclosing element
      .attr("class","chart")
    .selectAll(".bar") //empty selection, divs whose class is bar
    .data(data.cash) // add data, creates enter 
    .enter()  // make enter selections divs
    .append("div")
      .attr("class", "bar")
      .style("width", function(d){ return d.count/100 + "px"})
      .style("outline", "1px solid black")
      .text(function(d){ return Math.round(d.count)});
      
}

var data1 = {};
data1.cash = []
for(var i = 0; i < 10; i++){
  data1.cash.push({'count':Math.random()*10000});
}

var params = {};
params.width = 700;
params.height = 300;

function draw2(data){
  d3.select("body")
    .append("svg")
      .attr("width", params.width)
      .attr("height", params.height)
    .selectAll("circle") // empty selection
    .data(data)  // join with data
    .enter()  // get enter selection
    append("circle");  // append as circle
}



// finding min and max values
// d3.extent is how you find the min and max values of data
// second argument selects the attribute to calculate min and max on
// usage
// var x_scale = d3.scale.linear()
//   .range([margin, width-margin])
//   .domain(x_extent)
// var x_extent = d3.extent(data, function(d){ return d.collision_with_injury; })


// creating axes. pass the scale constructor the scale object
// var x_axis = d3.svg.axis().scale(x_scale);

draw0(data0);
draw1(data1);


/*
  d3.select("svg")
    .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (height-margin) + ")")
    .call(x_axis)

  1. use transform to move the axis group down to the bottom of the graph
     SVG transforms take an existing element and either rotates them or
     moves them around. The translate transform just moves elements around
     Here the x_axis group is moved 0 pixels to the right and height-margin
     pixels down from the top.

  2. using .call() to actually draw the axis. All this does is call the
     the time_axis function, passing in the current selection.

*/
