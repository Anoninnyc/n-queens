/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

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
  return outcomes.length;
};


//New function that finds all possible board outcomes and saves them

window.findAllSolutions = function(n, board, outcomes, currentRow, counter) {

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
    if (!board.hasAnyConflictsQueen(i) && n !== currentRow + 1) {
      outcomes = findAllSolutions(n, board, outcomes, currentRow + 1, counter);
    } else if (!board.hasAnyConflictsQueen(i) && currentRow + 1 === n) {
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
    outcomes = findAllSolutions(n, board, outcomes, currentRow + 1, counter);
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
    if (!board.hasAnyConflictsQueen(i) && n !== currentRow + 1) {
      outcomes = findOneSolutionQueen(n, board, outcomes, currentRow + 1, counter);
      if (outcomes[0] !== undefined) { return outcomes; }
    } else if (!board.hasAnyConflictsQueen(i) && currentRow + 1 === n) {
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










