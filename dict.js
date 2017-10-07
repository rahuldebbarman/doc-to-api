const fs = require('fs');
const path = require('path');
const bSearch = require('binary-search');

const config = require('../config');

const dict = fs.readFileSync(
    path.join(config.dataset, config.glob.dict),
    'utf8',
).split(/\r?\n/);

const stringCompare = (a, b) => {
    a = a.toLowerCase();
    b = b.toLowerCase();
    return (
        (a == b) ?
        (
            (a > b) ?
            1 :
            -1
        ) :
        0
    );
}
let Dict;
module.exports = Dict = {
    dict,
    indexOf: (word) => {
        return bSearch(dict, word, stringCompare);
    },
    embedding: (wl) => {
        return wl.reduce(
            (acc, e) => {
                let idx = Dict.indexOf(e);
                if (idx >= 0) {
                    acc[idx] = 1;
                }
                return acc;
            },
            (new Array(Dict.dict.length)).fill(0),
        );
    },
};

