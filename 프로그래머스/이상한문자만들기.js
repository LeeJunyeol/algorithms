function toWeirdCase(s) {
    var result = ""
    //함수를 완성해주세요

    var words = s.split(" ");
    var regex = /(\w)/g;
    result = words.map(function (v, i) {
        regex.lastIndex = 0;
        return v.replace(regex, function(v){
            regex.lastIndex += 1;
            return (regex.lastIndex%2 === 0)? v : v.toUpperCase();
        });
    }).join(" ");

    return result;
}

// function toWeirdCase(s) {
//     var result = ""
//     //함수를 완성해주세요

//     var words = s.split(" ");
//     result = words.map(function (v, i) {
//         var str = "";

//         for (var index = 0; index < v.length; index++) {
//             if (index % 2 === 0) {
//                 str += v[index].toUpperCase();
//             } else {
//                 str += v[index];
//             }
//         }
//         return str;
//     }).join(" ");

//     return result;
// }

// function toWeirdCase(s) {
//     //함수를 완성해주세요
//     return s.toUpperCase().replace(/(\w)(\w)/g, function (a) {
//         return a[0].toUpperCase() + a[1].toLowerCase();
//     })
// }

// 아래는 테스트로 출력해 보기 위한 코드입니다.
console.log("결과 : " + toWeirdCase("try hello world"));