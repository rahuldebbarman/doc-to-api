const config = require('../config');
const glob = require('glob');
const path = require('path');
console.log(
    glob.sync(
        path.join(
            config.dataset, config.glob.dom
        )
    )
);

