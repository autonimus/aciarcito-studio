// test-apis.js

const fetch = require('node-fetch');

const apiKeys = {
    key1: 'your_api_key_1', // Replace with user-provided API keys
    key2: 'your_api_key_2',
    // Add more keys as needed
};

const testAPIs = async () => {
    const responses = await Promise.all([
        fetch('https://api.example.com/endpoint1', { headers: { 'Authorization': `Bearer ${apiKeys.key1}` }}),
        fetch('https://api.example.com/endpoint2', { headers: { 'Authorization': `Bearer ${apiKeys.key2}` }}),
        // Add more fetch calls as needed
    ]);

    const results = await Promise.all(responses.map(res => res.json()));
    console.log(results);
};

testAPIs();
