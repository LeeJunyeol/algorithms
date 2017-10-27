function gcdlcm(a, b) {
    var answer = [];

    var gcd = getGCD(a, b);
    answer.push(gcd, getLCM(a, b, gcd));
    return answer;
}

function getLCM(a, b, gcd) {
    return a*b/gcd;
}

function getGCD(bigNum, smallNum) { // 유클리드 호제법
    var target = bigNum;
    var divisor = smallNum;
    var remainer = target % divisor;
    while (remainer !== 0) {
        target = divisor;
        divisor = remainer;
        remainer = target % divisor;
    }
    return divisor;
}

// 아래는 테스트로 출력해 보기 위한 코드입니다.
console.log(gcdlcm(3, 12));