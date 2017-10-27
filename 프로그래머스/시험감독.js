/*
문제
총 N개의 시험장이 있고, 각각의 시험장마다 응시자들이 있다. i번 시험장에 있는 응시자의 수는 Ai명이다.

감독관은 총감독관과 부감독관으로 두 종류가 있다. 총감독관은 한 방에서 감시할 수 있는 응시자의 수가 B명이고, 부감독관은 한 방에서 감시할 수 있는 응시자의 수가 C명이다.

각각의 시험장에 총감독관은 오직 1명만 있어야 하고, 부감독관은 여러 명 있어도 된다.

각 시험장마다 응시생들을 모두 감시해야 한다. 이 때, 필요한 감독관 수의 최소값을 구하는 프로그램을 작성하시오.

입력
첫째 줄에 시험장의 개수 N(1 ≤ N ≤ 1,000,000)이 주어진다.

둘째 줄에는 각 시험장에 있는 응시자의 수 Ai (1 ≤ Ai ≤ 1,000,000)가 주어진다.

셋째 줄에는 B와 C가 주어진다. (1 ≤ B, C ≤ 1,000,000)

출력
각 시험장마다 응시생을 모두 감독하기 위해 필요한 감독관의 최소 수를 출력한다.

예제 입력  복사
1
1
1 1
예제 출력  복사
1
예제 입력 2  복사
3
3 4 5
2 2
예제 출력 2  복사
7
예제 입력 3  복사
5
1000000 1000000 1000000 1000000 1000000
5 7
예제 출력 3  복사
714290
예제 입력 4  복사
5
10 9 10 9 10
7 20
예제 출력 4  복사
10
예제 입력 5  복사
5
10 9 10 9 10
7 2
예제 출력 5  복사
13

*/

var input = require('fs').readFileSync('data/시험감독').toString().trim().split('\n');

var n = parseInt(input[0]); // 시험장의 개수
var candidates = [];    // 각 시험장의 응시자 수
input[1].split(" ").forEach(function(v, i){
    candidates.push(parseInt(v));    
})
// 각 시험장에 총 감독관은 오직 한명. 부감독관은 여러명
var viewer = [];
input[2].split(" ").forEach(function(v, i){
    viewer.push(parseInt(v));
}); // viewer[0] 총감독관이 한 방에서 감시할 수 있는 응시자 수
// viewer[1] 부감독관이 한 방에서 감시할 수 있는 응시자 수

console.log(n);
console.log(candidates);
console.log(viewer);

// 우선 총감독관을 한명씩 배치하자.

var 감독관수 = 0;
for(var i = 0; i < n; i++){
    candidates[i] -= viewer[0];
    감독관수++;
}

for(var i = 0; i < n; i++){
    if(candidates[i] > 0){
        감독관수 += Math.ceil(candidates[i]/viewer[1]);
    }
}

// 나눠서 몫만큼 감독관수 ++

console.log(감독관수);