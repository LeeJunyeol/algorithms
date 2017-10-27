//const k = require('./karatsuba.js');

// console.log(karatsuba.karatsuba("123456789123456789123456789123456789123456789123456789123456789123456789123456789", 
// "123456789123456789123456789123456789123456789123456789123456789123456789123456789").reverse().join(""));

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
            console.log(hugs(input[i], input[i+1]));
        }
    });

function hugs(members, fans){
    let n = members.length, m = fans.length;
    let A = members.split("").map((v) => v === 'M'? 1 : 0);
    let B = fans.split("").reverse().map((v) => v === 'M'? 1 : 0);

    let C = karatsuba(A, B);
    let allHugs = 0;
    for(let i = n-1; i < m; ++i){
        if(C[i]===0) ++allHugs;
    }
    return allHugs;
}

 // 두 큰 수를 곱하는 O(n^2) 시간 알고리즘
 function multiply(a, b){
    let c = new Array(a.length + b.length + 1).fill(0);
    for(let i = 0; i < a.length; ++i){
        for(let j = 0; j < b.length; ++j){
            c[i+j] += a[i] * b[j];
        }
    }
    return c;
}

// 카라츠바의 빠른 정수 곱셈 알고리즘
function karatsuba(a, b) {
    let an = parseInt(a.length), bn = parseInt(b.length);
    // a가 b보다 짧을 경우 둘을 바꾼다.
    if(an < bn) return karatsuba(b, a);

    // 기저사례: a나 b가 비어 있는 경우
    if(an === 0 || bn === 0) return [];
    
    if(an <= 50) return multiply(a, b);
    
    let half = parseInt(an / 2);
    
    // a와 b를 밑에서 half 자리와 나머지로 분리한다.
    let a0 = a.slice(0, half);
    let a1 = a.slice(half, a.length);
    let b0 = b.slice(0, Math.min(b.length, half));
    let b1 = b.slice(Math.min(b.length, half), b.length);

    // z2 = a1 * b1
    let z2 = karatsuba(a1, b1);
    // z0 = a0 * b0
    let z0 = karatsuba(a0, b0);
    // a0 = a0 + a1; b0 = b0 + b1
    addTo(a0, a1, 0); addTo(b0, b1, 0);
    // z1 = (a0 * b0) - z0 - z2
    let z1 = karatsuba(a0, b0);
    subFrom(z1, z0);
    subFrom(z1, z2);
    // ret = z0 + z1 * 10^half + z2 * 10^(half^2)
    let ret = [];
    addTo(ret, z0, 0);
    addTo(ret, z1, half);
    addTo(ret, z2, half + half);

    return ret;
}

// a += b * (10^k)를 구현한다.
function addTo(a, b, k){
    ensureSize(a, Math.max(a.length, b.length + k));
    for(let i = 0; i < b.length; ++i){
        a[i+k] += b[i];
    }
    return a;
}

// a -= b;를 구현한다. a >= b를 가정한다.
function subFrom(a, b){
    ensureSize(a, Math.max(a.length, b.length) + 1);
    for(let i = 0; i < b.length; ++i){
        a[i] -= b[i];
    }
    return a;
}

function ensureSize(list, size){
    while(list.length < size){
        list.push(0);
    }
}

// console.log(hugs("FFFMMM", "MMMFFF"));
// console.log(hugs("FFFFF", "FFFFFFFFFF"));
// console.log(hugs("FFFFM", "FFFFFMMMMF"));
// console.log(hugs("MFMFMFFFMMMFMFMFMFMFFFMMMFMFMFMFMFFFMMMFMFMFMFMFFFMMMFMFMFMFMFFFMMMFMFMFMFMFFFMMMFMFMFMFMFFFMMMFMFMFMFMFFFMMMFMFMFMFMFFFMMMFMFMFMFMFFFMMMFMFMFMFMFFFMMMFMFMFMFMFFFMMMFMFMFMFMFFFMMMFMFMFMFMFFFMMMFMFMFMFMFFFMMMFMFMFMFMFFFMMMFMF", "MMFFFFFMFFFMFFFFFFMFFFMFFFFMFMMFFFFFFFMMFFFFFMFFFMFFFFFFMFFFMFFFFMFMMFFFFFFFMMFFFFFMFFFMFFFFFFMFFFMFFFFMFMMFFFFFFF"));


// 4
// FFFMMM
// MMMFFF
// FFFFF
// FFFFFFFFFF
// FFFFM
// FFFFFMMMMF
// FFFMMMFFFMMMFFFMMMFFFMMMFFFMMMFFFMMMFFFMMMFFFMMMFFFMMMFFFMMMFFFMMMFFFMMMFFFMMMFFFMMMFFFMMMFFFMMMFFFMMMFFFMMMFFFMMMFFFMMMFFFMMMFFFMMM
// MMMFFFMMMFFFMMMFFFMMMFFFMMMFFFMMMFFFMMMFFFMMMFFFMMMFFFMMMFFFMMMFFFMMMFFFMMMFFFMMMFFFMMMFFFMMMFFFMMMFFFMMMFFFMMMFFFMMMFFFMMMFFFMMMFFF