// function getSuffixArrayNaive(str) {
//     let perm = new Array(str.length).fill().map((v, i) => i);

//     perm.sort(function (a, b) {
//         return str.slice(a) > str.slice(b) ? 1 : 0;
//     });

//     return perm;
// }

//console.log(getSuffixArray("alohomora"));

module.exports = (function () {
    function getSuffixArray(str) {
        let n = str.length;
        let t = 1;
        let group = new Array(n).fill().map((v, i) => str[i].charCodeAt(0));
        group.push(-1);

        let groupObj = {
            group: group,
            t: t
        }

        let perm = new Array(n).fill().map((v, i) => i);
        for (groupObj.t = 1; groupObj.t < n; groupObj.t *= 2) {
            perm.sort(comparator.bind(groupObj));
            if (groupObj.t >= n) break;

            let newGroup = new Array(n).fill(0);
            newGroup.push(-1);
            newGroup[perm[0]] = 0;
            for (let i = 1; i < n; ++i) {
                if (comparator.call(groupObj, perm[i - 1], perm[i]) < 0) {
                    newGroup[perm[i]] = newGroup[perm[i - 1]] + 1;
                } else {
                    newGroup[perm[i]] = newGroup[perm[i - 1]];
                }
            }
            groupObj.group = newGroup;
        }

        return perm;
    }

    function comparator(a, b) {
        let group = this.group;
        let t = this.t;
        if (group[a] != group[b]) {
            return group[a] - group[b];
        } else {
            return group[a + t] - group[b + t];
        }
    }

    return {
        getSuffixArray: getSuffixArray
    }
})();