

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


draw0(data0);
draw1(data1);

