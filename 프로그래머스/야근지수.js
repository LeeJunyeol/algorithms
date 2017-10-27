function noOvertime(no, works) {
    var result = 0;
    // 야근 지수를 최소화 하였을 때의 야근 지수는 몇일까요?
    // 야근지수 = 남은 일의 작업량을 제곱하여 더한 값
    // 한 시간 동안 하나를 작업량 1만큼 처리할 수 있다.

    // 탐색....
    // 가장 큰 값을 1 뺀다.
    // 반복
    for (var i = 0; i < no; i++) {
        works.sort(function(a, b){
            return a - b;
        });
        works.push(works.pop() - 1);
    }

    // reduce
    // 값을 누산한다.
    // reduce(callback, 초기값);
    return works.reduce(function(result, x){
        return result + Math.pow(x, 2);
    }, 0);
}

console.log(noOvertime(4, [4, 3, 3]));
console.log(noOvertime(55,[18,17,9,12,16,8,12]));



/*
야근 지수
회사원인 수민이는 많은 일이 쌓여 있습니다. 
수민이는 야근을 최소화하기 위해 남은 일의 작업량을 숫자로 메기고, 일에 대한 야근 지수를 줄이기로 결정했습니다. 
야근 지수는 남은 일의 작업량을 제곱하여 더한 값을 의미합니다. 
수민이는 1시간 동안 남은 일 중 하나를 골라 작업량 1만큼 처리할 수 있습니다. 
수민이의 퇴근까지 남은 N 시간과 각 일에 대한 작업량이 있을 때, 
noOvertime 함수를 제작하여 수민이의 야근 지수를 최소화 한 결과를 출력해 주세요. 
예를 들어, N=4 일 때, 남은 일의 작업량이 [4, 3, 3] 이라면 
야근 지수를 최소화하기 위해 일을 한 결과는 [2, 2, 2]가 되고 
야근 지수는 4 + 4 + 4 = 12가 되어 12를 반환해 줍니다.
*/