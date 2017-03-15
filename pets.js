let fs = require('fs');
let path = require('path');
let petsPath = path.join(__dirname, 'pets.JSON');
let args = process.argv;
let subCommand = args[2];

if (!args[2]) {
    console.error('Usage: node pets.js [read | create | update | destroy]');
    process.exit(1);
}

fs.readFile(petsPath, 'utf8', (err, petsData) => {
  let parsedPets = JSON.parse(petsData);
  if (subCommand === 'read') {
    if (args.length === 3) {
      console.log(parsedPets);
    }

    else if (args[3] >= 0 && args[3] < parsedPets.length) {
      console.log(parsedPets[args[3]]);
    }
  }
})
