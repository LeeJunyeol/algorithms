var suffixArrayModule = require('./접미사배열.js');

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

// str의 서로 다른 부분 문자열의 수를 센다.
function countSubstrings(str) {
    let suffixArray = suffixArrayModule.getSuffixArray(str);

    let ret = 0;
    let n = str.length;
    for (let i = 0; i < suffixArray.length; ++i) {
        let cp = 0;
        if (i > 0) cp = commonPrefixLength(str, suffixArray[i - 1], suffixArray[i]);

        // suffixArray[i]의 (n-suffixArray[i])개의 접두사들 중에서 cp개는 중복이다.
        ret += n - suffixArray[i] - cp;
    }
    return ret;
}

console.log(countSubstrings("banana"));