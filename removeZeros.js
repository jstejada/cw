
function pushToEnd(array, el, idx){
  for(var i=idx+1; i<array.length; i++) {
    array[i-1] = array[i];
  }
  array[array.length-1] = el;
}

function removeZeros(array) {
  // Sort "array" so that all elements with the value of zero are moved to the
  // end of the array, while the other elements maintain order.
  // [0, 1, 2, 0, 3] --> [1, 2, 3, 0, 0]
  // Zero elements also maintain order in which they occurred.
  // [0, "0", 1, 2, 3] --> [1, 2, 3, 0, "0"]

  // Do not use any temporary arrays or objects. Additionally, you're not able
  // to use any Array or Object prototype methods such as .shift(), .push(), etc

  var i = 0;
  var l = array.length;
  var x = 0;
  while(i<l && x<l) {
    var el = array[i];
    if (el === 0 || el === "0") {
      pushToEnd(array, el, i);
    } else {
      i++;
    }
    x++;
  }

  // the correctly sorted array should be returned.
  return array;
}


// console.log(removeZeros([1,2,3]));
console.log(removeZeros([0,"0",1,0,"0",2,3]));
console.log(removeZeros([0,"0",0,1,0,2,"0"]));
