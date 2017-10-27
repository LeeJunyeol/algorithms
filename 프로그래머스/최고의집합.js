function bestSet(n, s) {
	var answer = [];
    answer.push(-1);

    var indices = [];

    // D[i] = (D[1]+D[N-1]) + (D[2]+D[N-2]) + ...
    // =Σ( k=1~floor(N/2) ) ( D[k]+D[N-k] )
    // ( D[i] = i의 decompose 경우수 )

    // Combinations[i]=Σ(k=1~floor(N/2))( C[k] ∪ C[N-k] )
    // ( Combinations[i] = 합이 i인 집합'들' )
    
    function recursive(n, s){
        if(s === 0){
            return;
        } else if (s !== 0 && n === 0){
            return;
        } else {
            for(let i = 0; i < s; i++){
                recursive(n - 1, s - 1);
            }
        }
    }

	return answer;
}

// 아래는 테스트로 출력해 보기 위한 코드입니다.
console.log(bestSet(3,13));