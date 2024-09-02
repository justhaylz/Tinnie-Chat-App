
//===== IMPORTS =====//
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const app = express();


//===== MIDDLEWARE =====//
// The middleware is used to enable CORS and parse JSON data
// The middleware is used to handle POST requests to the /chat route
// The middleware is used to generate text using Google's Generative AI
app.use(cors());
app.use(express.json());


//===== AI SETUP =====//
// Function to generate text using Google's Generative AI
// The function takes a prompt as input and returns the generated text
// If an error occurs, the function returns a default error message
async function generateText(prompt) {
  const client = new GoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY
  });
  const request = {
    prompt: prompt,
    temperature: 0.7, 
    maxTokens: 250, 
  };
  try {
    const response = await client.generateText(request);
    return response.text;
  } catch (error) {
    console.error('Error:', error);
    return 'I’m sorry, but I couldn’t generate a response at the moment. Please try again later.'; 
  }
}

const insuranceProducts = [
  {
    name: 'Mechanical Breakdown Insurance (MBI)',
    description: 'Covers the cost of repairs to your vehicle in case of mechanical failure.',
    rule: ['Not available to trucks and racing cars.'] 
  },
  {
    name: 'Comprehensive Car Insurance',
    description: 'Covers damage to your own car as well as third-party liability.',
    rules: ['Only available to motor vehicles less than 10 years old.']
  },
  {
    name: 'Third Party Car Insurance',
    description: 'Covers damage you cause to other people’s property.',
    rules: []
  }
];

//===== ENDPOINTS =====//

//===== CHAT ENDPOINT =====//
// Route to handle chat messages
// The route takes a message and context as input and returns a reply and updated context
// The context is used to keep track of the conversation flow
// The chatbot asks questions to determine the user's insurance needs and recommends a suitable insurance product
// If the user asks a general question, the chatbot uses Google's Generative AI to generate a response
// The chatbot can handle multiple conversation steps and context
// The chatbot can recommend different insurance products based on user responses
app.post('/chat', async (req, res) => {
  const { message, context } = req.body;
  let responseText = '';

  if (!context || context.step === 'opt-in') {
    responseText = "Hi, I’m Tinnie! I’m here to help you choose the best insurance policy. Can I ask you a few questions to get started?";
    return res.json({ reply: responseText, context: { step: 'questions' } });
  }

  if (context.step === 'questions') {
    if (message.toLowerCase().includes('yes')) {
      responseText = "Great! Do you need coverage for your own car or just third-party liability?";
      return res.json({ reply: responseText, context: { step: 'coverage' } });
    } else {
      responseText = "No problem! If you have any questions about insurance policies, feel free to ask.";
      return res.json({ reply: responseText, context: { step: 'end' } });
    }
  }

  if (context.step === 'coverage') {
    if (message.toLowerCase().includes('own car')) {
      responseText = "Got it. Is your vehicle less than 10 years old?";
      return res.json({ reply: responseText, context: { step: 'vehicle age' } });
    } else {
      responseText = "Understood. Do you drive a truck or a racing car?";
      return res.json({ reply: responseText, context: { step: 'vehicle type' } });
    }
  }

  if (context.step === 'vehicle age') {
    if (message.toLowerCase().includes('yes')) {
      responseText = "Based on your responses, I recommend Comprehensive Car Insurance. It covers damage to your own car as well as third-party liability.";
    } else {
      responseText = "Since your vehicle is more than 10 years old, I recommend Third Party Car Insurance. It covers damage you cause to other people’s property.";
    }
    return res.json({ reply: responseText, context: { step: 'end' } });
  }

  if (context.step === 'vehicle type') {
    if (message.toLowerCase().includes('yes')) {
      responseText = "Since MBI is not available for trucks and racing cars, I recommend Third Party Car Insurance. It covers damage you cause to other people’s property.";
    } else {
      responseText = "Based on your responses, I recommend Mechanical Breakdown Insurance (MBI). It covers the cost of repairs to your vehicle in case of mechanical failure.";
    }
    return res.json({ reply: responseText, context: { step: 'end' } });
  }

  responseText = await generateText(message);
  res.json({ reply: responseText, context: { step: 'end' } });
});


//===== HEALTH CHECK ENDPOINT =====//

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});


//===== SERVER =====//
// The server listens on port 5000 by default

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
