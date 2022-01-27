
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
    return {
        board,
    };
})();


const player = (marker) => {
    const getMarker = () => marker;
    return {
        getMarker,
    };
};


const gameLogic =(() => {
    let i=0;
    const playerX = player('X');
    const playerO = player('O');

    const alterneTurns = (num) => {
        let alternate = (num%2==0) ? playerX.getMarker() : playerO.getMarker();
        return alternate;
    }

    const dontAllowOccupiedSpace = (space) => {
        if (space.textContent != ''){
            return space.textContent;
        }
           return alterneTurns(i++);
    }

    const checkForWinOrDraw = () => {
        let brd = gameBoard.board();
        if ((brd[0][0] === 'X') && (brd[1][1] === 'X') && (brd[2][2] ==='X')){
            console.log('PlayerX wins');
        }else if ((brd[0][0] === 'O') && (brd[1][1] === 'O') && (brd[2][2] ==='O')){
            console.log('PlayerO wins');
        }else if ((brd[0][2] === 'X') && (brd[1][1] === 'X') && (brd[2][0] ==='X')){
            console.log('PlayerX wins');
        }else if ((brd[0][2] === 'O') && (brd[1][1] === 'O') && (brd[2][0] ==='O')){
            console.log('PlayerO wins');
        }
        for (let i=0; i<3;i++){
            if ((brd[i][0] ==='X') && (brd[i][1] === 'X') && (brd[i][2] === 'X')){
                console.log('PlayerX wins');
            } else if ((brd[i][0] ==='O') && (brd[i][1] === 'O') && (brd[i][2] === 'O')){
                console.log('PlayerO wins');
            }else if ((brd[0][i] ==='X') && (brd[1][i] === 'X') && (brd[2][i] === 'X')){
                console.log('PlayerX wins')
            }else if ((brd[0][i] ==='O') && (brd[1][i] === 'O') && (brd[2][i] === 'O')){
                console.log('PlayerO wins')
            }else if (!brd[0].includes('') && !brd[1].includes('') && !brd[2].includes('')){
                console.log('Draw');
            }
        }  
    }

    const haveWon = () => {
        //function for winning. Make html here!
        //Modal?
    }

    const itsDraw = () => {
        //function for draw! Make html here!
        //Modal? Combine the two functions?
    }

    return {
        dontAllowOccupiedSpace,
        checkForWinOrDraw,
        haveWon,
    }
})();


const playGame = (()=> {
    document.querySelectorAll('.elem').forEach(cell => cell.addEventListener('click', ()=> {
        cell.textContent = gameLogic.dontAllowOccupiedSpace(cell);
        gameLogic.checkForWinOrDraw();
        gameLogic.haveWon();
    }));
})();