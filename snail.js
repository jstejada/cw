
function _getCols(rows, n) {
  var cols = [];
  for(var j=0; j<n; j++) {
    cols[j] = [];
    for(var r in rows){
      var row = rows[r];
      cols[j].push(row[j]);
    }
  }
  return cols;
}

function Matrix(rows) {
  this.rows = rows;
  this.n = this.rows.length;
  this.cols = _getCols(rows, this.n);
  this.m = this.cols.length;
}

Matrix.prototype.row = function(idx){
  return this.rows[idx];
};

Matrix.prototype.col = function(idx){
  return this.cols[idx];
};

Matrix.prototype.outerCover = function(p, len){
  p   = typeof p   !== 'undefined' ? p   : {};
  p.r = typeof p.r !== 'undefined' ? p.r : 0;
  p.c = typeof p.c !== 'undefined' ? p.c : 0;
  len = typeof len !== 'undefined' ? len : this.n;

  var topRow    = this.row(p.r).slice(p.c, p.c + len);
  var rightCol  = this.col(p.c+len-1).slice(p.r+1, p.r+1 + len-1);
  var bottomRow = this.row(p.r+len-1).slice(p.c, p.c + len-1);
  var leftCol   = this.col(p.c).slice(p.r+1, p.r+1+len-2);

  bottomRow.reverse();
  leftCol.reverse();

  return topRow.concat(rightCol).concat(bottomRow).concat(leftCol);
};

Matrix.prototype.snail = function(idx){
  if(this.n === 0) { return []; }
  if(this.n === 1) { return this.row(0); }
  var res = [];
  var n   = this.n;
  var til = Math.ceil(n/2);
  for(var i=0; i<til; i++) {
    res = res.concat(this.outerCover({r: i, c: i}, n));
    n  -= 2;
  }
  return res;
};

function snail(mat){
  var m = new Matrix(mat);
  return m.snail();
}

var m = new Matrix([[1,2,3,4], [1,2,3,4], [1,2,3,4], [1,2,3,4]]);
// console.log(m.outerCover());

// console.log(snail([]));
// console.log(snail([[1]]));
// console.log(snail([[1,2], [1,2]]));
// console.log(snail([[1,2,3], [1,2,3], [1,2,3]]));
// console.log(snail([[1,2,3,4], [1,2,3,4], [1,2,3,4], [1,2,3,4]]));
console.log("real     :", snail([[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15],[16,17,18,19,20],[21,22,23,24,25]]));
console.log("expected : [ 1, 2, 3, 4, 5, 10, 15, 20, 25, 24, 23, 22, 21, 16, 11, 6, 7, 8, 9, 14, 19, 18, 17, 12, 13]")

// Test.assertSimilar(snail([]), []);
// Test.assertSimilar(snail([[1]]), [1]);
// Test.assertSimilar(snail([[1,2], [1,2]]), [1,2,2,1]);
// Test.assertSimilar(snail([[1,2,3], [1,2,3], [1,2,3]]), [1,2,3,3,3,2,1,1,2]);
// Test.assertSimilar(snail([[1,2,3,4], [1,2,3,4], [1,2,3,4], [1,2,3,4]]), [1,2,3,4,4,4,4,3,2,1,1,1,2,3,3,2]);

