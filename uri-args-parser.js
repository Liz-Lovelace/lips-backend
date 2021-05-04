function parse(str){
  reg = new RegExp('[?&]([^&]*)=([^&]*)', 'g');
  let pair;
  while (pair = reg.exec(str)){
    console.log(pair);
  }
}

module.exports = {parse};