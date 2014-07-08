


var time = [];


for(var i = 0; i < 100; i++){
  time.push({time: Date.now() + Math.floor(Math.random() * 1000000)});
}


var margin = 40;
var width = 700 - margin;
var height = 300 - margin;


var draw0 = function(data){
  var time_extent = d3.extent(
    time, function(d){ return d.time; }
  );

  var time_scale = d3.time.scale()
    .domain(time_extent)
    .range([margin, width]);

  var extentDiv = $("<div>", {class: "extent"}).text(time_extent);
  $("body").append(extentDiv);

  var scaleDiv = $("<div>", {class: "time"}).text(time_scale);
  $("body").append(scaleDiv);

  for(var i = 0; i < 10; i++){
    console.log(time[i]);
    var timeText = "time: " + time[i].time + " scale(time): " + time_scale(time[i].time);
    var timeDiv = $("<div>", {class: "time_scale"}).text(timeText);
    $("body").append(timeDiv);
  }


} 

draw0(time); 