function numberBlock(begin, end) {
    var answer = [];
    for(let i = begin; i <= end; i++){
        answer.push(divisors(i));
    }
	return answer;
}

console.log(numberBlock(99999999999990, 100000000000000))

function divisors(x) {
    var result = [];
    var n = 0;
    if(x > 10000000){
        n = 10000000;
    } else {
        n = x;
    }
    for (var a = n; a >= 1; --a) {
        if (x % a == 0) {
            return a;
        }
    }
    return 1;
};

/*
function numberBlock(begin, end) {
    var answer = [];

  for(var i = begin; i <= end; i++) {
    if(i < 10000000) {
      answer.push(i);
    } else {
        for(var j = 2; j < 10000000; j++) {
        if(i % j == 0) {
            answer.push(j > 10000000/j ? j : 10000000/j); 
        }
      } 
    }
  }

    return answer;
}

console.log(numberBlock(99999999999990, 100000000000000))
*/