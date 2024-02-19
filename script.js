function createPlayer(name, token) {
    return {name, token};
}

const playerOne = createPlayer("Foo", "O");
const playerTwo = createPlayer("Bar", "X");

const gameboard = (() => {
    const board = [];

    function resetBoard() {
        for (let i = 0; i < 3; i++) {
            board[i] = [];
            for (let j = 0; j < 3; j++) {
                board[i].push(null);
            }
        }
    }

    // Returns false if illegal move, true if legal
    function addToken(row, column, token) {
        if (!(board[row][column] === null)) return false;
        board[row][column] = token;
        return true;
    }

    function printBoard() {
        console.log(board.map(row => {
            return row.map(cell => {
                if (cell === null) return "";
                return cell;
            })
        }));
    }

    function isWinningState() {
        // Check rows and columns for 3 in a row
        for (let i = 0; i < 3; i++) {
            if (board[i][0] === board[i][1] && board[i][0] === board[i][2] && board[i][0] !== null) {
                return true;
            };
            if (board[0][i] === board[1][i] && board[0][i] === board[2][i] && board[0][i] !== null) {
                return true;
            };
        }
        // Check diagonals for 3 in a row
        if (board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] !== null) return true;
        if (board[0][2] === board[1][1] && board[0][2] === board[2][0] && board[0][2] !== null) return true;
        return false;
    }

    function isFull() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === null) return false;
            }
        }
        return true;
    }

    return {resetBoard, addToken, printBoard, isWinningState, isFull};
})();

const game = ((playerOne, playerTwo) => {
    let activePlayer = playerOne;

    function switchActivePlayer() {
        if (activePlayer === playerOne) {
            activePlayer = playerTwo;
        } else {
            activePlayer = playerOne;
        };
    };

    function printNewRound() {
        gameboard.printBoard();
        console.log(`${activePlayer.name}'s turn.`);
    };

    function playRound(row, column) {
        let legalMove = gameboard.addToken(row, column, activePlayer.token);
        if (gameboard.isWinningState()) {
            gameboard.resetBoard();
            console.log(`${activePlayer.name} wins!`);
        }
        if (gameboard.isFull()) {
            gameboard.resetBoard();
            console.log(`It's a draw!`);
        }
        if (legalMove) switchActivePlayer();
        printNewRound();
    }

    return {printNewRound, playRound};
})(playerOne, playerTwo);

gameboard.resetBoard();
game.printNewRound();