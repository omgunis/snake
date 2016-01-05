var express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    logger     = require('morgan'),
    path       = require('path'),
    port       = process.env.PORT || 3000

app.use(logger('dev'))

// app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res){
  console.log('Sending index')
  res.sendFile(__dirname + 'index.html')
})

app.listen(port, function(){
  console.log('Listening on port ' + port);
})
