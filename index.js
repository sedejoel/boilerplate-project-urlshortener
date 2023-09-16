require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const isUrlHttp = require('is-url-http');
const app = express();
var dns = require('dns');
var URI=[];


// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use('/public', express.static(`${process.cwd()}/public`));
//app.use('/api/shorturl', shorturl);

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


// Your first API endpoint
app.post('/api/shorturl',(req,res,next)=>{
  console.log('===========');
  console.log(req.body);
  let body = req.body.url.toLowerCase();

  var w = dns.lookup(body, (err,adress)=>{
    console.log(err);
    if ((err==null) || (body=='' || (isUrlHttp(body)==false))) {
      res.json({error:'invalid url'});
    }else{
      let id=URI.length+1;

    let uriExist = URI.find(el=>el.url===body);

    if (uriExist){
      res.send({original_url:body, short_url:uriExist.id});
    }else{
      URI.push({url:body, id:id})
      res.send({original_url:body, short_url:id});
    }
    }
  });

  
});


app.get('/api/shorturl/:id',(req,res)=>{
//console.log(URI);
const resultat = URI.find(el=>el.id===parseInt(req.params.id));

let uri=resultat.url;
console.log(uri);
res.redirect(uri);
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
