#!/usr/bin/env node

//const fs = require('fs');
// const util = require('util');

// Method 1

//const lstat = util.promisify(fs.lstat);

fs.readdir(process.cwd(), async (err, filenames) => {
    if(err) {
        console.log(err);
    }

    const statPromises = filenames.map(filename => {
        return lstat(filename);
    });

    const allStats = await Promise.all(statPromises);

    for(let stats of allStats) {
        const index = allStats.indexOf(stats);
        
        console.log(filenames[index].stats.isFile());_
    }
});

// const lstat = fs.promises.lstat;

const lstat = (filename) => {
    return new Promise((resolve, reject) => {
        fs.lstat(filename, (err, stats) => {
            if(err) {
                reject(err)
            }
            resolve(stats);
        });
    });
};