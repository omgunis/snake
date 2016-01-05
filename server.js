var express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    logger     = require('morgan'),
    path       = require('path'),
    port       = process.env.PORT || 3000

app.listen(port, function(){
  console.log('Listening on port ' + port);
})
