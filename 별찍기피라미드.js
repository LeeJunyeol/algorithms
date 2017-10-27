function makeStarPyramid(){
    let strArray = new Array(5).fill(" ");
    let start = parseInt(5/2);
    let star = "*";
    let count = 1;
    for(let i = 0; i < 3; ++i){
        if(count != 1) star = star.concat("**");
        strArray.splice(start, count, star);
        console.log(strArray.join(""));
        --start;
        count += 2;
    }
}

makeStarPyramid();