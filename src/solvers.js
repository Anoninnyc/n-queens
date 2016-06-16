/*

var board = [
  [0, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 0]
];
//Function to replace overbearing diagonal checker.....

var test = function(n, t, l, board) {
// 'n' is conventional 'n','t' is row index FROM the top (i.e. currColumn),'l' us column index from the left (i.e. 'i' in a for loop), board is array or arrays

//lets insert a piece 
  board[t][l] = 1;
  
  //lets find the upper-leftmost square on the board it can attack;
  var topLeft = t;
  var leftLeft = l;
  while (topLeft > 0 && leftLeft > 0 && leftLeft < n - 1) {
    topLeft--;
    leftLeft--;
  }

  //lets find the upper-rightmost square on the board it can attack;
  var topRight = t;
  var leftRight = l;
  while (topRight > 0 && leftRight > 0 && leftRight < n - 1) {
    topRight--;
    leftRight++;
  }

  
  
  
  
  //going diagonally down from the upper=leftmost square it can attack, let's SEE if there's more than one 1. If so, increment counter by 1.
  leftCount = 0;
  for (var i = 0; i < n; i++) {

    if (board[topLeft + i][leftLeft + i] === 1) {
      leftCount++;
    }
  }
  //going diagonally down from the upper=right-most square it can attack, let's SEE if there's more than one 1. If so, increment counter by 1.
  rightCount = 0;

  for (var i = 0; i < n; i++) {
    if (board[topRight + i][leftRight - i] === 1) {
      rightCount++;
    }
  }
//any more than 2 occurrences between both? return true=- there is conflict
  if (rightCount + leftCount > 2) {
    return true;
  }
//otherwise return true///
  return false;
};


        _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/



// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



/*

TO DO: 
LAST NON-bitwise operator!!!!!!!!!!!!!
Do the same thing for ini=dividual queens diagonal, as wee did for individual queens columns. 

IE we only need ot check the squares the current queen has access to diagonally, instead of the entire board;







*/




window.findNRooksSolution = function(n) {
  var outcomes = findOneSolutionRook(n);
  var solutionObject = outcomes[0];

  if (!solutionObject) {
    solutionObject = new Board({'n': n});
  }

  var array = [];

  for (var i = 0; i < n; i++) {
    array.push(solutionObject[i]);
  }

  return array;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // var outcomes = findAllSolutionsRook(n);
  // return outcomes.length;
  return factorialFunction(n);
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  // var outcomes = findAllSolutions(n);
  // var solutionObject = outcomes[0];
  var outcomes = findOneSolutionQueen(n);
  var solutionObject = outcomes[0];

  if (!solutionObject) {
    solutionObject = new Board({'n': n});
  }

  var array = [];

  for (var i = 0; i < n; i++) {
    array.push(solutionObject[i]);
  }

  return array;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var outcomes = findAllSolutions(n);
  // return outcomes.length;
  return outcomes;
};


//New function that finds all possible board outcomes and saves them

window.findAllSolutions = function(n, board, outcomes, currentRow, counter) {

  //Initialize outcomes array
  if (outcomes === undefined) {
    outcomes = 0;
  }

  //If there is no board passed in, initialize an empty n x n board
  if (board === undefined) {
    board = new Board({'n': n});
  } 

  //Default to row 0
  if (currentRow === undefined) {
    currentRow = 0;
  }

  //Initialize counter
  if (counter === undefined) {
    counter = 0;
  }

  // var skippedFlag = false; 

  //Iterate through all the column indices, while on the current row
  for (var i = 0; i < n; i++) {
    //Toggle on
    counter++;
    board.togglePiece(currentRow, i);
    if (!board.hasAnyConflictsQueen(i, currentRow) && n !== currentRow + 1) {
      outcomes = findAllSolutions(n, board, outcomes, currentRow + 1, counter);
    } else if (!board.hasAnyConflictsQueen(i, currentRow) && currentRow + 1 === n) {
      if (counter === n) {
        // var boardCopy = JSON.parse(JSON.stringify(board));
        // outcomes.push(boardCopy);
        outcomes++;
      }
    }
    //Toggle off
    counter--;
    board.togglePiece(currentRow, i);
    //Move onto the next column index in the current row
  }

  //Skipped flag in case we want to get all possible solutions (not just with n pieces)
  // if (!skippedFlag && n !== currentRow + 1 && board[0] !== undefined) {
  //   skippedFlag = true;
  //   outcomes = findAllSolutions(n, board, outcomes, currentRow + 1, counter);
  // }

  //console.log('flag status:', skippedFlag, 'outcomes:', outcomes,'row:',currentRow,'board:',board);
 
  //If at the end of the row, after iterating through all columns
  //Return out of function to the previous function invocation

  //If statement to return entire board goes here
  if (counter === n) {
    // outcomes.push(JSON.parse(JSON.stringify(board)));
    outcomes++;
  }
  return outcomes;
};

window.findNumberOfHighest = function(n, outcomes) {
  var count = 0;
  for (var i = 0; i < outcomes.length; i++) {
    if (n === outcomes[i][0]) {
      count++;
    }
  }
  return count;
};


//Copy of function for rook:

