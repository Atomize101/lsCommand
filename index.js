#!/usr/bin/env node

const fs = require('fs');
const chalk = require('chalk');
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
        
        if(stats.isFile()) {
            console.log(filenames[index])
        } else {
            console.log(chalk.green(filenames[index]));
        }
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