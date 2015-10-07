function generator(sequencer) {
  var args = Array.prototype.slice.call(arguments, 1)
  var f = sequencer.apply(null, args)
  return {
    next: f
  };
}

function dummySeq() {
  return function() {
    return "dummy";
  };
}

function factorialSeq() {
  var cur = 1;
  var n = 0;
  return function() {
    cur = n === 0 ? 1 : n * cur;
    n += 1;
    return cur;
  };
}

function fibonacciSeq() {
  var cur = 0;
  var prev = 0;
  var n = 0;
  return function() {
    var tmp = cur;
    cur = n === 0 || n === 1? 1 : cur + prev;
    prev = tmp;
    n += 1;
    return cur;
  };
}

function rangeSeq(start, step) {
  var cur = start;
  return function() {
    var tmp = cur;
    cur += step;
    return tmp;
  }
}

function primeSeq() {
  var n = 0;
  var primes = [2];
  return function() {
    if (primes[n])
      return primes[n++];

    checkP: for(var i=primes[n-1]+1;;i++){
      for(var k in primes) {
        var p = primes[k];
        if(i % p === 0)
          continue checkP;
      }
      primes.push(i);
      n++;
      return i;
    }
  }
}

function partialSumSeq() {
  var args = arguments;
  var i = 0;
  var sum = args[0];

  return function() {
    if (i === 0)
      return args[i++];
    if (i < args.length) {
      sum += args[i++]
      return sum;
    } else {
      throw new Error();
    }
  }
}

var seq = generator(partialSumSeq, -1, 4, 2, 5);
// seq.next()
// seq.next()
console.log(seq.next());
console.log(seq.next());
console.log(seq.next());
console.log(seq.next());
// console.log(seq.next());
// console.log(seq.next());
// console.log(seq.next());
// console.log(seq.next());
// console.log(seq.next());
