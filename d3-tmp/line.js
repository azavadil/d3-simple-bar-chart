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


}

draw0(makeMockData());