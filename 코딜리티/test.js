// This is a demo task.

// Write a function:

// function solution(A);

// that, given an array A of N integers, returns the smallest positive integer (greater than 0) that does not occur in A.

// For example, given A = [1, 3, 6, 4, 1, 2], the function should return 5.

// Given A = [1, 2, 3], the function should return 4.

// Given A = [−1, −3], the function should return 1.

// Assume that:

// N is an integer within the range [1..100,000];
// each element of array A is an integer within the range [−1,000,000..1,000,000].
// Complexity:

// expected worst-case time complexity is O(N);
// expected worst-case space complexity is O(N), beyond input storage (not counting the storage required for input arguments).
// Elements of input arrays can be modified.

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(A) { // write your code in JavaScript (Node.js 6.4.0)
    // 비어있는 수 중 가장 작은 수 찾기
    // 꽉 차 있다면 그 다음으로 큰 수
    // 음수는 제낀다. 음수는 0이라고 생각하자.
    let nums = Array.from(new Array(999999), (val, index) => index + 1);
    //console.log(nums);
    for (let i = 0; i < A.length; i++) {
        let idx = nums.indexOf(A[i]);
        if (idx != -1) {
            nums.splice(idx, 1);
        }
    }
    return nums.shift();
}