var input = require('fs').readFileSync('data/가장큰부분증가수열').toString().trim().split('\n');

var n = parseInt(input[0]);
var arr = [];

input[1].split(" ").forEach(function(v, i){
    arr.push(parseInt(v));
});

var dp = arr.slice();

//       1 100 2 50 60 3 5 6 7 8
// dp :  1 101 3 53 

// path 1
// 1
// 1

// 1 100
// 1 101
// dp[0] dp[0] + arr[1]

// 1 100 2
// 1 101 3 dp[0] + arr[2]

// 1 100 2 50
// 1 101 3 53
//      dp[2] + arr[3]

// 현재 위치에서 이전 위치까지 dp 값을 비교한다.
var max = 0;

for(var i = 0; i < n; i++){
    for(var j = 0; j <= i; j++){
        if(arr[j] < arr[i] && dp[i] < dp[j] + arr[i]){
            dp[i] = dp[j] + arr[i];
        }
    }
}

dp.forEach(function(v, i){
    max = Math.max(max, v);
});
console.log(max);