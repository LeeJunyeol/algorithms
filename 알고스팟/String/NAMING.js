// 예제 입력

// ababcabababa
// bcabab
// 예제 출력

// 2 4 9 18

//console.log(naming("ababcabababa", "bcabab"));


var input = [];

let count = 2;

var rl = require('readline');
rl.createInterface(process.stdin, {})
    .on('line', function (line) {
        --count;
        input.push(line.trim());
        if (count === 0) {
            let result = naming(input[0], input[1]);
            console.log(result.sort(function(a, b){
                return a - b;
            }).join(" "));
            this.close();
            process.stdin.destroy();
        }
    });

function naming(a, b) {
    let S = a.concat(b);

    let pi = new Array(S.length).fill(0);
    // "alala"
    let begin = 1,
        matched = 0;
    while (begin + matched < S.length) {
        if (S[begin + matched] === S[matched]) {
            ++matched;
            // 몇개까지 일치했었는지 기록해둔다.
            pi[begin + matched - 1] = matched;
        } else {
            if(matched === 0) {
                ++begin;
            } else {
                // 시작위치 begin부터 matched 2개까지 일치하다가 틀렸다.
                // 그러면 2칸 뒤로 간다. 그런데 pi[matched - 1] 즉 접두사도 되고 접미사가 될 수 있는 최대 길이가 1이다.
                // 그러면 2 - 1칸만 뒤로 간다. 왜냐면 2칸 뒤로 간다고 해도 접두사도 되고 접미사가 될 수 있다는 보장이 없기 때문!
                begin += matched - pi[matched - 1];
                matched = pi[matched - 1]; // 이만큼 일치한 거다.
            }
        }
    }
    
    // pi의 마지막 값이 가장 큰 접두사접미사 길이이다. 만약 index가 20이고 pi[20]이 9라고 했을 때 "aaabbaaaa"
    // pi[9 - 1]의 최대 접두사접미사 길이를 구한다. "aaabbaaaa" 그 값이 3라고 하면
    // pi[3 - 1]의 최대 접두사접미사 길이를 구한다. "aaa" 그 값이 1이라고 하면
    // pi[1 - 0]의 최대 접두사접미사 길이를 구한다. "a" pi[0] = 0
    let ret = [];
    let k = S.length;
    while(k > 0){
        ret.push(k);
        k = pi[k - 1];
    }
    return ret;
}
