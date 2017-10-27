var input = [];

let cache;

let testCase;
let n = -1, board = [];
let isFirst = true;

var rl = require('readline');
rl.createInterface(process.stdin, {})
    .on('line', function (line) {
        if(isFirst){
            testCase = parseInt(line.trim());
            isFirst = false;
            return;
        }
        if(n === -1){
            n =parseInt(line.trim());
            board = []; // 맵 초기화
            cache = new Array(100).fill([]);
            cache = cache.map(() => new Array(100).fill(-1)); // 캐쉬 초기화
            return;
        }
        if(board.length < n){
            board.push(line.trim().split(" ").map((v) => parseInt(v)));
        }
        if(board.length === n){
            --testCase;
            console.log((jump(0, 0)===0? "NO":"YES"));
            n = -1;
        }
        if (testCase === 0) {
            this.close();
            process.stdin.destroy();       }
    }).on('close', function () {
    });

function jump(y, x) {
    // 기저 사례 처리
    if (y >= n || x >= n) return 0;
    if (y === n - 1 && x === n - 1) return 1;

    // 메모이제이션
    let ret = cache[y][x];
    if (ret != -1) return ret;

    let jumpSize = board[y][x];
    return ret = (jump(y + jumpSize, x) || jump(y, x + jumpSize));
}



// 외발 뛰기 문제를 해결하는 재귀 호출 알고리즘
// jumpSize: 게임판의 (y, x) 위치에 있는 수
// jump(y,x) = jump(y+jumpSize, x) || jump(y, x+jumpSize) // 아래쪽으로 뛸 경우 또는 오른쪽으로 뛸 경우
// function jump(y, x){
//     // 기저 사례: 게임판 밖을 벗어난 경우
//     if(y >= n || x >= n) return false;

//     // 기저 사례: 마지막 칸에 도착한 경우
//     if(y === n-1 && x === n-1) return true;
//     let jumpSize = board[y][x];
//     return jump(y + jumpSize, x) || jump(y, x+jumpSize);
// }

// 3
// 7
// 2 5 1 6 1 4 1
// 6 1 1 2 2 9 3
// 7 2 3 2 1 3 1
// 1 1 3 1 7 1 2
// 4 1 2 3 4 1 2
// 3 3 1 2 3 4 1
// 1 5 2 9 4 7 0
// 7
// 2 5 1 6 1 4 1
// 6 1 1 2 2 9 3
// 7 2 3 2 1 3 1
// 1 1 3 1 7 1 2
// 4 1 2 3 4 1 3
// 3 3 1 2 3 4 1
// 1 5 2 9 4 7 0
// 7
// 1 1 1 1 1 1 1
// 1 1 1 1 1 1 1
// 1 1 1 1 1 1 1
// 1 1 1 1 1 1 1
// 1 1 1 1 1 1 1
// 1 1 1 1 1 1 2
// 1 1 1 1 1 2 0
