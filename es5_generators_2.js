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

var factorialSeq = function() {
  var number = 0;
  var result;
  return function() {
    if (number === 0) {
      result = 1;
    } else {
      result = number * result;
    }
    number++;
    return result;
  };
}.bind(null);

var fibonacciSeq = function() {
  var value1 = 1;
  var value2 = 1;
  return function() {
    var current = value2;
    value2 = value1;
    value1 += current;
    return current;
  };
}.bind(null);

var rangeSeq = function(start, step) {
  var phase = 0;
  return function() {
    return start + step * phase++;
  };
}.bind(null);


var primeSeq = function() {
  function isPrime(num) {
    var result = true;
    if (num !== 2) {
      if (num % 2 === 0) {
        result = false;
      } else {
        for (var x=3; result && x<=Math.sqrt(num); x+=2) {
          if (num % x === 0) {
            result = false;
          }
        }
      }
    }
    return result;
  }

  var number = 1;

  return function() {
    while(!isPrime(number)) {
      number++;
    }
    return number++;
  };
}.bind(null);

var partialSumSeq =function() {
  var index = 0;
  var sum = 0;
  var initArgs = Array.prototype.slice.call(arguments, 0);
  return function() {
    if (index < initArgs.length) {
      sum += initArgs[index];
      index++;
      return sum;
    } else {
      throw 'End of sequence';
    }
  };
}.bind(null);





function pipeSeq(sequencer) {
  var args = Array.prototype.slice.call(arguments, 1);
  var newSeq = sequencer;

  return {
    pipeline: function(pipe) {
      var pipeArgs = Array.prototype.slice.call(arguments, 1);
      var f = newSeq.apply(null, args);
      var p = pipe.apply(null, pipeArgs);

      newSeq = function() {
        return function() {
          return p(f());
        };
      };
      return this;
    },
    invoke: function() {
      return newSeq;
    }
  };
}


function accumulator() {
  var sum = 0;
  return function(value) {
    sum += value;
    return sum;
  };
}

function isEven() {
  return function(val) {
    return {
      status: val % 2 === 0,
      number: val
    };
  };
}

function printEven(prefix) {
  return function(data) {
    if (data.status) {
      return prefix + ' ' + data.number + ' is even.';
    } else {
      return prefix + ' ' + data.number + ' is not even.';
    }
  };
}

// var pipedSeq = pipeSeq(rangeSeq, 2, 3) // 2, 5, 8, 11
//       .pipeline(accumulator) // 2, 7 (5+2), 15(7+8), 26(15+11)
//       .invoke();

var pipedSeq = pipeSeq(factorialSeq)
  .pipeline(accumulator)
  .pipeline(isEven)
  .pipeline(printEven, 'The number')
  .invoke();

var seq = generator(pipedSeq);
console.log(seq.next()); // 2
console.log(seq.next()); // 7
console.log(seq.next()); // 15
console.log(seq.next()); // 26
console.log(seq.next()); // 26
