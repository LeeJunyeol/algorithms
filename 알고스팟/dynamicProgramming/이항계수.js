/*
이항계수 공식
bino(n, r) = bino(n-1, r-1) + bino(n-1 r)
*/

let cache = new Array(30).fill([]);
cache = cache.map((v) => new Array(30).fill(-1));

function bino(n, r){
    // 기저 사례
    if(r === 0 || n === r) return 1;
    // -1이 아니라면 한 번 계산했던 값이니 곧장 반환
    if(cache[n][r] != -1){
        return cache[n][r];
    }
    // 직접 계산한 뒤 배열에 저장
    return cache[n][r] = bino(n-1, r-1) + bino(n-1, r);
}

console.log(bino(8, 4));
console.log(cache);
