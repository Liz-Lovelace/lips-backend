const http = require('http');
const fetch = require('node-fetch');
const donplafon = require('./donplafon.js');


async function getHttp(url){
  let fetcher = new Promise((resolve, reject)=>{
    fetch(url)
      .then(res => res.text())
        .then(body=>{resolve(body);});
  });
  
  return fetcher;
}

function getLink(request){
  let linkFinder = new RegExp('https?://.*');
  let link = linkFinder.exec(request.url);
  if(link)
    link = link[0];
  else
    return "error";
  
  return link;
}

http.createServer((request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  let link = getLink(request);
  getHttp(link).then((httpStr)=>{
    let images = donplafon.findImages(httpStr);
    response.write(JSON.stringify(images));
    response.write(httpStr);
    response.end();
  });
}).listen(6002, "0.0.0.0");
