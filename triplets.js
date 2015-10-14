
// a -> b means b goes BEFORE a
function constructGraph(triplets) {
  let graph = new Map();
  for (const triplet of triplets) {
    triplet.forEach((ch, idx)=> {
      const goBefore = triplet.slice(0, idx);
      const chs = graph.has(ch) ? [...graph.get(ch), ...goBefore] : goBefore;
      graph.set(ch, new Set(chs));
    });
  }
  return graph;
}

function removeSink(graph) {
  let sink = null;
  for(const [ch, goBefore] of graph.entries()) {
    if (goBefore.size == 0) {
      sink = ch;
      break;
    }
  }

  if (sink) {
    graph.forEach((set)=> set.delete(sink));
    graph.delete(sink);
  }
  return sink;
}

function recoverSecret(triplets) {
  const graph = constructGraph(triplets);
  let recovered = '';
  while (graph.size > 0) recovered += removeSink(graph);
  return recovered;
}

const triplets1 = [
  ['t','u','p'],
  ['w','h','i'],
  ['t','s','u'],
  ['a','t','s'],
  ['h','a','p'],
  ['t','i','s'],
  ['w','h','s']
]
console.log(recoverSecret(triplets1));
