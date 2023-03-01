/**
Collection of small problems I've completed. The sentimental value is the only reason to keep these, honestly.

*/

const reverseString = (string) => {
  const reversed = [];
  const stringArray = string.split("");
  stringArray.forEach((char) => {
    reversed.unshift(char);
  });
  return reversed.join("");
};

const word = "charlie";
//console.log('reverse charlie:', reverseString(word))

const isPalidrome = (string) => {
  const stringArray = string.split("");
  for (let i = 0; i < string.length; i++) {
    const leftChar = stringArray[i];
    const rightChar = stringArray[stringArray.length - i - 1];
    console.log("left n right", leftChar, rightChar);
    if (leftChar !== rightChar) {
      return false;
    }
  }
  return true;
};

const palidrome = "elitetile";
// console.log("should be true", isPalidrome(palidrome));
// console.log("should be false", isPalidrome(word));
/**
 * given a grid, rotate it either clockwise or counter-clockwise...
 * in the interview I didn't get very far, see first iteration here

 I did have to lookup a trick, which made the problem much much easier. Submitted that solution on leetcode.
 */
const rotateClockwise = (grid) => {
  const N = grid.length;
  const rotated = [];
  for (let i = 0; i < N; i++) {
    rotated.push([]);
  }

  grid.forEach((row) => {
    // for each row, we want to insert into that corresponding column
    row.forEach((element, colIndex) => {
      rotated[colIndex].unshift(element);
    });
  });
  return rotated;
};

const grid = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
];
const grid2 = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
];

[
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
[
  [1, 4, 3],
  [2, 5, 6],
  [7, 8, 9],
];
[
  [1, 4, 7],
  [2, 5, 6],
  [3, 8, 9],
];
[
  [1, 2, 7],
  [4, 5, 6],
  [3, 8, 9],
];
[
  [1, 2, 7],
  [4, 5, 6],
  [3, 8, 9],
];
[
  [1, 2, 7],
  [4, 5, 8],
  [3, 6, 9],
];
[
  [1, 2, 3],
  [4, 5, 8],
  [7, 6, 9],
];
[
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
[
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
// console.log("rotating:", grid);
// console.log(rotateClockwise(grid));

// console.log("rotating:", grid2);
// console.log(rotateClockwise(grid2));
// [6, 3, 0]
// [7, 4, 1]
// [8, 5, 2]
// clockwise rotation
// [2,0],
// [3,1]
// Your last C/C++ code is saved below:
// #include <iostream>
// using namespace std;

// int main() {
// 	cout<<"Hello";
// 	return 0;
// }
