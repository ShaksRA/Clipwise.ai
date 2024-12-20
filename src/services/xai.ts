import { toast } from 'react-hot-toast';

const API_URL = 'https://api.x.ai/v1/conversations';

export async function generateScript(prompt: string, language: string = 'en') {
  const apiKey = import.meta.env.VITE_XAI_API_KEY;
  
  if (!apiKey) {
    toast.error('X.AI API key is not configured');
    throw new Error('X.AI API key is missing');
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Accept-Language': language
      },
      body: JSON.stringify({
        prompt,
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to generate script');
    }

    const data = await response.json();
    return data.message.content;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to generate script';
    toast.error(message);
    throw error;
  }
}