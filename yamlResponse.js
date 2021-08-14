const fs = require('fs');
const yaml = require('js-yaml');

try {
    let fileContents = fs.readFileSync('./domain.yml', 'utf8');
    let data = yaml.load(fileContents);

    console.log(data['responses']);
} catch (e) {
    console.log(e);
}

