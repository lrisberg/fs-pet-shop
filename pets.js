'use strict';

const fs = require('fs');
const path = require('path');

const node = path.basename(process.argv[0]);
const file = path.basename(process.argv[1]);
const command = process.argv[2];
const number = process.argv[3];

if (command === 'read') {
  fs.readFile('pets.json', 'utf8', (err, data) => {
    data = JSON.parse(data);

    if (err) {
      throw err;
    }
    else if (number < 0 || number > data) {
      console.log(`USAGE node pets.js read INDEX`);
      process.exit(1);
    }
    console.log(data[number]);
  });
}
else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1)
}
