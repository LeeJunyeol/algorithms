function parenthesisCase(n) {
    //js에서는 정답을 10007로 나눈 나머지를 출력해 주세요.
    var answer = 0;
    Math.factorial = n => n === 0 ? 1 : new Array(n).fill(0).map((e, i) => i + 1).reduce((p, c) => p * c, 1);
    //             1   2   3   4   5
    // 1()         1   1   1   1   1
    // 2(())       0   2   3   4   5           
    // 3((()))     0   0   5   9   14
    // 4(((())))   0   0   0   14  28
    // 5((((())))) 0   0   0   0   42
    
    answer = (Math.factorial(2 * n) / (Math.factorial(n) * Math.factorial(n) * (n + 1)))%10007;
    return answer;
}

// function factorial(num) {
//     // If the number is less than 0, reject it.  
//     if (num < 0) {
//         return -1;
//     }
//     // If the number is 0, its factorial is 1.  
//     else if (num == 0) {
//         return 1;
//     }
//     var tmp = num;
//     while (num-- > 2) {
//         tmp *= num;
//     }
//     return tmp;
// }
// 실행을 위한 테스트코드입니다.
if (parenthesisCase(3378) == 5) {
    console.log("parenthesisCase(3)이 정상 동작합니다. 제출을 눌러서 다른 경우에도 정답인지 확인해 보세요.");
} else {
    console.log("parenthesisCase(3)이 정상 동작하지 않습니다.");
}