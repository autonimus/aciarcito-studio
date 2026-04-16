// api-handler.js

const axios = require('axios');

const APIs = {
    Groq: 'https://api.groq.com',
    Gemini: 'https://api.gemini.com',
    DeepSeek: 'https://api.deepseek.com',
    SambaNova: 'https://api.sambanova.com',
    Cerebras: 'https://api.cerebras.com',
    Cohere: 'https://api.cohere.com',
    ElevenLabs: 'https://api.elevenlabs.com',
    Cloudflare: 'https://api.cloudflare.com',
};

// Function to check network connectivity
const checkNetworkConnectivity = async () => {
    try {
        await axios.get('https://www.google.com');
        return true;
    } catch (error) {
        return false;
    }
};

// Function to make API requests with retries and error handling
const fetchFromAPI = async (apiName, endpoint, tries = 3) => {
    if (!await checkNetworkConnectivity()) {
        throw new Error('No network connectivity');
    }

    const apiUrl = `${APIs[apiName]}${endpoint}`;
    
    for (let attempt = 1; attempt <= tries; attempt++) {
        try {
            const response = await axios.get(apiUrl);
            return response.data;
        } catch (error) {
            if (attempt === tries) {
                console.error(`Failed to fetch from ${apiName} after ${tries} attempts:`, error.message);
                throw error;
            }
            console.warn(`Retrying (${attempt}/${tries})...`);
        }
    }
};

// Example usage for all APIs - this function should be tailored to your specific needs
const main = async () => {
    try {
        const promises = [
            fetchFromAPI('Groq', '/some-endpoint'),
            fetchFromAPI('Gemini', '/another-endpoint'),
            fetchFromAPI('DeepSeek', '/endpoint'),
            fetchFromAPI('SambaNova', '/endpoint'),
            fetchFromAPI('Cerebras', '/endpoint'),
            fetchFromAPI('Cohere', '/endpoint'),
            fetchFromAPI('ElevenLabs', '/endpoint'),
            fetchFromAPI('Cloudflare', '/endpoint'),
        ];

        const results = await Promise.all(promises);
        console.log('Results:', results);
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

main();
