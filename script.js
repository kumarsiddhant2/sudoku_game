const size = 9;
const board = document.getElementById("sudoku-board");

function createBoard() {
    for (let i = 0; i < size; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < size; j++) {
            const cell = document.createElement("td");
            const input = document.createElement("input");
            input.type = "text";
            input.maxLength = "1";
            input.oninput = (e) => validateInput(e, i, j);
            cell.appendChild(input);
            row.appendChild(cell);
        }
        board.appendChild(row);
    }
}

function validateInput(e, row, col) {
    const value = e.target.value;
    if (!/^[1-9]$/.test(value) && value !== "") {
        e.target.value = "";
        alert("Enter numbers between 1 and 9 only.");
    }
}

function getBoardValues() {
    const values = [];
    const rows = board.getElementsByTagName("tr");
    for (let i = 0; i < size; i++) {
        const row = rows[i].getElementsByTagName("td");
        values[i] = [];
        for (let j = 0; j < size; j++) {
            const input = row[j].getElementsByTagName("input")[0];
            values[i][j] = input.value ? parseInt(input.value) : 0;
        }
    }
    return values;
}

function setBoardValues(values) {
    const rows = board.getElementsByTagName("tr");
    for (let i = 0; i < size; i++) {
        const row = rows[i].getElementsByTagName("td");
        for (let j = 0; j < size; j++) {
            const input = row[j].getElementsByTagName("input")[0];
            input.value = values[i][j] !== 0 ? values[i][j] : "";
        }
    }
}

function isSafe(board, row, col, num) {
    for (let x = 0; x < size; x++) {
        if (board[row][x] === num || board[x][col] === num || 
            board[3 * Math.floor(row / 3) + Math.floor(x / 3)][3 * Math.floor(col / 3) + (x % 3)] === num) {
            return false;
        }
    }
    return true;
}

function solveSudokuUtil(board) {
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= size; num++) {
                    if (isSafe(board, row, col, num)) {
                        board[row][col] = num;
                        if (solveSudokuUtil(board)) {
                            return true;
                        }
                        board[row][col] = 0; // backtrack
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function solveSudoku() {
    const boardValues = getBoardValues();
    if (solveSudokuUtil(boardValues)) {
        setBoardValues(boardValues);
    } else {
        alert("No solution exists for this Sudoku.");
    }
}

function resetBoard() {
    const inputs = document.querySelectorAll("td input");
    inputs.forEach(input => input.value = "");
}

createBoard();
