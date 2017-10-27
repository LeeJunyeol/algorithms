function eatCookie(cookies) {
    var answer = 0;
    var lastCookie = cookies.shift();
    var arr = [lastCookie];

    cookies.forEach(function (element, index) {
        if (arr.length === 1) {
            if(element > arr[0]){
                arr.push(element);
            }
        } else {
            if (arr.slice(-1) < element) {
                arr.push(element);
            } else {
                for (let i = 1; i < arr.length; i++) {
                    if (arr[i] === element){
                        break;
                    }
                    if (arr[i] > element && element > lastCookie) {
                        arr.splice(i, 1, element);
                        break;
                    }
                }
            }
        }
    }, this);
    return arr.length;
}

// 아래는 테스트로 출력해 보기 위한 코드입니다.
console.log(eatCookie([245,208,379,321,184,140,764,214,750,388,278,428,652,562,124,148,409,745,567,231,369,896,174,965,586,477,124,979,374,122,521,774,6,684,862,983,4,543,287,139,549,420,2,563,648,738,404,710,780]));