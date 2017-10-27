var input = [];

var rl = require('readline');
rl.createInterface(process.stdin, {})
    .on('line', function (line) {
        input.push(line.trim());
        if (2 * +input[0] === input.length - 1) {
            this.close();
        }
    }).on('close', function () {
        for (var i = 1; i <= 2 * +input[0]; i+=2){
            heights = input[i+1].trim().split(" ").map((v) => parseInt(v));
            console.log(solve(0, heights.length - 1));
        }
    });

var heights;

// 울타리 잘라내기 문제를 해결하는 분할정복 알고리즘
// h[left, right] 구간에서 찾아낼 수 있는 가장 큰 사각형의 넓이를 반환한다.
function solve(left, right){
    // 기저 사례: 판자가 하나밖에 없는 경우
    if(left === right) return heights[left];
    
    // [left, mid], [mid + 1, right]의 두 구간으로 문제를 분할한다. 소수점은 버림하자!!!
    let mid = Math.floor((left + right) / 2);

    // 분할한 문제를 각개격파
    let ret = Math.max(solve(left, mid), solve(mid+1, right));
    
    // 부분 문제 3: 두 부분에 모두 걸치는 사각형 중 가장 큰 것을 찾는다.
    let low = mid, high = mid+1;
    let height = Math.min(heights[low], heights[high]);
    
    // [mid, mid + 1]만 포함하는 너비 2인 사각형을 고려한다.
    ret = Math.max(ret, height * 2);
    
    // 사각형이 입력 전체를 덮을 때까지 확장해 나간다.
    while(left < low || high < right){
        // 항상 높이가 더 높은 쪽으로 확장한다.
        if(high < right && (low === left || heights[low - 1] < heights[high + 1])){
            ++high;
            height = Math.min(height, heights[high]);
        } else {
            --low;
            height = Math.min(height, heights[low]);
        }
        // 확장한 후 사각형의 넓이
        ret = Math.max(ret, height * (high - low + 1));
    }
    return ret;
}

// 울타리 잘라내기 문제를 해결하는 O(n^2) 알고리즘
// 판자의 높이를 담은 배열 heights[]가 주어질 때 사각형의 최대 너비를 반환한다.
// function bruteForce(heights){
//     let ret = 0;
//     let N = heights.length;
//     // 가능한 모든 left, right 조합을 순회한다.
//     for(let left = 0; left < N; ++left){
//         let minHeight = heights[left];
//         for(let right = left; right < N; ++right){
//             minHeight = Math.min(minHeight, heights[right]);
//             // 직사각형의 넓이
//             ret = Math.max(ret, (right - left + 1) * minHeight);
//         }
//     }
//     return ret;
// }

// 3
// 7
// 7 1 5 9 6 7 3
// 7
// 1 4 4 4 4 1 1
// 4
// 1 8 2 2
