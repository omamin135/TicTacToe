const gameState = (() => {
    let currentPlayer = 'x';

    const togglePlayer = () => {
        if (currentPlayer === 'x'){
            currentPlayer = 'o';
        } else {
            currentPlayer = 'x';
        }
    }

    const announceWinner = (player) => {
        console.log(`Player ${player} Won!`);
    }

    const getCurrPlayer = () => currentPlayer;

    return {togglePlayer, getCurrPlayer, announceWinner};
})();


const gameBoard = (() => {
    let board = [['_', '_', '_'], 
                 ['_', '_', '_'], 
                 ['_', '_', '_']];

    const updateBoard = (player, row, col) => {
        if (player == 'x'){
            board[row][col] = 'x';
        } else {
            board[row][col] = 'o';
        }
    }

    const checkBoard = () => {
        for (let r = 0; r < 3; r++){
            if ((board[r][0] === board[r][1]) && (board[r][1] === board[r][2])){
                return board[r][0];
            }
        }

        for (let c = 0; c < 3; c++){
            if ((board[0][c] === board[1][c]) && (board[1][c] === board[2][c])){
                return board[0][c];
            }
        }

        if ((board[0][0] === board[1][1]) && (board[1][1] === board[2][2])){
            return board[0][0];
        }

        if ((board[0][2] == board[1][1]) && (board[1][1] == board[2][0])){
            return board[0][2];
        }

        return "no winner";
    }

    return {updateBoard, checkBoard};
})();


const player = (id) => {
    let playerID = id;

    let wins = 0;

    /**
     * returns the number of wins of the player
     * @returns {int} wins - the number of wins the player has
     */
    const getWins = () => wins;

    /**
     * returns the player ID of the player
     * @returns {String} playerID - the player ID
     */
    const getID = () => playerID;

    /**
     * increments the win counter by 1
     */
    const incrementWins = () => {
        wins++;
    }

    return {getWins, getID, incrementWins};
};

/* initalize player 1 and player 2 */
const player1 = player("x");
const player2 = player("o");

/* fetch all playable cells in grid */
const cells = document.querySelectorAll(".cell");
cells.forEach((cell) => {
    cell.addEventListener("click", () => {
        
        /* fetch the row and column selected */
        let row = cell.dataset.row;
        let col = cell.dataset.col;

        /* update the internal game board */ 
        gameBoard.updateBoard(gameState.getCurrPlayer(), row, col);
        
        /*add "x" or "o" img to the selected cell depending on active player */
        let img = document.createElement("img");
        if (gameState.getCurrPlayer() === 'x'){
            img.setAttribute("src", "assets/cross.svg");
            img.setAttribute("class", "cross");
        } else {
            img.setAttribute("src", "assets/circle.svg");
            img.setAttribute("class", "circle");
        }
        cell.appendChild(img);

        /* check if anyone has won the round yet */
        let gameDecision = gameBoard.checkBoard();

        /* if someone won the round, announce the winner */
        if (gameDecision === player1.getID()){
            gameState.announceWinner(player1.getID())
            player1.incrementWins();

        } else if (gameDecision === player2.getID()){
            gameState.announceWinner(player2.getID())
            player2.incrementWins();
        }

        /* toggle to next player */
        gameState.togglePlayer();
    });
});