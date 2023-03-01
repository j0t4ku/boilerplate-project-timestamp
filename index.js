// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
let strftime= require('strftime');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date",(req,res)=>{
  let unixTimestamp;
  let utcDate;
  res.set({'Content-Type':'application/json'})
  let date=/^[0-9]+$/.test(req.params.date);
  if(!date){

    unixTimestamp = Date.parse(req.params.date)
    utcDate = new Date(unixTimestamp).toUTCString()

    if(!unixTimestamp) {
      res.json({error: "Invalid Date"})
    }else {
      res.json({"unix":unixTimestamp, "utc":utcDate})
    }
  }else{
    unixTimestamp = parseInt(req.params.date)
   const actualDate = new Date(unixTimestamp)
    utcDate = actualDate.toUTCString()
    res.json({
      "unix": unixTimestamp,
      "utc": utcDate
    });
    
    }
  })

  app.get('/api/',(req,res)=>{
    const currentDate= new Date().toUTCString()
    const curretnDateUnix= Date.parse(currentDate)
    res.json({"unix":curretnDateUnix, "utc":currentDate})
  })

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
