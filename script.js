
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

    const player1 = player('');
    const player2 = player('');
    const circlebtn = document.querySelector('.circle');
    const crossbtn = document.querySelector('.cross');
    circlebtn.addEventListener('click', () => {
        player1.setMark('O');
        player2.setMark('X');
        circlebtn.disabled = true;
        crossbtn.disabled = true;
        return i=0;
    });
    crossbtn.addEventListener('click', () => {
        player1.setMark('X');
        player2.setMark('O');
        crossbtn.disabled = true;
        circlebtn.disabled = true;
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
                    }else if (!brd[0].includes('') && !brd[1].includes('') && !brd[2].includes('')){
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
    document.querySelectorAll('.elem').forEach(cell => cell.addEventListener('click', ()=> {
        cell.textContent = gameLogic.dontAllowOccupiedSpace(cell);
        gameLogic.checkForWinOrDraw();
    }));
})();


//Figure out how to CPU. In player (how to use the playerfactory for it? Check TOP lecture) or gamelogic? Disable the other player? Make a new IIEFE for that and disable the other with a false/true?
//Refactor the wincondition function????
//