var makeMockData = function(){
  
  var data = {};
  data.grand_central = {
    time: [],
    count: []
  }

  data.times_square = {
    time: [],
    count:[]
  }

  for( var i = 0; i < 100; i++){
    
    var t0 = Math.floor(Math.random*1000000)) + Date.now();
    var t1 = Math.floor(Math.random*1000000)) + Date.now();
    var c0 = Math.floor(Math.random*1000));
    var c1 = Math.floor(Math.random*1000));
    data.grand_central.time.push(t0);
    data.grand_central.count.push(c0);
    data.times_square.time.push(t1);
    data.times_square.count.push(c1);
  }

  return data;
}