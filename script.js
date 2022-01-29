const gameBoard =(() => {
    const topleft = document.getElementById('topleft');
    const topmid = document.getElementById('topmid');
    const topright = document.getElementById('topright');
    const midleft = document.getElementById('midleft');
    const midmid = document.getElementById('midmid');
    const midright = document.getElementById('midright');
    const botleft = document.getElementById('botleft');
    const botmid = document.getElementById('botmid');
    const botright = document.getElementById('botright');
    const board = () =>
    [
        [topleft.textContent,topmid.textContent,topright.textContent],
        [midleft.textContent,midmid.textContent,midright.textContent],
        [botleft.textContent,botmid.textContent,botright.textContent]
    ];
    const clearBoard = (() =>{
        document.querySelector('.restart').addEventListener('click', ()=> {
            location.reload();
        })
    })();
    return {
        board,
    };
})();


const player = (marker) => {
    const getMarker = () => marker;
    const setMark = (newMark) => marker = newMark; 
    return {
        getMarker,
        setMark,
    };
};


const gameLogic =(() => {
    let i=0;
    const player1 = player('X');
    const player2 = player('O');
    const circlebtn = document.querySelector('.circle');
    const crossbtn = document.querySelector('.cross');
    const whosNext = document.querySelector('.whosturn');

    circlebtn.addEventListener('click', () => {
        document.querySelectorAll('.elem').forEach(cell => cell.textContent = '');
        player1.setMark('O');
        player2.setMark('X');
        whosNext.textContent = 'Player O begins!';
        return i=0;
    });
    crossbtn.addEventListener('click', () => {
        document.querySelectorAll('.elem').forEach(cell => cell.textContent = '');
        player1.setMark('X');
        player2.setMark('O');
        whosNext.textContent = 'Player X begins!';
        return i=0;
    });
    const alterneTurns = (num) => {
        let alternate = (num%2==0) ? player1.getMarker() : player2.getMarker();
        return alternate;
    }
    const dontAllowOccupiedSpace = (space) => {
        if (space.textContent != ''){
            return space.textContent;
        }
        try{
            return alterneTurns(i++);
        }
        catch{
            return;
        } 
    }
    const checkForWinOrDraw = () => {
        try{
            if (i >= 4){
                let brd = gameBoard.board();
                if ((brd[0][0] === 'X') && (brd[1][1] === 'X') && (brd[2][2] ==='X')){
                    return haveWon('X');
                }else if ((brd[0][0] === 'O') && (brd[1][1] === 'O') && (brd[2][2] ==='O')){
                    return haveWon('O');
                }else if ((brd[0][2] === 'X') && (brd[1][1] === 'X') && (brd[2][0] ==='X')){
                return haveWon('X');
                }else if ((brd[0][2] === 'O') && (brd[1][1] === 'O') && (brd[2][0] ==='O')){
                    return haveWon('O');
                }
                for (let i=0; i<3;i++){
                    if ((brd[i][0] ==='X') && (brd[i][1] === 'X') && (brd[i][2] === 'X')){
                        return haveWon('X');
                    } else if ((brd[i][0] ==='O') && (brd[i][1] === 'O') && (brd[i][2] === 'O')){
                        return haveWon('O');
                    }else if ((brd[0][i] ==='X') && (brd[1][i] === 'X') && (brd[2][i] === 'X')){
                        return haveWon('X');
                    }else if ((brd[0][i] ==='O') && (brd[1][i] === 'O') && (brd[2][i] === 'O')){
                        return haveWon('O');
                    }
                }
                for (let i=0; i<3;i++){ //moved here to check for all winpossibilites before looking for draw.
                    if (!brd[0].includes('') && !brd[1].includes('') && !brd[2].includes('')){
                        return haveWon('draw');
                    }
                }  
            }        
        }
        catch{
            return;
        }
    }
    const haveWon = (res) => {
        let modal = document.getElementById('myModal');
        let modalContent = document.querySelector('.modal-content');
        const gamewindow = document.querySelector('.gamewindow');
        const blureffect = () => gamewindow.style.filter = 'blur(8px)';
        window.onclick = (e) => {
            if (e.target == modal){
                location.reload();
            }
        }
        switch (res){
            case 'X':
                modalContent.textContent = 'Player X have won!'
                modal.style.display = 'block';
                blureffect();
                break;
            case 'O':
                modalContent.textContent = 'Player O have won!'
                modal.style.display = 'block';
                blureffect();
                break;
            case 'draw':
                modalContent.textContent = "It's a draw!"
                modal.style.display = 'block';
                blureffect();
                break;
        }
    }
    return {
        dontAllowOccupiedSpace,
        checkForWinOrDraw,
    }
})();


const playGame = (()=> {
    const whosNext = document.querySelector('.whosturn');
    const nextPlayer = (cell) => {
        if (cell.textContent ==='X'){
           return whosNext.textContent = "Player O's turn";
        }else if (cell.textContent === 'O'){
           return whosNext.textContent = "Player X's turn";
        }
    };
    document.querySelectorAll('.elem').forEach(cell => cell.addEventListener('click', ()=> {
        cell.textContent = gameLogic.dontAllowOccupiedSpace(cell);
        console.log(gameLogic.dontAllowOccupiedSpace(cell));
        gameLogic.checkForWinOrDraw();
        nextPlayer(cell);
    }));
})();


/**
 * When player chooses CPU ->
 * Second player is now not active -> (Make player function for that?)
 * As player 1 inputs mark a new mark is set on available space ->
 * winconditioncheck
 * repeat.
 *  */


/**
 * Assign 2d array to DOM elements
 * assign players
 * onlick marker on DOM element and update array with new value
 * check for wincondition
 * change player
 * repeat.
 * 
 * if cpu:
 * 
 * when player click
 * change to cpu and find empty space in array and input value.
 *   */ 

const playCPU = (isTrue) => { //make playerfactory set this thriugh function.
    let rnd = Math.floor(Math.random *3);
    gameBoard.board()[rnd][rnd] = gameLogic.player2.getMarker();
}