const fs = require('fs');
// const yaml = require('js-yaml');

// try {
//     let fileContents = fs.readFileSync('/home/adutta/rasa_practice/config.yml', 'utf8');
//     let data = yaml.load(fileContents);

//     console.log(data);
// } catch (e) {
//     console.log(e);
// }
const readYaml = require('read-yaml');
var config = readYaml.sync('/home/adutta/rasa_practice/config.yml');
console.log(config)