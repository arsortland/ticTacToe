let arr1=[]
for (let i=0; i<3;i++){
    arr1.push([]);
    for (let k=0;k<3;k++){
        arr1[i].push(0);
    }
}


const player = (name,marker) => {
    const getMark = () => marker;
    const getName = () => name;
    return {
        getName,
        getMark,
    };
};

const playerO = player('Mr.Miyagi', 'X');
const playerX = player('Fiffe','O');

console.log(playerX.getName());