require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
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

  var w3 = dns.lookup(req.body.original_url, function (err, addresses) {

    //console.log(err);
    if (err){
      res.json({error:'invalid url'});
    }else{
      let id=URI.length+1;

    let uriExist = URI.find(el=>el.url===req.body.original_url);

    if (uriExist){
      res.json({"original_url":req.body.original_url, "short_url":uriExist.id});
    }else{
      URI.push({url:req.body.original_url, id:id})
      res.json({"original_url":req.body.original_url, "short_url":id});
    }
    }

    
    //
  });

  
});


app.get('/api/shorturl/:id',(req,res)=>{
//console.log(req.params.id);
const resultat = URI.find(el=>el.id===parseInt(req.params.id));
res.status(301).redirect(resultat.url);
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
