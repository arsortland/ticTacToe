
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
const playerX = players('X');
const playerO = players('O');

const displayController =(() => {
    let i=0;

    const alterneTurns = (num) => {        //returnerer alltid X siden den blir kjørt på nytt for hver gang!
        if (num%2 ==0){
            return playerX.getMarker();
        }else{
            return playerO.getMarker();
        }
    }
    const myTurn = document.querySelectorAll('.elem').forEach(cell => cell.addEventListener('click', ()=> {
        cell.textContent = alterneTurns(i);
        i++;
        console.log(i);
        console.log(alterneTurns());
        console.log(gameBoard.board());
    }))
})();

function dontAllowOccupiedSpace(){
    //Code here!
}

//check for win-condition
//check for available and occupied spaces.
//gameflow, alternating players
//