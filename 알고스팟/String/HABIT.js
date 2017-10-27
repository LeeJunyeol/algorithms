var suffixArrayModule = require('./접미사배열')

function longestFrequent(k, str){
    let suffixArray = suffixArrayModule.getSuffixArray(str);
    let ret = 0;
    for(let i = 0; i + k <= str.length; ++i){
        ret = Math.max(ret, commonPrefixLength(str, suffixArray[i], suffixArray[i + k - 1]));
    }
    return ret;
}

// str[i...]와 str[j...]의 공통 접두사의 최대 길이를 계산한다.
function commonPrefixLength(str, i, j) { // i: 이전 인덱스, j: 현재 인덱스
    let k = 0;
    while (i < str.length && j < str.length && str[i] === str[j]) {
        ++i;
        ++j;
        ++k;
    }
    return k;
}

console.log(longestFrequent(3, "banana"));