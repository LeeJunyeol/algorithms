function setAlign(n, k) {
    var answer = [];
    var people = new Array(n).fill().map((v, i) => i+1);

    var combinations = [];
    var indices = [];
    var count = 0;
    function run(level, start) {
        for (var i = 0; i < people.length; i++) {
            if (!indices[i]) {
                indices[i] = true;
                combinations[level] = people[i];
                if (level < n - 1) {
                    run(level + 1, i + 1);
                } else {
                    count++;
                    if(count === k){
                        answer = combinations.slice();
                        return;
                    }
                }
                indices[i] = false;
            }
        }
    }
    run(0, 0);
    return answer;
}

// 아래는 테스트로 출력해 보기 위한 코드입니다.
console.log(setAlign(11,10372088));