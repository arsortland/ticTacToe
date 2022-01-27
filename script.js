
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


const players = (marker) => {
    const getMarker = () => marker;     //som en getmetode i Java!
    return {
        getMarker,
    };
};



const displayController =(() => {
    let i=0;
    const playerX = players('X');
    const playerO = players('O');

    const alterneTurns = (num) => {
        let alternate = (num%2==0) ? playerX.getMarker() : playerO.getMarker();
        return alternate;
    }

    const dontAllowOccupiedSpace = (space) => {
        if (space.textContent != ''){
            i--;
            return space.textContent;
        }
           return alterneTurns(i);
    }

    const checkForWinOrDraw = () => {       //Run new function when draw/win;
        let brd = gameBoard.board();
        if ((brd[0][0] === 'X') && (brd[1][1] === 'X') && (brd[2][2] ==='X')){
            console.log('diagonal win');
        }else if ((brd[0][0] === 'O') && (brd[1][1] === 'O') && (brd[2][2] ==='O')){
            console.log('diagonal win');
        }else if ((brd[0][2] === 'X') && (brd[1][1] === 'X') && (brd[2][0] ==='X')){
            console.log('diagonal win');
        }else if ((brd[0][2] === 'O') && (brd[1][1] === 'O') && (brd[2][0] ==='O')){
            console.log('diagonal win');
        }
        for (let i=0; i<3;i++){
            if ((brd[i][0] ==='X') && (brd[i][1] === 'X') && (brd[i][2] === 'X')){
                console.log('We have a winner! PLAYERX');
            } else if ((brd[i][0] ==='O') && (brd[i][1] === 'O') && (brd[i][2] === 'O')){
                console.log('We have a winner! PLAYERO');
            }else if ((brd[0][i] ==='X') && (brd[1][i] === 'X') && (brd[2][i] === 'X')){
                console.log('vertcal win')
            }else if ((brd[0][i] ==='O') && (brd[1][i] === 'O') && (brd[2][i] === 'O')){
                console.log('vertcal win')
            }
        }  
    }

    const takeTurn = 
        document.querySelectorAll('.elem').forEach(cell => cell.addEventListener('click', ()=> {
        cell.textContent = dontAllowOccupiedSpace(cell);
        i++;
        checkForWinOrDraw();
        // console.log(i);
        // console.log(alterneTurns(i));
        // console.log(gameBoard.board());
    }))
})();



//make a playGame module and clean up displaycontroller?