function Cons(head,tail){
  this.head = head;
  this.tail = tail;
}

function toArray(list) {
  if(list){
    var more = list.tail;
    return [list.head].concat(more? toArray(more) : []);
  }
  return [];
}
Cons.prototype.toArray = function(){ return toArray(this); };

function forEach(list, iteratee) {
  iteratee(list)
  var tail = list.tail;
  while (tail) {
    iteratee(tail);
    tail = tail.tail;
  }
}
Cons.prototype.forEach = function(iteratee){ return forEach(this,iteratee); };

function append(list, value) {
  if (!list) return;
  var tail = list;
  while (true) {
    if (!tail.tail) break;
    tail = tail.tail;
  }
  tail.tail = new Cons(value, null);
}
Cons.prototype.append = function(value){ return append(this,value); };


Cons.fromArray = function(array){
  if (array.length === 0) {
    return new Cons(null, null);
  }
  if (array.length === 1) {
    return new Cons(array[0], null);
  }
  return new Cons(array[0], Cons.fromArray(array.slice(1)));
};

function filter(list, predicate){
  var filtered;
  list.forEach(function(listItem){
    if (predicate(listItem.head)) {
      if (!filtered) {
        filtered = new Cons(listItem.head, null);
      } else {
        filtered.append(listItem.head);
      }
    }
  });
  return filtered || new Cons(null, null);
}

function map(list, mapper){
  var mapped;
  list.forEach(function(listItem){
    if (!mapped) {
      mapped = new Cons(mapper(listItem.head), null);
    } else {
      mapped.append(mapper(listItem.head));
    }
  });
  return mapped || new Cons(null, null);
}

Cons.prototype.filter = function(predicate){ return filter(this,predicate); };
Cons.prototype.map = function(mapper){ return map(this, mapper); };

var numbers  = Cons.fromArray([1,2,3,4,5]);
console.log(numbers.filter(function(n){ return n % 2 === 0; }).toArray());
console.log(numbers.map(function(n){ return n * n;  }).toArray());
