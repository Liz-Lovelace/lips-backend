function cleanDigit(str){
  str = str.replace(/[^0-9]/g, '');
  return str; 
}

module.exports = {cleanDigit};