exports.handler = async function(event, context) {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    // Get the user's prompt from the request
    const body = JSON.parse(event.body);
    const userPrompt = body.userPrompt;

    if (!userPrompt) {
        return { statusCode: 400, body: 'Bad Request: userPrompt is missing.' };
    }

    // Securely access the API key from Netlify's environment variables
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
         return { statusCode: 500, body: 'Server Configuration Error: API key not set.' };
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    const payload = {
        contents: [{ parts: [{ text: userPrompt }] }],
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Google AI API error! status: ${response.status}`);
        }

        const result = await response.json();
        
        // Send the successful result back to the GoHighLevel page
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Allow requests from any origin
                "Access-Control-Allow-Headers": "Content-Type",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(result)
        };

    } catch (error) {
        return { statusCode: 502, body: `Bad Gateway: ${error.message}` };
    }
};
