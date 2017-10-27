function change(total, coin) {
    // 5
    // 1원 맞추는 경우의 수 = {1}
    // 2원 맞추는 경우의수 = {1, 1} {2}
    // 3원 맞추는 경우의수 = {1, 1, 1} {1, 2}
    // 4원 맞추는 경우의수 = {1, 1, 1, 1} {1, 1, 2} {2, 2}
    // 5원 맞추는 경우의수 = {1, 1, 1, 1, 1} {1, 1, 1, 2} {1, 2, 2} { 5 }

    // dp    1  2  3  4  5 
    // 1     1  1  1  1  1
    // 1,2   1  2  2  3  3
    // 1,2,5 1  2  2  3  4

    let i, j;
    let dp = new Array(total + 1).fill(0);
    dp.splice(0, 1, 1);
    for(i = 1; i <= coin.length; i++){
        for(j = 1; j <= total; j++){
            if(coin[i-1] <= j){
                dp.splice(j, 1, dp[j] + dp[j-coin[i-1]]);
            }
        }
    }
	return dp.pop();
}

// 아래는 테스트로 출력해 보기 위한 코드입니다.
console.log(change(5, [ 1, 2, 5 ]));