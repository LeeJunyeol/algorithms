var input = [];

var rl = require('readline');
rl.createInterface(process.stdin, {})
    .on('line', function (line) {
        input.push(line.trim());
        if (+input[0] === input.length - 1) {
            this.close();
        }
    }).on('close', function () {
        for (let i = 1; i <= +input[0]; ++i){
            let nk = input[i].split(" ").map((v) => parseInt(v));
            console.log(josephus(nk[0], nk[1]));
        }
    });

function josephus(n, k){
    // 리스트를 준비한다.
    let survivors = new Array(n).fill().map((v,i) => i+1);
    
    let target = 0;
    while(survivors.length > 2){
        survivors.splice(target, 1);
        for(let i = 0; i < k - 1; ++i){
            if(target === survivors.length) target = 0;
            ++target;
            if(target === survivors.length) target = 0;
        }
    }
    return survivors.shift() + " " + survivors.shift();
}

//console.log(josephus(40, 3));
