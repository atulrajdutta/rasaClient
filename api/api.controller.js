const request = require('request-promise');
const fs = require('fs');
const yaml = require('js-yaml');
const { exec } = require('child_process');
module.exports.domainResponses = async(req,res)=>{
    try {
        // var responseList = []
        let fileContents = fs.readFileSync(process.cwd()+'/domain.yml', 'utf8');
        let data = yaml.load(fileContents);
        let responseData = data['responses'];
    
        // responseList.push(responseData);
        
        // responseList.push(data['responses'])
        // console.log(data['responses']["utter_ask_civil_number"][0]['text']);
        res.send({success:true,data:responseData})
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
        res.send({success:true,message:"Response Saved!"})
    } catch (error) {
        console.log(error);
        res.status(400).send({success:false,error:error})

    }
}

module.exports.trainModel = async(req,res)=>{
    try {
        exec('bash -i  '+process.cwd()+'/train.sh',
        (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
            res.send({success:true,message:"Model Trained Successfully!"})

        });
    }
    catch (error) {
        console.log(error);
        res.status(400).send({success:false,error:error})
}
}

module.exports.useTrainedModel = async(req,res)=>{
    try{
        let model = process.env.modelfile+req.body.model;
        let modelUrl= process.env.rasaApi+'model/'+req.body.model;
        console.log(modelUrl);
        await request.put(`${process.env.rasaApi}model`,
        {
            json: {
                
                    model_file: model,
                    model_server: {
                    url: modelUrl,
                    wait_time_between_pulls: 0
                    }
                
        }
        })
        res.send({success:true,message:"Model Activated"})
    }

    catch (error) {
        console.log(error);
        res.status(400).send({success:false,error:error})
}
}
