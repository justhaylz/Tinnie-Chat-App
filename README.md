# Tinnie Chat AI

Tinnie Chat App is a conversational application designed to help users choose the best insurance policy based on their needs. The app interacts with users, asks relevant questions, and provides recommendations for insurance products.

## Getting Started

These instructions will help you set up and run the Tinnie Chat App on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Google Generative AI](https://cloud.google.com/generative-ai)
- [Docker](https://www.docker.com/)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/tinnie-chat-app.git
   cd tinnie-chat-app
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Sure, here is the updated excerpt from your README.md file with instructions for setting up the Gemini API key:

```markdown
npm install
   ```

3. Set up your Gemini API credentials:

- Obtain your API key from the Gemini platform.
- Set the `GEMINI_API_KEY` environment variable to your API key:

     ```sh
     export GEMINI_API_KEY="your-gemini-api-key"
     ```

### Running the App

In the project directory, you can run:

#### `npm start`

Runs the backend server in the development mode.\
Open [http://localhost:5000](http://localhost:5000) to interact with the API.

#### `npm test`

Launches the test runner in the interactive watch mode.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles the app in production mode and optimizes the build for the best performance.

### API Endpoints

- **POST /chat**: Handles user messages and returns appropriate responses based on the conversation context.

### Example Request

```sh
curl -X POST http://localhost:5000/chat -H "Content-Type: application/json" -d '{
  "message": "I need insurance for my car",
  "context": {
    "step": "opt-in"
  }
}'
```

### Example Response

```json
{
  "reply": "I’m Tinnie. I help you to choose an insurance policy. May I ask you a few personal questions to make sure I recommend the best policy for you?",
  "context": {
    "step": "questions"
  }
}
```

## Built With

- [Express](https://expressjs.com/) - The web framework used for the backend
- [Google Generative AI](https://cloud.google.com/generative-ai) - For generating text responses
- [React](https://reactjs.cpm) - The frontend library used
- [Node](https://nodejs.com) - The backend runtime environment

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## Acknowledgments

- Romesh for always being a trooper with our projects

# GitHub
