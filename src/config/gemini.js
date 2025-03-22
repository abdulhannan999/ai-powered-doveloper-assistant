import { GoogleGenerativeAI } from "@google/generative-ai";

const getApiKey = () => {
    return localStorage.getItem("gemini-api-key");
};

export const initializeModel = () => {
    const apiKey = getApiKey(); // Fix: Use a different variable name
    if (!apiKey) {
        console.error("API key is missing");
        return null;
    }
    const genAi = new GoogleGenerativeAI(apiKey);
    return genAi.getGenerativeModel({ model: "gemini-2.0-flash" });
};

export const model = initializeModel();
