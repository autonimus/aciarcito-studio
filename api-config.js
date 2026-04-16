const axios = require('axios');

const APIs = {
  Groq: 'https://api.groq.com',
  Gemini: 'https://api.gemini.com',
  SambaNova: 'https://api.sambanova.ai',
  Cerebras: 'https://api.cerebras.net',
  DeepSeek: 'https://api.deepseek.ai',
  ElevenLabs: 'https://api.elevenlabs.io',
  Cohere: 'https://api.cohere.ai',
  Cloudflare: 'https://api.cloudflare.com'
};

const fetchData = async (apiName, endpoint) => {
  const url = `${APIs[apiName]}${endpoint}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${apiName}: ${error.message}`);
    // Fallback mechanism - return a safe default value or previous data
    return { error: `Failed to fetch from ${apiName}` };
  }
};

// Example function to test connections
const testConnections = async () => {
  for (const apiName in APIs) {
    try {
      await fetchData(apiName, '/status');
      console.log(`${apiName} is reachable.`);
    } catch (error) {
      console.error(`${apiName} is not reachable: ${error}`);
    }
  }
};

module.exports = { fetchData, testConnections };