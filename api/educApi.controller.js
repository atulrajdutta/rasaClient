const fs = require('fs');
const { spawn } = require('child_process');


module.exports.abroadData = async(req,res)=>{

    console.log("fsfgsa");
    const pyProg = spawn('python', ['./abroad_college.py']);

    pyProg.stdout.on('data', function(data) {

        // console.log(data.toString());
        res.send({success:true,data:data.toString()})
        // res.write(data);
        // res.end('end');
    });
    
    // try {
    //     // var responseList = []
    //     let fileContents = fs.readFileSync(process.env.modelfile+'domain.yml', 'utf8');
    //     let data = yaml.load(fileContents);
    //     let responseData = data['responses'];

    //     // responseList.push(responseData);
        
    //     // responseList.push(data['responses'])
    //     // console.log(data['responses']["utter_ask_civil_number"][0]['text']);
    //     res.send({success:true,data:responseData})
    // } catch (error) {
    //     console.log(error);
    //     res.status(400).send({success:false,error:error})

    // }
}
