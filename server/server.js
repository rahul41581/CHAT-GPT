import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration , OpenAIApi } from 'openai';

//1)using dotenv variable 
dotenv.config();

//2)Strat with confriguation
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

//3)Initialise Express Work
const app = express();
app.use(cors());
app.use(express.json());

app.get('/' , async(req , res)=>{
    res.status(200).send({
        message:'welcome to ai world 🤖',
    })
});

//4)routing
app.post('/',async (req,res) => {
    //adding Try and Catch block
    try{
        const prompt = req.body.prompt;
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt:`${prompt}`,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });
        res.status(200).send({
            bot: response.data.choices[0].text
        })
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({ error })
    }
})
//5)app listen everytime
app.listen(5000 , ()=> console.log('server is running on port http://localhost:5000'));
