var input = require('fs').readFileSync('1학년').toString().trim().split('\n');

(function solve(){
    var n = parseInt(input[0].trim());
    var numbers = input[1].split(" ").map((v) => parseInt(v));
    var target = numbers.pop();

    var dp = new Array(n-1);
    var i, j;
    for (i = 0; i < dp.length; i++) {
        dp[i] = new Array(21).fill(0);
    }
    dp[0][numbers[0]] = 1;
    for (i = 1; i < n-1; i++) {
        for (j = 0; j <= 20; j++) {
            if (dp[i - 1][j] !== 0) {
                if (j + numbers[i] <= 20) {
                    dp[i][j + numbers[i]] += dp[i - 1][j];
                }
                if (j - numbers[i] >= 0) {
                    dp[i][j - numbers[i]] += dp[i - 1][j];
                }
            }
        }
    }
    console.log(dp[n-2][target]);
})();
// 8+3-2-4+8-7-2-4+0+8=8
// 8+3+2+4-8-7+2-4-0+8=8
// 8+3+2+4-8-7+2-4+0+8=8
// 8+3-2-4+8-7+2+4-0-8=8
// 8+3-2-4+8-7+2+4+0-8=8
// 8-3+2+4-8+7+2+4-0-8=8
// 8-3+2+4-8+7+2+4+0-8=8
// 8-3+2-4+8+7+2-4-0-8=8
// 8-3+2-4+8+7+2-4+0-8=8

    // 8+3-2-4+8-7-2-4-0+8=8

    // 0 ~ 20 범위니까 dp[n+1][21]을 만들면 되는구나!
    // dp[i][j] = dp[i]까지 계산했을 때 만들 수 있는 경우의 수
    // dp     0   1   2   3   4   5   6   7     8... 20
    // 1    
    // 2    
    // 3
    // 4
    // 5
    // 6
    // 7
    // 8                      