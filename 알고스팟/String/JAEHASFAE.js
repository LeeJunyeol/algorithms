// let ret = shift("abbab", "babab");
// ret += shift("babab", "ababb");
// ret += shift("ababb", "bbaba");

// abbababbab  2
//   babab
// ababbababb  1
// babab    
// ababbababb  3
//    bbaba
//console.log(ret);

let isFirst = true;
let testCase = -1;
let lineNums = 0;
let ret = 0;
let flag = true;

let input = [];

var rl = require('readline');
rl.createInterface(process.stdin, {})
    .on('line', function (line) {
        if (isFirst) {
            testCase = parseInt(line.trim());
            isFirst = false;
        } else {
            if (lineNums === 0) {
                lineNums = parseInt(line.trim()) + 1;
            } else {
                input.push(line.trim());
                if (input.length > 1) {
                    if(flag){
                        ret += parseInt(shift(input.shift(), input[0]));
                        flag = false;
                    } else {
                        ret += input[0].length - parseInt(shift(input[1], input.shift()));
                        flag = true;
                    }
                }
                if (--lineNums === 0) {
                    console.log(ret);
                    ret = 0;
                    input = [];
                    flag = true;
                    --testCase;
                };
            }
            if (testCase === 0) this.close();
        }
    })
    .on('close', function () {
        process.exit();
    });

function shift(original, target) {
    return kmpSearch(original + original, target)[0];
}

function kmpSearch(inputStr, subStr) {
    let n = inputStr.length,
        m = subStr.length;
    let ret = [];
    // pi[i]] = N[..i]의 접미사도 되고 접두사도 되는 문자열의 최대 길이
    let pi = getPartialMatch(subStr);

    // begin = matched = 0부터 시작하자.
    let begin = 0,
        matched = 0;
    while (begin <= n - m) {
        // 만약 입력 문자열의 해당 글자가 부분 문자열의 해당 글자와 같다면
        if (matched < m && inputStr[begin + matched] === subStr[matched]) {
            ++matched;
            // 결과적으로 m 글자가 모두 일치했다면 답에 추가한다.
            if (matched === m) ret.push(begin);
        } else {
            // 예외: matched가 0인 경우에는 다음 칸부터 계속
            if (matched === 0) {
                ++begin;
            } else {
                begin += matched - pi[matched - 1];
                // begin을 옮겼다고 처음부터 다시 비교할 필요가 없다.
                // 옮긴 후에도 pip[matched - 1]만큼은 항상 일치하기 때문이다.
                matched = pi[matched - 1];
            }
        }
    }
    return ret;
}

function getPartialMatch(subStr) {
    let m = subStr.length;
    let pi = new Array(m).fill(0);

    // KMP로 자기 자신을 찾는다.
    // N을 N에서 찾는다. begin = 0 이면 자기 자신을 찾아버리니까 안됨!
    let begin = 1,
        matched = 0;

    // 비교할 문자가 subStr의 끝에 도달할 때까지 찾으면서 부분 일치를 모두 기록한다.
    while (begin + matched < m) {
        if (subStr[begin + matched] === subStr[matched]) {
            ++matched;
            pi[begin + matched - 1] = matched;
        } else {
            if (matched === 0) {
                ++begin;
            } else {
                begin += matched - pi[matched - 1];
                matched = pi[matched - 1];
            }
        }
    }
    return pi;
}