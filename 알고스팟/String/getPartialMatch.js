function getPartialMatchNaive(str){
    let pi = new Array(str.length).fill(0);

    // a b a a   
    //   a b a    str[1] = b str[0] = a false  ==> ++i
    //     a b    str[2] = a str[0] = a true
    //            str[3] = a str[1] = b false  ==> ++i
    //       a    str[3] = a str[0] = a false 
    //            str[4] 범위 초과
    for(let i = 1; i < str.length; i++){
        for(let j = 0; i + j < str.length; j++){
            if(str[i + j] != str[j]) break; // 옆으로 같이 이동하는 거구나.
            
            // j + 1 글자가 서로 대응되었다.
            pi[i + j] = Math.max(pi[i + j], j + 1);
        }
    }

    return pi;
}

function getPartialMatch(str){
    let pi = new Array(str.length).fill(0);
    
    let begin = 1, matched = 0;
    while(begin + matched < str.length){
        if(str[begin + matched] === str[matched]){
            ++matched;
            pi[begin + matched - 1] = matched;
        } else {
            if(matched === 0){
                ++begin;
            } else {
                begin += matched - pi[matched - 1];
                matched = pi[matched - 1];
            }
        }
    }

    return pi;
}