const request = require('request-promise');
const fs = require('fs');
const yaml = require('js-yaml');

module.exports.domainResponses = async(req,res)=>{
    try {
        let fileContents = fs.readFileSync(process.cwd()+'/domain.yml', 'utf8');
        let data = yaml.load(fileContents);
    
        console.log(data['responses']["utter_ask_civil_number"][0]['text']);
        res.send({success:true,data:data['responses']})
    } catch (error) {
        console.log(error);
        res.status(400).send({success:false,error:error})

    }
}

module.exports.domainResponsesSave = async(req,res)=>{
    try {
        let fileContents = fs.readFileSync(process.cwd()+'/domain.yml', 'utf8');
        let data = yaml.load(fileContents);
        let responseName = req.body.responseName;   
        console.log(responseName);
        data['responses'][responseName][0]['text'] = req.body.newResponse;
    
        fs.writeFile(process.cwd()+'/domain.yml', yaml.dump(data), (err) => {
            if (err) {
                console.log("Can not write to the file")
                console.log(err);
            }
        });
        res.send({success:true,data:data['responses']})
    } catch (error) {
        console.log(error);
        res.status(400).send({success:false,error:error})

    }
}