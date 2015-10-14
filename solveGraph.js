'use strict';

function dfs(root, target, graph) {
  let stack = [root];
  let marked = new Set([root]);

  while (stack.length !== 0) {
    const node = stack.pop();
    if (node === target) return true;
    graph[node] = graph[node] || []
    graph[node].forEach((adj)=> {
      if (!marked.has(adj)) stack.push(adj);
    });
  }
  return false;
}

function processArcs(arcs) {
  let graph = {}
  arcs.forEach((arc)=> {
    if (graph[arc]) {
      graph[arc.start].push(arc.end)
    } else {
      graph[arc.start] = [arc.end]
    }
  });
  return graph
}

function solve_graph(start, end, arcs) {
  const graph = processArcs(arcs);
  return dfs(start, end, graph);
}


const arcs = [
  { start: "a", end: "b" },
]
console.log(solve_graph('a', 'b', arcs))
console.log(solve_graph('a', 'c', arcs))
