var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}
var type='easy';
function funny(name){
	type=name;
	console.log(type);
}
var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('get',`https://sugoku.onrender.com/board?difficulty=${type}`);
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}

SolvePuzzle.onclick = () => {
	SudokuSolver(board, 0, 0,9);
};

// function SudokuSolver(board, i, j, n) {
// 	// Write your Code here
// }
function isSafe(board,  row,  col, n) {
	//row
	for(let j=0; j<9; j++) {
		if(board[row][j] == n||board[j][col]==n) {
			return false;
		}
	}

	//grid
	let rn=Math.sqrt(9);
	let sx = row-row%rn;
	let sy = col-col%rn;
	for(let i=sx; i<sx+rn; i++) {
		for(let j=sy; j<sy+rn; j++) {
			if(board[i][j] == n) {
				return false;
			}
		}
	}
	return true;
}
function SudokuSolver(board, row, col,n) {
	if(row == n) {
		//0 se 8 tak h 9 hua to completed 8
		FillBoard(board);
		return true;
	}

	if(col == n) {
		return SudokuSolver(board,row+1,0,n);
	}

	//already placed
	if(board[row][col] != 0) {
		return SudokuSolver(board, row, col+1,n);
	}

	for(let digit=1; digit<=9; digit++) {
		if(isSafe(board, row, col, digit)) {//safe
			board[row][col] = digit;
			if(SudokuSolver(board, row ,col+1,n)) {//sol exists for next
				return true;
			}
			board[row][col] = 0;
		}
	}
	return false;
}
function reset() {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
				arr[i][j].innerText = ''
		}
	}
}
