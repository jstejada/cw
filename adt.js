function zero() {}
function succ(nat) {
  return function() {
    return nat;
  };
}
const one = succ(zero);

function natToInt(nat) {
  if (nat === zero) {
    return 0;
  }
  return 1 + natToInt(nat());
}

function intToNat(int) {
  if (int === 0) {
    return zero;
  }
  return succ(intToNat(int - 1));
}

function add(nat1, nat2) {
  if (nat1 === zero) {
    return nat2;
  }
  if (nat2 === zero) {
    return nat1;
  }
  return add(succ(nat1), nat2());
}

function mul(nat1, nat2) {
  if (nat1 === zero || nat2 === zero) {
    return zero;
  }
  if (nat1 === one) {
    return nat2;
  }
  if (nat2 === one) {
    return nat1;
  }
  return add(nat2, mul(nat1(), nat2));
}

function eq(nat1, nat2) {
  if (nat1 === zero && nat2 === zero) {
    return true;
  }
  if (!nat1()) return false;
  if (!nat2()) return false;
  return eq(nat1(), nat2());
}

function compareTo(nat1, nat2) {
  if (eq(nat1, nat2)) {
    return 0;
  }
  if (nat1 === zero) {
    return -1;
  }
  if (nat2 === zero) {
    return 1;
  }
  const ant = compareTo(nat1(), nat2);
  switch (ant) {
  case 0:
    return 1;
  case 1:
    return 1;
  default:
    return -1;
  }
}

function toString(nat) {
  const fn = (nt, str)=> {
    if (!nt()) {
      return str.replace('$', 'zero');
    }
    return fn(nt(), str.replace('$', 'succ($)'));
  };
  return fn(nat, '$');
}
