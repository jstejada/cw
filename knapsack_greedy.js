'use strict';
function knapsack(capacity, items) {
  let res = Array.apply(null, Array(items.length)).map(Number.prototype.valueOf,0);
  let sorted = items.map((item, i) => (
    {
      rat: item[1]/item[0],
      size: item[0],
      i
    }
  )).sort((i1, i2)=>
    i2.rat-i1.rat
  );
  for(let obj of sorted) {
    let {size, i} = obj;
    while(capacity - size >= 0) {
      res[i] += 1
      capacity -= size;
    }
  }
  return res;
}

console.log(knapsack(100, [[10, 10], [30, 40], [56, 78]]))
