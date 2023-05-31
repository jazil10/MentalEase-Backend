const dotenv = require("dotenv");
dotenv.config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const ChatbotWork = async (req, res) => {
    try {
        const { text } = req.body;
        const { data } = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: `Answer question similar to how a mental health concerned friend would.
          Me: 'Hello?'
          Friend: 'Hello! I am your friend. How are you?'
          Me: 'I am feeling low?'
          Friend: 'Its okay friend. Breathe. Is there anything wrong you can tell me about it, i am here to listen'
          Me: ${text}`,
          max_tokens: 300,
          temperature: 0.7,
        });
        if (data) {
          if (data.choices[0].text) {
            return res.status(200).json(data.choices[0].text);
          }
        }
      } catch (err) {
        console.log(err);
        return res.status(404).json({
          message: err.message,
        });
      }
  };
  
  module.exports = {ChatbotWork};