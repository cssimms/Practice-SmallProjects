/* given a grid that contains X, O, and Y, find the shortest distance between any X and any Y
 really a BFS search that should go in the four cardinal directions, keeping track of min distance as we continue the run the BFS on each 'X' we find (or 'Y', but not both)

 solution below works pretty well, but needs to be cleaned up to be more readable.
*/

// input
const path1 = [
  ["X", 0, 0],
  [0, 0, "Y"],
  [0, 0, "Y"],
];
// output 3

const path2 = [
  ["Y", "X", 0],
  [0, 0, 0],
  [0, 0, "Y"],
];

const minDistance = (grid) => {
  // iterate through the grid until we find an X
  // then start the depth-first search

  // once Y is found, we'll store that distance and continue to iterate
  let foundDistances = [];

  // assuming grid is a square
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      const currentElement = grid[i][j];
      if (currentElement === "X") {
        // start BFS
        // TODO we're going to assume we found an X, but we'll need to account for Y later
        // actually if we search forward and backward, we don't care if we found a Y or X.

        //insantiate with the first element
        let elementQueue = [[i, j]];
        let seen = { ij: true };
        console.log("STARTING BFS:", elementQueue);
        // continue looping until the working queue is empty
        while (elementQueue.length > 0) {
          console.log("working q", elementQueue);
          // take element off front of queue, check that we haven't seen it already
          const bfsCoord = elementQueue.shift();
          const bfsElement = grid[bfsCoord[0]][bfsCoord[1]];
          console.log("working coord", bfsCoord, bfsElement);
          if (seen[bfsCoord]) {
            continue;
          }

          // add the four 'children' of element to the queue
          const nextI = bfsCoord[0] + 1;
          const nextJ = bfsCoord[1] + 1;
          const prevI = bfsCoord[0] - 1;
          const prevJ = bfsCoord[1] - 1;
          if (nextI < grid.length) {
            elementQueue.push([nextI, bfsCoord[1]]);
          }
          if (nextJ < grid.length) {
            elementQueue.push([bfsCoord[0], nextJ]);
          }
          if (prevI >= 0) {
            elementQueue.push([prevI, bfsCoord[1]]);
          }
          if (prevJ >= 0) {
            elementQueue.push([bfsCoord[0], prevJ]);
          }

          // check if Y, if it is, store current distance
          if (bfsElement === "Y") {
            const currentDistance = calcDistance([i, j], bfsCoord);
            console.log("coords from X to Y", [i, j], bfsCoord);
            console.log("with dist:", currentDistance);
            foundDistances.push(currentDistance);
          }
          // if it isn't Y, mark as seen and continue to next element in queue
          seen[bfsCoord] = true;
        }
      }
    }
  }

  console.log("distances found...", foundDistances);
  return Math.min(...foundDistances);
};

const calcDistance = (coordA, coordB) => {
  const Xdiff = Math.abs(coordA[0] - coordB[0]);
  const Ydiff = Math.abs(coordA[1] - coordB[1]);
  console.log(Xdiff, Ydiff);
  return Xdiff + Ydiff;
};

console.log("dist for path1", minDistance(path1));
console.log("dist for path2", minDistance(path2));
