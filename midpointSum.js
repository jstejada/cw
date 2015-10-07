function midpointSum(arr){
  var rightSum = arr.reduce(function(acum, el){return acum+el;},0);
  rightSum -= arr[0]
  var leftSum = 0;

  for(var i=1; i<arr.length; i++) {
    leftSum += arr[i-1];
    rightSum -= arr[i];
    if(rightSum == leftSum && i != arr.length -1) {
      return i;
    }
  }
  return null;
}
