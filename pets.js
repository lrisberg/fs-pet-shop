'use strict';

const fs = require('fs');
const path = require('path');

const node = path.basename(process.argv[0]);
const file = path.basename(process.argv[1]);
const cmd = process.argv[2];
const num = process.argv[3];

if (cmd === 'read') {
  fs.readFile('pets.json', 'utf8', (err, data) => {
    data = JSON.parse(data);

    if (err) {
      throw err;
    }
    else if (num < 0 || num > data.length) {
      console.log(`USAGE node pets.js read INDEX`);
      process.exit(1);
    }
    else if (num === undefined) {
      console.log(data);
    }
    else {
      console.log(data[num]);
    }
  });
}
else if (cmd === 'create') {
  fs.readFile('pets.json', 'utf8', function(readErr, data) {
    if (readErr) {
      throw readErr;
    }

    var pets = JSON.parse(data);
    let newPet = {
      'age': parseInt(process.argv[3]),
      'kind': process.argv[4],
      'name': process.argv[5]
    }
    if (process.argv.length !== 6) {
      console.error(`Usage: node pets.js create AGE KIND NAME`);
      process.exit(1);
    }

    pets.push(newPet);
    console.log(newPet);
    var petsJSON = JSON.stringify(pets);

    fs.writeFile('pets.json', petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }
    });
  });
}
else if (cmd === 'update') {
  fs.readFile('pets.json', 'utf8', function(readErr, data) {
    if (readErr) {
      throw readErr;
    }

    var pets = JSON.parse(data);

    let updatedPet = {
      'age': parseInt(process.argv[4]),
      'kind': process.argv[5],
      'name': process.argv[6]
    }

    if (process.argv.length !== 7) {
      console.error(`Usage: node pets.js update INDEX AGE KIND NAME`);
      process.exit(1);
    }

    pets[process.argv[3]] = updatedPet;
    var petsJSON = JSON.stringify(pets);

    fs.writeFile('pets.json', petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }
    });
  });
}



else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1)
}
