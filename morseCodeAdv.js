function reStr(timeUnitLength) {
  return "1(0){" + timeUnitLength + "}1";
}

// SLOW
function getTimeUnitLengthSlow(bits) {
  var timeUnitLength = 1;
  var re = new RegExp(reStr(timeUnitLength));
  while(!re.test(bits)) {
    timeUnitLength++;
    re = new RegExp(reStr(timeUnitLength))
  }
  return timeUnitLength;
}

// WRONG! What if series of 1s is less than series of 0s eg 10001 => EE
function getTimeUnitLengthWrong(bits) {
  var timeUnitLength = bits.length;
  var zeroCount = 0;
  var insideZeroes = false;
  var lastOne;

  for(var i in bits) {
    var bit = bits[i];
    if(bit === '1') {
      lastOne = true;
      if(insideZeroes) {
        insideZeroes = false;
        if(zeroCount < timeUnitLength) {
          timeUnitLength = zeroCount;
        }
      }
    }
    if(bit === '0') {
      if(lastOne) {
        insideZeroes = true;
        zeroCount = 0;
      }
      if(insideZeroes) {
        zeroCount++;
      }
      lastOne = false;
    }
  }
  return timeUnitLength;
}


function getTimeUnitLength(bits) {
  var minZeroCount = bits.length;
  var minOneCount  = bits.length;
  var zeroCount    = bits.length;
  var oneCount     = bits.length;
  var lastOne      = false;
  var lastZero     = false;

  for(var i in bits) {
    var bit = bits[i];
    if(bit === '1') {
      if(lastOne) {
        oneCount++;
      } else {
        lastOne = true;
        oneCount = 1;
        if(zeroCount < minZeroCount) {
          minZeroCount = zeroCount;
        }
      }
      lastZero = false;
    }
    if(bit === '0') {
      if(lastZero) {
        zeroCount++;
      } else {
        lastZero = true;
        zeroCount = 1;
        if(oneCount < minOneCount) {
          minOneCount = oneCount;
        }
      }
      lastOne = false;
    }
  }

  return Math.min(minZeroCount, minOneCount);
}

function nTimesChar(n, ch){
  var res = "";
  for(var i=1; i<=n; i++) {
    res += ch;
  }
  return res;
}

function re(len, ch) {
  return new RegExp(nTimesChar(len, ch), 'g');
}

function decodeBits (bits){
    bits = bits.replace(/^(0+)/, '');
    bits = bits.replace(/(0+)$/, '');

    var tuLen  = getTimeUnitLength(bits);
    var dot    = re(1*tuLen, '1');
    var dash   = re(3*tuLen, '1');
    var pause1 = re(1*tuLen, '0');
    var pause2 = re(3*tuLen, '0');
    var pause3 = re(7*tuLen, '0');


    return bits.replace(dash, '-').replace(dot, '.').replace(pause3, '   ').replace(pause2, ' ').replace(pause1, '');
}

function decodeWord(word) {
  return word.split(' ').reduce(function(prev, ch){
    return prev + MORSE_CODE[ch];
  }, '');
}

function decodeMorse(morseCode){
  morseCode = morseCode.trim();
  return morseCode.split('   ').reduce(function(prev, word){
    var decoded = decodeWord(word);
    if(prev.length === 0){
      return decoded;
    } else {
      return prev + ' ' + decoded;
    }
  }, '');
}

module.exports = {
  decodeMorse: decodeMorse,
  decodeWord: decodeWord,
  decodeBits: decodeBits,
  re: re,
  nTimesChar: nTimesChar,
  getTimeUnitLength: getTimeUnitLength
}
