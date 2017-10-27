// 전부 -1로 초기화해 둔다.
let cache = new Array(2500).fill([]);
cache = cache.map((v) => new Array(2500).fill(-1));

// a와 b는 각각 [0, 2500) 구간 안의 정수
// 반환값은 항상 음이 아닌 정수
function someObscureFunction(a, b){
    // 기저 사례를 처음에 처리한다.
    if(constraint) return something;
    // (a, b)에 대한 답을 구한 적이 있으면 곧장 반환
    let ret = cache[a][b];
    if(ret != -1) return ret;
    
    // 여기에서 답을 계산한다.
    // code something
    return ret;
}