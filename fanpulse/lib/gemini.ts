import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

// We only initialize if we have an API key, to prevent crashes on init
export const genAI = new GoogleGenerativeAI(apiKey);

export const getModel = () => {
  return genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
};
