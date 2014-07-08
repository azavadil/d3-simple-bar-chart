var makeDataObject = function(){
  var time = Math.floor(Math.random()*1000000) + Date.now();
  var count = Math.floor(Math.random()*1000);
  var cur = { 'time': time, 'count':count};
  return cur;
}

var makeMockData = function(){
  
  var data = {};
  data.grand_central = []; 

  data.times_square = [];

  for( var i = 0; i < 100; i++){
    data.grand_central.push(makeDataObject());
    data.times_square.push(makeDataObject());
  }
  return data;

};

var viewData = function(data, c, t){
  for(var i = 0; i < data.grand_central.length; i++){
    var cur = data.grand_central[i];
    console.log(cur.count,
                cur.time, 
                c(cur.count),
                t(cur.time)
                );
  }
}

var draw0 = function(data){
  var margin = 40;
  var width = 700 - margin;
  var height = 300 - margin;

  d3.select("body")
    .append("svg")  //attach an svg to the body
      .attr("width", width + margin)
      .attr("width", height + margin)
    .append("g")
      .attr("class", "chart");

  d3.select("svg")
    .selectAll("circle.times_square") // empty selection
    .data(data.times_square)          // join with data creating enter selection
    .enter()                          // get enter selection
    .append("circle")                 // append enter selection as circles
      .attr("class", "times_square");  

  d3.select("svg")
    .selectAll("circle.grand_central") // empty selection
    .data(data.grand_central)          // join with data creating enter selection
    .enter()                           // get enter selection
    .append("circle")                  // append enter selection as circles
      .attr("class", "grand_central");

  var count_extent = d3.extent(
    data.times_square.concat(data.grand_central),
    function(d){ return d.count; }
  );

  var count_scale = d3.scale.linear()
    .domain(count_extent)
    .range([height, margin]);

  d3.selectAll("circle")
    .attr("cy", function(d){ return count_scale(d.count);});

  var time_extent = d3.extent(
    data.times_square.concat(data.grand_central),
    function(d){ return d.time; }
  );

  /*

  */
  var time_scale = d3.time.scale()
    .domain(time_extent)
    .range([margin, width]);

  d3.selectAll("circle")
    .attr("cx", function(d){ return time_scale(d.time); });

  d3.selectAll("circle")
    .attr("cy", function(d){ return count_scale(d.count); })
    .attr("cx", function(d){ return time_scale(d.time); })
    .attr("r", 3);

  var time_axis = d3.svg.axis()
    .scale(time_scale)

  d3.select("svg")
    .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(time_axis);

  var count_axis = d3.svg.axis()
    .scale(count_scale)
    .orient("left");

  d3.select("svg")
    .append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + margin + ",0)")
    .call(count_axis);

  /** path generator
   * @param{ accessor function } - function to return x value
   * @param{ accessor function } - function to return y value
     d3.svg.line() generates a function that takes in a data set and 
     outputs and SVG path element

     we pass the lineGeneratorFn a data set and it returns a line path 

  */
  var lineGeneratorFn = d3.svg.line()
    .x(function(d){ return time_scale(d.time); })
    .y(function(d){ return count_scale(d.count); });

  d3.select("svg")
    .append("path")
      .attr("d", lineGeneratorFn(data.times_square))
      .attr("class", "times_square")

  d3.select("svg")
    .append("path")
      .attr("d", lineGeneratorFn(data.grand_central))
      .attr("class", "grand_central");

  d3.select(".y.axis")
    .append("text")
    .text("mean number of turnstile revolutions")
    .attr("transform", "rotate (90, " + -margin + ", 0)")
    .attr("x", 20)
    .attr("y", 0);

  d3.select(".x.axis")
    .append("text")
      .text("time")
      .attr("x", function(){return (width/1.6) - margin; })
      .attr("y", margin/1.5);



}

draw0(makeMockData());