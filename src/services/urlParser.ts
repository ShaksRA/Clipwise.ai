export async function parseUrl(url: string): Promise<string> {
  try {
    const response = await fetch(`/api/parse-url?url=${encodeURIComponent(url)}`);
    if (!response.ok) throw new Error('Failed to parse URL');
    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error('Error parsing URL:', error);
    throw error;
  }
}