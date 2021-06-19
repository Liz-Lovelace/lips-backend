const strutils = require('../utils/str-utils.js');

function findPropertyValue(property, htmlStr){
  let propertyRegex = new RegExp(property + '(.?){6}</td>(.?){2}<td>(([0-9].?[^<])*)', 'g');
  let val = propertyRegex.exec(htmlStr);
  if (val)
    val = val[3];
  else
    val = null;
  return val;
}

function findName(htmlStr){
  let imageRegex = new RegExp('<h1 class="productInfo__title fn">(.*)</h1>');
  let res = imageRegex.exec(htmlStr);
  if (res){
    res = res[1];
  }
  return res;
}

function findImages(htmlStr){
  let imageRegex = new RegExp('data-bigimg="([^ <>]*jpe?g)', 'g');
  let imgUrlSet = new Set();
  let res;
  while (res = imageRegex.exec(htmlStr)) {
    imgUrlSet.add("https://donplafon.ru" + res[1]);
  }
  return Array.from(imgUrlSet);
}

function findDimentions(htmlStr){
  let dimentions = {};
  dimentions.height=findPropertyValue("Высота", htmlStr);
  dimentions.width=findPropertyValue("Ширина", htmlStr);
  dimentions.diameter=findPropertyValue("Диаметр", htmlStr);
  dimentions.depth=findPropertyValue("Глубина", htmlStr);
  dimentions.length=findPropertyValue("Длина", htmlStr);
  //remove anything that's not a number from the dimention values
  Object.keys(dimentions).forEach(key=>{
    if (dimentions[key])
      dimentions[key] = strutils.cleanDigit(dimentions[key]);
  });
  return dimentions;
}

module.exports = {findImages, findDimentions, findName};