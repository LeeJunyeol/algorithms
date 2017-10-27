var input = [];

let testCase;
let isFirst = true;

var rl = require('readline');
rl.createInterface(process.stdin, {})
    .on('line', function (line) {
        if (isFirst) {
            testCase = parseInt(line.trim());
            isFirst = false;
            return;
        } else {
            --testCase;
            let kn = line.trim().split(" ").map(v => parseInt(v));
            console.log(countRanges(kn[0], kn[1]));
        }
        if (testCase === 0) {
            this.close();
            process.stdin.destroy();
        }
    });

class RNG {
    constructor() {
        this.seed = 1983;
        this.ret = -1;
    }

    next() {
        if (this.ret !== -1) {
            this.ret = (this.seed * 214013 + 2531011) >>> 0;
            this.seed = this.ret;
        } else {
            this.ret = this.seed;
            return this.ret;
        }
        return this.ret % 10000 + 1;
    }
}

function countRanges(k, n){
    let rng = new RNG();    // 신호값을 생성하는 난수 생성기
    let rangeQueue = []; // 현재 구간에 들어 있는 숫자들을 저장하는 큐
    let ret = 0, rangeSum = 0;
    for(let i = 0; i < n; ++i){
        // 구간에 숫자를 추가한다.
        let newSignal = rng.next();
        rangeSum += newSignal;
        rangeQueue.push(newSignal);

        // 구간의 합이 k를 초과하는 동안 구간에서 숫자를 뺀다.
        while(rangeSum > k){
            rangeSum -= rangeQueue.shift();
        }
        
        if(rangeSum === k) ret++;
    }
    return ret;
}

console.log(countRanges(8791, 20));
console.log(countRanges(5265, 5000));
console.log(countRanges(3578452, 5000000));