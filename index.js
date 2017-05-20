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
  var unix = '';
  var natural = '';
  var obj = {
    unix: null,
    natural: null
  };
  //if its a number
  if(!isNaN(str)) {
    //use unix timestamp and create natural date
    var date = new Date(parseInt(str)*1000);
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var day = date.getDate();
    var month = months[date.getMonth()];
    var year = date.getFullYear();
    var naturalDate = day + ' ' + month + ', ' + year;
    obj.unix = str;
    obj.natural = naturalDate;
  }
  else {
    //parse natural date and generate unix timestamp
    var unixTs = new Date(str).getTime()/1000;
    obj.unix = unixTs;
    obj.natural = str;
  }
  return obj;

}
