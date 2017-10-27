var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let count = 0;
let input = [];
let k = 0;

let n = 0;
let m = 0;

rl.on('line', function (line) {
    if(count === 0){
        let firstLine = line.trim().split(" ");
        n = parseInt(firstLine[0]);
        m = parseInt(firstLine[1]);
        k = parseInt(firstLine[2]);
    } else {
        input.push(line.trim());
    }
    count++;
    if(k === count - 1){
        rl.close();
    }
});

rl.on('close', function(){
    var map = new Array(n).fill(new Array(m).fill(0));
    
    for(let i = 0; i<k; i++){
        let a = input[i].split(" ");
        let rowNum = parseInt(a[0]);
        let startCol = parseInt(a[1]);
        let endCol = parseInt(a[2]);
        for(let j = startCol - 1; j<endCol - 1; j++){
            map[rowNum][j] = 1;
        }
    }
    var answer = 0;
    for(let i = 0; i<map.length; i++){
        for(let j = 0; j<map[i].lenght; j++){
            if(map[i][j] === 0){
                answer++;
            }
        }
    }
    console.log(answer);
})

