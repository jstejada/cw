function hasSameDigits(number) {
  const first = number[0];
  for (let ch of number) {
    if (ch !== first) return false;
  }
  return true;
}

function endsWithZeros(number) {
  const zeros = new Array(number.length).join('0');
  return number.indexOf(zeros) === 1;
}

function isIncr(number) {
  let prev = parseInt(number[0], 10);
  for (let idx = 1; idx < number.length; idx++) {
    const cur = parseInt(number[idx], 10);
    if (prev === 9 && cur === 0) continue;
    if (cur !== prev + 1) return false;
    prev = cur;
  }
  return true;
}

function isDecr(number) {
  return isIncr(number.split('').reverse().join(''));
}

function isPalindrome(number) {
  return number === number.split('').reverse().join('');
}

function checkInteresting(number, set) {
  const snumber = number.toString();

  if (set.has(number) ||
      endsWithZeros(snumber) ||
      hasSameDigits(snumber) ||
      isPalindrome(snumber) ||
      isIncr(snumber) ||
      isDecr(snumber)) {
    return true;
  }
  return false;
}

function isInteresting(number, awesomePhrases) {
  if (number < 98) return 0;
  if (number === 98 || number === 99) return 1;
  const set = new Set(awesomePhrases);

  for (let mile = number, idx = 0; mile < number + 3; mile++, idx++) {
    if (checkInteresting(mile, set)) {
      return idx === 0 ? 2 : 1;
    }
  }
  return 0;
}

console.log(isDecr('3210'))
console.log(isIncr('0123'))
console.log(isIncr('901'))
console.log(isIncr('67890'))

// console.log(isInteresting(109, [1337, 256]));
// 98
// 99
// 109
