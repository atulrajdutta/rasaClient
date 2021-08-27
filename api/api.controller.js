const request = require('request-promise');
const fs = require('fs');
const yaml = require('js-yaml');
const { exec } = require('child_process');
require('dotenv').config();



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

// module.exports.useTrainedModel = async(req,res)=>{
//     try{
//         let model = process.env.modelfile+req.body.model;
//         let modelUrl= process.env.rasaApi+'model/'+req.body.model;
//         console.log(modelUrl);
//         await request.put(`${process.env.rasaApi}model`,
//         {
//             json: {
                
//                     model_file: model,
//                     model_server: {
//                     url: modelUrl,
//                     wait_time_between_pulls: 0
//                     }
                
//         }
//         })
//         res.send({success:true,message:"Model Activated"})
//     }

//     catch (error) {
//         console.log(error);
//         res.status(400).send({success:false,error:error})
// }
// }


module.exports.faqIntent = async(req,res)=>{
    try {
        let fileFaq = fs.readFileSync(process.cwd()+'/faq.yml', 'utf8');
        let faqData = yaml.load(fileFaq);
        let faqResponse = faqData['nlu'];

        let fileResponse = fs.readFileSync(process.cwd()+'/domain.yml', 'utf8');
        let responseData = yaml.load(fileResponse);
        let domainResponse = responseData['responses']

        let nluData = []
        let response = {success:true};
        for (var i = 0; i < faqResponse.length; i++) {
            nluData.push(faqResponse[i]['intent'].slice(4));
            // console.log(nluData);
            if (faqResponse[i]['intent'] == 'faq/'+req.body.faqName){
                
                response.faq = faqResponse[i]['examples'];
                response.res = domainResponse['utter_faq/'+req.body.faqName][0]['text'];
                }
            
        }
        if (!req.body.faqName){
            response.intents= nluData;
        }
        res.send(response)

        // responseList.push(responseData);
        
        // responseList.push(data['responses'])
        // console.log(data['responses']["utter_ask_civil_number"][0]['text']);
        
        }
    catch (error) {
            console.log(error);
            res.status(400).send({success:false,error:error})
            
    }
    }


module.exports.faqSave = async(req,res)=>{
    try {

        // fetch Response............................
        if (req.body.faqName){
        let filedomain = fs.readFileSync(process.cwd()+'/domain.yml', 'utf8');
        let domainData = yaml.load(filedomain);
        let domainName = 'utter_faq/'+req.body.faqName;
        let resText = {'text':req.body.response};        
        let domainKey = Object.keys(domainData["responses"]);
        if (domainKey.includes(domainName)){
            domainData['responses'][domainName][0]['text'] = req.body.response;
        }
        else{
        domainData["responses"][domainName] = [resText];
        }

        // Fetch Faq.....................................

        let fileFaq = fs.readFileSync(process.cwd()+'/faq.yml', 'utf8');
        let faqData = yaml.load(fileFaq);
        let faqName = 'faq/'+req.body.faqName;
        let faqs = {'intent':faqName};
       
        let faqKey = faqData["nlu"];
        let faqList = [];

        for (var i = 0; i < faqKey.length; i++) {
            faqList.push(faqKey[i]['intent']);
            if (faqKey[i]['intent'] == 'faq/'+req.body.faqName){
                faqKey[i]['intent'] = 'faq/'+req.body.faqName
                faqKey[i]["examples"] = req.body.faqs
            }
        }
        if (!faqList.includes(faqName))
        {
            faqs.examples = req.body.faqs;
            faqData["nlu"].push(faqs);
        // console.log("yourfaq",faqData)           
        }
        
        //Write faqs to faq.yml.................................
        
        fs.writeFile(process.cwd()+'/faq.yml', yaml.dump(faqData), (err) => {
            if (err) {
                console.log("Can not write to the nlu file")
                console.log(err);
            }
        });

        //Write Response to domain.yml.......................... 

        fs.writeFile(process.cwd()+'/domain.yml', yaml.dump(domainData), (err) => {
            if (err) {
                console.log("Can not write to the domain file")
                console.log(err);
            }
        });
        }

        res.send({success:true,message:"Response Saved!"})
    } catch (error) {
        console.log(error);
        res.status(400).send({success:false,error:error})

    }
}