
function makeRe(markers) {
  const re = markers.reduce((mem, marker)=> {
    return `${mem}\\${marker}.*$|`;
  }, '');
  return new RegExp(re.slice(0, re.length - 1), 'g');
}


function solution(input, markers) {
  const lines = input.split("\n");
  const re = makeRe(markers);
  return lines.map((line)=> {
    const res = `${line.replace(re, '')}`.trim();
    return res;
  }).join("\n");
}


console.log(solution("apples, pears # and bananas\ngrapes\nbananas !apples", ["#", "!"]))