window.findAllSolutionsRook = function(n, board, outcomes, currentRow, counter) {

  //Initialize outcomes array
  if (outcomes === undefined) {
    outcomes = [];
  }

  //If there is no board passed in, initialize an empty n x n board
  if (board === undefined) {
    board = new Board({'n': n});
  } 

  //Default to row 0
  if (currentRow === undefined) {
    currentRow = 0;
  }

  //Initialize counter
  if (counter === undefined) {
    counter = 0;
  }

  var skippedFlag = false; 

  //Iterate through all the column indices, while on the current row
  for (var i = 0; i < n; i++) {
    //Toggle on
    counter++;
    board.togglePiece(currentRow, i);
    if (!board.hasColConflictAt(i) && n !== currentRow + 1) {
      outcomes = findAllSolutionsRook(n, board, outcomes, currentRow + 1, counter);
    } else if (!board.hasColConflictAt(i) && currentRow + 1 === n) {
      if (counter === n) {
        var boardCopy = JSON.parse(JSON.stringify(board));
        outcomes.push(boardCopy);
      }
    }
    //Toggle off
    counter--;
    board.togglePiece(currentRow, i);
    //Move onto the next column index in the current row
  }

  if (!skippedFlag && n !== currentRow + 1 && board[0] !== undefined) {
    skippedFlag = true;
    outcomes = findAllSolutionsRook(n, board, outcomes, currentRow + 1, counter);
  }

 // console.log('flag status:', skippedFlag, 'outcomes:', outcomes,'row:',currentRow,'board:',board);
 
  //If at the end of the row, after iterating through all columns
  //Return out of function to the previous function invocation

  //If statement to return entire board goes here
  if (counter === n) {
    outcomes.push(JSON.parse(JSON.stringify(board)));
  }
  return outcomes;
};






// To find one solution in constant time (copied from findAllSolutions)
window.findOneSolutionQueen = function(n, board, outcomes, currentRow, counter) {

 

  //Initialize outcomes array
  if (outcomes === undefined) {
    outcomes = [];
  }


  if (outcomes[0] !== undefined) { return outcomes; }

  //If there is no board passed in, initialize an empty n x n board
  if (board === undefined) {
    board = new Board({'n': n});
  } 

  //Default to row 0
  if (currentRow === undefined) {
    currentRow = 0;
  }

  //Initialize counter
  if (counter === undefined) {
    counter = 0;
  }

  var skippedFlag = false; 

  //Iterate through all the column indices, while on the current row
  for (var i = 0; i < n; i++) {
    //Toggle on
    counter++;
    board.togglePiece(currentRow, i);
    if (!board.hasAnyConflictsQueen(i, currentRow) && n !== currentRow + 1) {
      outcomes = findOneSolutionQueen(n, board, outcomes, currentRow + 1, counter);
      if (outcomes[0] !== undefined) { return outcomes; }
    } else if (!board.hasAnyConflictsQueen(i, currentRow) && currentRow + 1 === n) {
      if (counter === n) {
        var boardCopy = JSON.parse(JSON.stringify(board));
        outcomes.push(boardCopy);
        if (outcomes[0] !== undefined) { return outcomes; }
      }
    }

    //If outcomes has any values return the ONE solution

    //Toggle off
    counter--;
    board.togglePiece(currentRow, i);
    //Move onto the next column index in the current row
  }

  if (!skippedFlag && n !== currentRow + 1 && board[0] !== undefined) {
    skippedFlag = true;
    outcomes = findOneSolutionQueen(n, board, outcomes, currentRow + 1, counter);
    if (outcomes[0] !== undefined) { return outcomes; }
  }

 // console.log('flag status:', skippedFlag, 'outcomes:', outcomes,'row:',currentRow,'board:',board);
 
  //If at the end of the row, after iterating through all columns
  //Return out of function to the previous function invocation

  //If statement to return entire board goes here
  if (counter === n) {
    outcomes.push(JSON.parse(JSON.stringify(board)));
  }
  if (outcomes[0] !== undefined) { return outcomes[0]; }
  return outcomes;
};

window.findOneSolutionRook = function(n, board, outcomes, currentRow, counter) {

 

  //Initialize outcomes array
  if (outcomes === undefined) {
    outcomes = [];
  }


  if (outcomes[0] !== undefined) { return outcomes; }

  //If there is no board passed in, initialize an empty n x n board
  if (board === undefined) {
    board = new Board({'n': n});
  } 

  //Default to row 0
  if (currentRow === undefined) {
    currentRow = 0;
  }

  //Initialize counter
  if (counter === undefined) {
    counter = 0;
  }

  var skippedFlag = false; 

  //Iterate through all the column indices, while on the current row
  for (var i = 0; i < n; i++) {
    //Toggle on
    counter++;
    board.togglePiece(currentRow, i);
    if (!board.hasColConflictAt(i) && n !== currentRow + 1) {
      outcomes = findOneSolutionRook(n, board, outcomes, currentRow + 1, counter);
      if (outcomes[0] !== undefined) { return outcomes; }
    } else if (!board.hasColConflictAt(i) && currentRow + 1 === n) {
      if (counter === n) {
        var boardCopy = JSON.parse(JSON.stringify(board));
        outcomes.push(boardCopy);
        if (outcomes[0] !== undefined) { return outcomes; }
      }
    }

    //If outcomes has any values return the ONE solution

    //Toggle off
    counter--;
    board.togglePiece(currentRow, i);
    //Move onto the next column index in the current row
  }

  if (!skippedFlag && n !== currentRow + 1 && board[0] !== undefined) {
    skippedFlag = true;
    outcomes = findOneSolutionRook(n, board, outcomes, currentRow + 1, counter);
    if (outcomes[0] !== undefined) { return outcomes; }
  }

 // console.log('flag status:', skippedFlag, 'outcomes:', outcomes,'row:',currentRow,'board:',board);
 
  //If at the end of the row, after iterating through all columns
  //Return out of function to the previous function invocation

  //If statement to return entire board goes here
  if (counter === n) {
    outcomes.push(JSON.parse(JSON.stringify(board)));
  }
  if (outcomes[0] !== undefined) { return outcomes; }
  return outcomes;
};

var factorialFunction = function(n) {
  var result = 1;
  for (var i = 1; i < n + 1; i++) {
    result *= i;
  }
  return result;
};










