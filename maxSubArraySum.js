
// RECURSIVE:

// function maxSubWithLast(arr) {
//   var max = 0;
//   var sum = 0;
//   for(var i=arr.length-1; i>=0; i--) {
//     var v = arr[i];
//     sum += v;
//     if(sum > max) {
//       max = sum;
//     }
//   }
//   return max;
// }

// function maxSequence(arr) {
//   if(arr.length === 0) {return 0;}
//   if(arr.length === 1) {
//     return Math.max(0, arr[0]);
//   }

//   var prev = maxSequence(arr.slice(0, arr.length-1));
//   var res = Math.max(prev, maxSubWithLast(arr));
//   console.log("max is "+res+" for:", arr);

//   return res;
// }



// WRONG! missing out on some subsequences
// function maxSubsequence(arr) {
//   if(arr.length === 0) {return [0, true];}
//   if(arr.length === 1) {
//     return [Math.max(0, arr[0]), true];
//   }

//   var newEl = arr[arr.length-1];
//   var prev = maxSubsequence(arr.slice(0,arr.length-1));
//   var prevVal = prev[0];
//   var maxSubEndsAtLast = prev[1];
//   var max;

//   if(maxSubEndsAtLast){
//     max = Math.max(prevVal, prevVal + newEl, newEl, sum(arr));
//   } else {
//     max = Math.max(prevVal, newEl, sum(arr));
//   }
//   console.log("max is "+max+" for:", arr);
//   if(max == prevVal){
//     return [max, false];
//   } else {
//     return [max, true];
//   }

// }
// function sum(arr){
//   return arr.reduce(function(prev, cur){
//     return prev + cur;
//   }, 0);
// }


// DP:

function maxSequence(arr) {

  var f = [0, Math.max(0, arr[0])];
  var mxSumLast = [0, f[1]];

  for(var l=1; l<=arr.length; l++) {
    mxSumLast[l] = Math.max(mxSumLast[l-1] + arr[l-1], arr[l-1]);
    f[l] = Math.max(f[l-1], mxSumLast[l]);
  }
  return f[arr.length];
}

// Improved
function maxSubSeqSumImproved(arr) {
  var mxSubSeqSum = 0;
  var mxSumWithLast = 0;

  for(var i=0; i<arr.length; i++) {
    mxSumWithLast = Math.max(mxSumWithLast + arr[i], arr[i]);
    mxSubSeqSum = Math.max(mxSubSeqSum, mxSumWithLast);
  }
  return mxSubSeqSum;
}

// Returns the actual subsequence
function maxSubSeq(arr) {
  var mxSubSeq = {sum: 0, s: 0, l: 0};
  var mxSumLast = {sum: 0, s: 0, l:0};

  for(var i=0; i<arr.length; i++) {
    if(mxSumLast.sum + arr[i] > arr[i]) {
      mxSumLast.sum += arr[i];
      mxSumLast.l = i+1;
    } else {
      mxSumLast.sum = arr[i];
      mxSumLast.s = i;
      mxSumLast.l = i+1;
    }

    if(mxSumLast.sum > mxSubSeq.sum) {
      mxSubSeq = {sum: mxSumLast.sum, s: mxSumLast.s, l: mxSumLast.l};
    }
  }

  console.log(mxSubSeq.sum);
  return arr.slice(mxSubSeq.s, mxSubSeq.l);
}



console.log(maxSubSeq([2, -8, 3, -2, 4, -10]));
// console.log(maxSubSeq([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
// console.log(maxSequence([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
