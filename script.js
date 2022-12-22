const gameState = (() => {
    let currentPlayer = 'x';
    let round = 1;

    /* fetch all playable cells in grid */
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
        cell.addEventListener("click", () => {
            
            /* fetch the row and column selected */
            let row = cell.dataset.row;
            let col = cell.dataset.col;

            if (gameBoard.validPos(row, col)){
                if (getCurrPlayer() === 'x'){
                    cell.textContent = 'X'
                } else {
                    cell.textContent = 'O'
                }
            }
                
            /* update the internal game board */ 
            gameBoard.updateBoard(getCurrPlayer(), row, col);

            /* check if anyone has won the round yet */
            let gameDecision = gameBoard.checkBoard();

            /* if someone won the round, announce the winner */
            if (gameDecision.player === player1.getID()){
                announceRoundWinner(player1, gameDecision);
            } else if (gameDecision.player === player2.getID()){
                announceRoundWinner(player2, gameDecision); 
            } else if (gameDecision === "draw"){
                announceDraw(); 
            }

            /* toggle to next player */
            togglePlayer();
        });
    });

    const togglePlayer = () => {
        if (currentPlayer === 'x'){
            currentPlayer = 'o';
        } else {
            currentPlayer = 'x';
        }
    }

    const announceRoundWinner = (player, decision) => {
        player.incrementWins();
        console.log(`Player ${player.getID()} Won!`);
        cells.forEach((cell) => {    
            decision.cells.forEach((winning) => {
                if (cell.dataset.row == winning[0] && cell.dataset.col == winning[1]){
                    
                    cell.style.backgroundColor = "green";
                }
            })   
        })
        
        const b = document.querySelector("body");
        let div = document.createElement("div");
        div.setAttribute("class", "round-winner");

        let p = document.createElement("p");
        p.textContent = `Round ${round}: Player ${player.getID().toUpperCase()}!`;

        div.appendChild(p);

        b.appendChild(div);

        const sleep = ms => new Promise(r => setTimeout(r, 2000));
        sleep().then(() => {
            b.removeChild(document.querySelector(".round-winner"));
            nextRound();
        });
    }

    const announceDraw = () => {

        console.log("Draw!");
 
        const b = document.querySelector("body");
        let div = document.createElement("div");
        div.setAttribute("class", "round-winner");

        let p = document.createElement("p");
        p.textContent = `Round ${round}: Draw!`;

        div.appendChild(p);

        b.appendChild(div);

        const sleep = ms => new Promise(r => setTimeout(r, 2000));
        sleep().then(() => {
            b.removeChild(document.querySelector(".round-winner"));
            nextRound();
        });
    }

    const getCurrPlayer = () => currentPlayer;

    const nextRound = () => {
        // currentPlayer = 'x';
        gameBoard.clearBoard();
        round++;

        clearWebBoard();
    }

    const clearWebBoard = () => {
        cells.forEach((cell) => {
            cell.style.backgroundColor = "rgb(236, 235, 235)";
            cell.textContent = "";
        })
    }

    return {};
})();


const gameBoard = (() => {
    let board = [['_', '_', '_'], 
                 ['_', '_', '_'], 
                 ['_', '_', '_']];

    let test = [1,2,3];

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
                return {player: board[r][0], cells: [[r, 0], [r, 1], [r, 2]]};
            }
        }

        for (let c = 0; c < 3; c++){
            if ((board[0][c] === board[1][c]) && (board[1][c] === board[2][c])){
                return {player: board[0][c], cells: [[0, c], [1, c], [2, c]]};
            }
        }

        if ((board[0][0] === board[1][1]) && (board[1][1] === board[2][2])){
            return {player: board[0][0], cells: [[0, 0], [1, 1], [2, 2]]};
        }

        if ((board[0][2] == board[1][1]) && (board[1][1] == board[2][0])){
            return {player: board[0][2], cells: [[0, 2], [1, 1], [2, 0]]};
        }

        for (let r = 0; r<board.length; r++){
            if (board[r].indexOf('_') != -1){
                return {player: "no winner", cells: [[], [], []]};
            }
        }

        return "draw"; 
    }

    const validPos = (row, col) => {
        return board[row][col] === '_'
    }

    const clearBoard = () => {
        board = board.map((row) => {
            return row.map((cell) => {
                return '_' 
            })
        }) 
    }

    const printBoard = () => {
        console.log(board)
    }
    return {updateBoard, checkBoard, validPos, clearBoard, printBoard};
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

