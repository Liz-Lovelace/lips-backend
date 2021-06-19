const http = require('http');
const fetch = require('node-fetch');
const donplafon = require('./donplafon.js');

async function getHttp(url){
  let res;
  try{ res = await fetch(url); } 
    catch (err) { throw(error)(); }
  
  if(res.ok)
    return res.text();
  else
    throw(error)();
}

function findLink(request){
  let linkFinder = new RegExp('\\?link=(https?://.*)');
  let link = linkFinder.exec(request.url);
  if(link)
    return link[1];
  else
    throw(error)(); 
}

http.createServer(async (request, response) => {
  
  let link
  try{ link = findLink(request);}
    catch(err){
      response.writeHead(400, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      response.end();
    }
  
  let httpStr;
  try { httpStr = await getHttp(link)}
    catch (err){
      response.writeHead(400, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      response.end();
      return;
    };
  
  let obj = {};
  obj.images = donplafon.findImages(httpStr);
  obj.dimentions = donplafon.findDimentions(httpStr);
  response.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  response.write(JSON.stringify(obj));
  response.end();

}).listen(6002, "0.0.0.0");