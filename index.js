#!/usr/bin/env node

const fs = require('fs');
const chalk = require('chalk');
const path = require('path');
// const util = require('util');

// Method 1

//const lstat = util.promisify(fs.lstat);
const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, filenames) => {
    if(err) {
        console.log(err);
    }

    const statPromises = filenames.map(filename => {
        return lstat(path.join(targetDir, filename));
    });

    const allStats = await Promise.all(statPromises);

    for(let stats of allStats) {
        const index = allStats.indexOf(stats);
        
        if(stats.isFile()) {
            console.log(filenames[index])
        } else {
            console.log(chalk.blue(filenames[index]));
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