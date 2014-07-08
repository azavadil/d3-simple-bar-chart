


var makeMockData = function(){
  
  var data = [];
  
  for(var i = 0; i < 100; i++){
    
    var d0 = Math.random()*5;
    var d1 = Math.random()*5000;
    var d2 = Math.random()*5;
    var row = {
      collision_with_injury: d0,
      dist_between_fail: d1,
      customer_accident_rate: d2
    };
    data.push(row);
  }

  return data;
}

var displayData = function(data){
  for(var i = 0; i < data.length; i++){
    console.log(data[i].collision_with_injury,
                data[i].dist_between_fail,
                data[i].customer_accident_rate);

  }
}

var displayScaledData = function(data, x, y){
  for(var i = 0; i < data.length; i++){
    console.log(x(data[i].collision_with_injury),
                y(data[i].dist_between_fail),
                data[i].customer_accident_rate);

  }
}

var draw0 = function(data){

  var margin = 50;
  var width = 700;
  var height = 300;

  d3.select("body")
    .append("svg")   // create our svg canvas
      .attr("width", width)  
      .attr("height", height)
    .selectAll("circle")  //empty selection
    .data(data)           //join data with empty selection
    .enter()              //joining data with empty selection creates enter sel
    .append("circle");

  /**extent is a convience function that d3 provides that returns the min and
   * max values of its arguments.
   * @param {collection} - collection to find min and max values
   * @param {accessor function} - property to find min or max of
   */

  var x_extent = d3.extent(data, function(d){ return d.collision_with_injury; });

  // x_scale now maps extent of data onto the range [40, 660]
  var x_scale = d3.scale.linear()
    .range([margin, width-margin])
    .domain(x_extent);

  var y_extent = d3.extent(data, function(d){
    return d.dist_between_fail;
  });

  // Note that the domain for the y-scale is the minimum to the maximum
  // value in the data set yet the range is from the min y-value in the 
  // viewport to the margin value. This means we map the largest data point
  // to 50 and the smallest to 300. We do this because the viewports origin
  // is the top left
  var y_scale = d3.scale.linear()
    .range([height - margin, margin])
    .domain(y_extent);

  d3.selectAll("circle")
    .attr("cx", function(d){ return x_scale(d.collision_with_injury);})
    .attr("cy", function(d){ return y_scale(d.dist_between_fail);});

  d3.selectAll("circle")
    .attr("r", 5);

  // this creates a function that when called returns a set of SVG
  // elements that draws the axis, the axis ticks, and tick labels
  var x_axis = d3.svg.axis().scale(x_scale);

  // two new things happening 
  // 1. using SVG transform to move the axis group down to the bottom of the
  //    graph. Translate just moves elements around (useful to apply to group)
  //    Concretely, x-axis group is moved 0 px to the right and height-margin
  //    px down from the top
  // 2. .call() draws the axis. All this does is call the time_axis function
  //    passing the current selection (the group element) 
  d3.select("svg")
    .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (height-margin) + ")")
    .call(x_axis);

  var y_axis = d3.svg.axis().scale(y_scale).orient("left");

  /**
    call() takes a selection as input and hands that selection off to a 
    function.
    often we're appending a new g group element element to contain all of our
    about to be generated axis elements.
    The g becomes the selection for the next link in the chain. call()
    hands that selection off to the xAxis function, so our axis is generated
    with the new g.
    svg.append("g")
      .call(d3.svg.axis()
        .scale(xScale)
        .orient("bottom"));

    unlike the x-axis we need to use orient method to set the axis orientation
    to left and we need to move the y-axis in from the enclosing element
    by margin px.

  */


  d3.select("svg")
    .append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + margin + ", 0 )")
    .call(y_axis);

  /**
   * Adding axis titles
   * x axis: select the x-axis group, append a text element, specify its
             text content as well as its x and y coords relative to the 
             top left corner of the group element (i.e. the x-axis group)
     y axis: rotation and translation
             to rotate SVG text we specify the amount by which we'd like to
             rotate, in degrees, and the x,y coords of the point to rotate
             around
             concretely,  we create text at the top of the axis group,
             specify a rotation that transforms the text through 90 degrees
             about a point to the left of the top corner,and translate the 
             label down into place
  */

  d3.select(".x.axis")
    .append("text")
      .text("collisions with injury (per million miles)")
      .attr("x", (width/2) - margin)
      .attr("y", margin / 1.5);

  d3.select(".y.axis")
    .append("text")
    .text("mean distance between failure (miles)")
    .attr("transform", "rotate (-90, -43, 0) translate (-280)");

} 

draw0(makeMockData());