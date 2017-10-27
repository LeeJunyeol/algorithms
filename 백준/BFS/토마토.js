var input = require('fs').readFileSync('data/토마토').toString().trim().split('\n');

var mn = input[0].split(" ");
var m = parseInt(mn[0]); // 가로 
var n = parseInt(mn[1]); // 세로

var tomatoArr = [];
var check = [];

for (var i = 1; i <= n; i++) {
    tomatoArr.push(input[i].trim().split(" ").map(function (v) {
        return parseInt(v);
    }));
    check.push(new Array(m).fill(0));
}

var initTomato = [];


for (var i = 0; i < n; i++) {
    var idx = tomatoArr[i].indexOf(1);
    while(idx != -1){
        check[i][idx] = 1;
        initTomato.push([i, idx]);
        idx = tomatoArr[i].indexOf(1, idx + 1);
    };
}

var dx = [1, -1, 0, 0];
var dy = [0, 0, 1, -1];

var max = 0;
while (initTomato.length !== 0) {
    var xy = initTomato.shift();
    for (var i = 0; i < 4; i++) {
        var nx = xy[0] + dx[i];
        var ny = xy[1] + dy[i];
        if (nx < n && ny < m && nx >= 0 && ny >= 0) {
            if (tomatoArr[nx][ny] === 0 && check[nx][ny] === 0) {
                check[nx][ny] = check[xy[0]][xy[1]] + 1;
                initTomato.push([nx, ny]);
            }
        }
    }
}
// var isBreak = false;
// for (var i = 0; i < n; i++) {
//     for (var j = 0; j < m; j++) {
//         if (tomatoArr[i][j] === 0 && check[i][j] === 0) {
//             max = -1;
//             isBreak = true;
//             break;
//         }
//         if (check[i][j] - 1 > max) {
//             max = check[i][j] - 1;
//         }
//     }
//     if (isBreak) {
//         break;
//     }
// }

var cant = false;
max = check.reduce(function(c, v){
    return c.concat(v);
}).reduce(function(c, v){
    if(v === 0){
        cant = true;
    }
    return Math.max(c, v);
}, 0);
if(max > 0){
    max--;
} else if(max === 0){
    max = 0;
}


if(cant && max > 0){
    console.log(-1);
} else {
    console.log(max);
}


// let input = require('fs').readFileSync('data/토마토').toString().trim().split('\n');

// let mn = input[0].match(/(\d)/g);
// let m = parseInt(mn.shift()); // 가로 
// let n = parseInt(mn.shift()); // 세로

// let tomatoArr = [];
// let check = [];

// for (let i = 1; i <= n; i++) {
//     tomatoArr.push(input[i].trim().split(" ").map((v) => parseInt(v)));
//     check.push(new Array(m).fill(0));
// }

// let initTomato = [];

// for (let i = 0; i < n; i++) {
//     for (let j = 0; j < m; j++) {
//         if (tomatoArr[i][j] === 1) {
//             check[i][j] = 1;
//             initTomato.push([i, j]);
//         }
//     }
// }

// const dx = [1, -1, 0, 0];
// const dy = [0, 0, 1, -1];

// if (initTomato.length === 0) {
//     console.log(-1);
// } else {
//     while (initTomato.length !== 0) {
//         let xy = initTomato.shift();
//         for (let i = 0; i < 4; i++) {
//             let nx = xy[0] + dx[i];
//             let ny = xy[1] + dy[i];
//             if (nx < n && ny < m && nx >= 0 && ny >= 0) {
//                 if (tomatoArr[nx][ny] === 0 && check[nx][ny] === 0) {
//                     tomatoArr[nx][ny] = 1;
//                     check[nx][ny] = check[xy[0]][xy[1]] + 1;
//                     initTomato.push([nx, ny]);
//                 }
//             }
//         }
//     }
//     let max = 0;
//     for (let i = 0; i < n; i++) {
//         for (let j = 0; j < m; j++) {
//             max = Math.max(max, check[i][j]);
//         }
//     }
//     console.log(max - 1);
// }