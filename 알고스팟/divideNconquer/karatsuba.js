/**
 * Karatsuba Multiplication
 * @param  {Number} x - first number
 * @param  {Number} y - second number
 * @return {Number} Multiply of x and y
 */

module.exports.karatsuba = karatsuba;
module.exports.multiply = multiply;

 // 두 큰 수를 곱하는 O(n^2) 시간 알고리즘
function multiply(a, b){
    // 입력이 숫자 문자열인 경우 // "123" => [3, 2, 1]
    a = numStrToReverseNumArr(a);
    b = numStrToReverseNumArr(b);

    let c = new Array(a.length + b.length + 1).fill(0);
    for(let i = 0; i < a.length; ++i){
        for(let j = 0; j < b.length; ++j){
            c[i+j] += a[i] * b[j];
        }
    }
    normalize(c);
    return c;
}

// 카라츠바의 빠른 정수 곱셈 알고리즘
function karatsuba(a, b) {
    let an = a.length, bn = b.length;
    // a가 b보다 짧을 경우 둘을 바꾼다.
    if(an < bn) return karatsuba(b, a);

    // 입력이 숫자 문자열인 경우
    a = numStrToReverseNumArr(a);
    b = numStrToReverseNumArr(b);
    
    // 기저사례: a나 b가 비어 있는 경우
    if(an === 0 || bn === 0) return;
    
    // 기저사례: a가 비교적 짧은 경우 O(n^2) 곱셈으로 변경한다.
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

function numStrToReverseNumArr(numStr){
    return (typeof numStr === "string")? numStr.split("").map((v) => parseInt(v)).reverse() : numStr;
}

// num[]의 자릿수 올림을 처리한다.
function normalize(num){
    num.push(0);
    // 자릿수 올림을 처리한다.
    for(let i = 0; i < num.length - 1; ++i){
        if(num[i] < 0){
            let borrow = parseInt((Math.abs(num[i]) + 9) / 10);
            num[i+1] -= borrow;
            num[i] += borrow * 10;
        } else {
            num[i+1] += parseInt(num[i] / 10);
            num[i] %= 10;
        }
    }
    while(num.length > 1 && parseInt(num.slice(-1)) === 0) {
        num.pop();
    }
}

// a += b * (10^k)를 구현한다.
function addTo(a, b, k){
    ensureSize(a, Math.max(a.length, b.length + k));
    for(let i = 0; i < b.length; ++i){
        a[i+k] += b[i];
    }
    normalize(a);
    return a;
}

// a -= b;를 구현한다. a >= b를 가정한다.
function subFrom(a, b){
    ensureSize(a, Math.max(a.length, b.length) + 1);
    for(let i = 0; i < b.length; ++i){
        a[i] -= b[i];
    }
    normalize(a);
    return a;
}

function ensureSize(list, size){
    while(list.length < size){
        list.push(0);
    }
}


