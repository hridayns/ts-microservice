var express = require('express');
var path = require('path');
var app = express();
var port = process.env.PORT || 3000;
app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/:dateStr', function(req, res){
  var str = req.params.dateStr;
  res.json(parseStr(str));
});

app.listen(port);

function parseStr(str) {
  var obj = {
    unix: null,
    natural: null
  };
  var date;
  //if its a number
  if(!isNaN(str)) {
    //use unix timestamp and create natural date
    date = new Date(parseInt(str*1000));
    obj.unix = str;
    obj.natural = genNatural(date);
  }
  else {
    //parse natural date and generate unix timestamp
    date = new Date(str);
    obj.unix = genUnix(date);
    obj.natural = str;
  }
  return obj;
}
function genUnix(date) {
  var unixTs = date.getTime()/1000;
  return unixTs;
}
function genNatural(date) {
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var day = date.getDate();
  var month = months[date.getMonth()];
  var year = date.getFullYear();
  var naturalDate = day + ' ' + month + ', ' + year;
  return naturalDate;
}
