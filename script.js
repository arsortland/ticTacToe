
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
    const myTurn = document.querySelectorAll('.elem').forEach(el => el.addEventListener('click', ()=> {
        el.textContent = "X";
        console.log(gameBoard.board());
    }))
})();


//check for win-condition
//gameflow, alternating players
//