// this function finds images in an html string from donplafon.ru
function findImages(htmlStr){
  let imageRegex = new RegExp('data-bigimg="([^ <>]*jpeg)', 'g');
  let imgUrlSet = new Set();
  let res;
  while (res = imageRegex.exec(htmlStr)) {
    imgUrlSet.add("donplafon.ru" + res[1]);
  }
  return Array.from(imgUrlSet);
}

module.exports = {findImages};