const http = require('http');
const fetch = require('node-fetch');
const donplafon = require('./html-parsers/donplafon.js');

async function getHttp(url){
  let res;
  try {
    res = await fetch(url); 
  }catch (err){
    throw('fetch error');
  }
  
  if(res.ok)
    return res.text();
  else
    throw('result error');
}

function findLink(url){
  let linkFinder = new RegExp('\\?link=(https?://.*)');
  let link = linkFinder.exec(url);
  if(link)
    return link[1];
  else
    throw('link error'); 
}
let stdHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
}
http.createServer(async (request, response) => {
  let link;
  try{
    link = findLink(request.url);
  }catch(err){
    response.writeHead(400, stdHeaders);
    response.end();
    return;
  }
  
  let httpStr;
  try { 
    httpStr = await getHttp(link);
  } catch (err){
    response.writeHead(400, stdHeaders);
    response.end();
    return;
  };
  
  let obj = {};
  obj.name = donplafon.findName(httpStr);
  obj.images = donplafon.findImages(httpStr);
  obj.dimentions = donplafon.findDimentions(httpStr);
  response.writeHead(200, stdHeaders);
  response.write(JSON.stringify(obj));
  response.end();
}).listen(6002, "0.0.0.0");