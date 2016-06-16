// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Ya Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
<<<<<<< HEAD
      
      if (this.attributes[rowIndex].indexOf(1) !== this.attributes[rowIndex].lastIndexOf(1)) {
        return true;
      }
      return false;
=======
      var conflict = 0;
      var row = this.get(rowIndex);

      for (var i = 0; i < row.length; i++) {
        if (row[i]) {
          conflict++;
        }
      }

      return (conflict > 1); // fixme
>>>>>>> e6808171652ccb63410820ffa56f9c51ae337634
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
<<<<<<< HEAD
     

      var length = board.attributes.n;
      for (var i = 0; i < length; i++) {
         if (this.hasRowConflictAt(i)===true){
          return true;
         }
      }


return false;
    },
=======
      // for (var i = 0; i < this.rows().length; i++) {
      //   if (this.hasRowConflictAt(i)) {
      //     return true;
      //   }
      // }

      for (var i = 0; i < this.rows().length; i++) {
        if (this.hasRowConflictAt(i)) return true;
      }
>>>>>>> e6808171652ccb63410820ffa56f9c51ae337634

      return false;
    },


    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAbove: function(colIndex, currentRow) {
      var conflict = 0;

      // console.log(currentRow);

      for (var row = 0; row < currentRow + 1; row++) {
        if (this.get(row)[colIndex]) {
          conflict++;
        }
      }

      return (conflict > 1); // fixme
    },

    hasColConflictAt: function(colIndex) {
<<<<<<< HEAD
      var columnfied = [];

 var length = this.attributes.n;
      for (var i = 0; i < length; i++) {
         columnfied.push(this.attributes[i][colIndex])
         }


 if (columnfied.indexOf(1)===columnfied.lastIndexOf(1)){
  return false;
 }
 return true;

=======
      var numberOfRows = this.get('n');
      var conflict = 0;

      for (var i = 0; i < numberOfRows; i++) {
        if (this.get(i)[colIndex]) {
          conflict++;
        }
      }

      return (conflict > 1); // fixme
>>>>>>> e6808171652ccb63410820ffa56f9c51ae337634
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
<<<<<<< HEAD

      var length = this.attributes.n;
      for (var i = 0; i < length; i++) {
         if (this.hasColConflictAt(i)===true){
          return true;
         }
      }


return false;
=======
      var boardLength = this.rows().length;

      for (var i = 0; i < boardLength; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }

      return false; // fixme
>>>>>>> e6808171652ccb63410820ffa56f9c51ae337634
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
<<<<<<< HEAD
      var final=false;
      var start = majorDiagonalColumnIndexAtFirstRow;
      var columnfied = [];
      var columnfied2=[];
      var length = this.attributes.n;
      for (var i = 0; i < length ; i++) {
        columnfied.push(this.attributes[i][start+i]);
         }

    if (columnfied.indexOf(1)===-1 && columnfied2.indexOf(1)===-1){
      return false;
    }

if (columnfied.indexOf(1)!==columnfied.lastIndexOf(1)){
  return true;
}


for (var i = 0; i < length ; i++) {
  if (this.attributes[start+i]!==undefined){
      columnfied2.push(this.attributes[start+i][i]);
  }
}


if (columnfied2.indexOf(1)!==columnfied2.lastIndexOf(1)){
  return true;
}

console.log(columnfied,columnfied2)


   return final;
=======
      var numberOfRows = this.rows().length;
      var columnOffset = majorDiagonalColumnIndexAtFirstRow;
      var conflicts = 0;
      // console.log(numberOfRows);
      for (var i = 0; i < numberOfRows; i++) {
        var x = i;
        var y = i + columnOffset;

        //need to check whether the row exists:
        //if (!this.get(x)) continue;

        // console.log('offset:', majorDiagonalColumnIndexAtFirstRow, "coordinates:",[x,y],"piece?", this.get(x)[y]);
        if (this.get(x)[y]) {
          conflicts++;
        }
      }

      return (conflicts > 1); // fixme
>>>>>>> e6808171652ccb63410820ffa56f9c51ae337634
    },


    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
<<<<<<< HEAD

      var length = this.attributes.n;
      for (var i = 0; i < length; i++) {
         if (this.hasMajorDiagonalConflictAt(i)===true){
          return true;
         }
      }


return false;
=======
      // console.log("----- NEW TEST -----");
      var numberOfRows = this.rows().length;
      var maxColumnOffset = -numberOfRows + 1;
      for (var i = maxColumnOffset; i < numberOfRows - maxColumnOffset; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
>>>>>>> e6808171652ccb63410820ffa56f9c51ae337634
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var numberOfRows = this.get('n');
      var columnOffset = minorDiagonalColumnIndexAtFirstRow;
      var conflicts = 0;

      for (var i = 0; i < numberOfRows; i++) {
        var x = i;
        var y = columnOffset - i;
        // console.log('offset:', minorDiagonalColumnIndexAtFirstRow, "coordinates:",[x,y],"piece?", this.get(x)[y]);
        if (this.get(x)[y]) {
          conflicts++;
        }
      }

      return conflicts > 1; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // console.log("----- NEW TEST -----");
      var numberOfRows = this.get('n');
      var maxColumnOffset = numberOfRows - 1;
      for (var i = 0; i < numberOfRows + maxColumnOffset; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    //Our optimized solution functions


    hasDiagonalConflictAt: function(row, column) {

      var majorDiagonalColumnIndex = this._getFirstRowColumnIndexForMajorDiagonalOn(row, column);

      var minorDiagonalColumnIndex = this._getFirstRowColumnIndexForMinorDiagonalOn(row, column);

      return (this.hasMajorDiagonalConflictAt(majorDiagonalColumnIndex) || 
        this.hasMinorDiagonalConflictAt(minorDiagonalColumnIndex));
    },

    hasAnyConflictsRook: function(column, currentRow) {
      return this.hasColConflictAbove(column, currentRow);
        // || this.hasAnyRowConflicts());
    }, 

    hasAnyConflictsQueen: function(column, currentRow) {
      return (this.hasColConflictAbove(column, currentRow) || 
        // Removing this test because our algorithm doesn't need it (optimization)
        // this.hasAnyRowConflicts() ||
        // this.hasAnyMinorDiagonalConflicts() ||
        // this.hasAnyMajorDiagonalConflicts());
        this.hasDiagonalConflictAt(currentRow, column));
    }



    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
