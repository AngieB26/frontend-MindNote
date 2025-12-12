// Configure la URL de tu backend aquí
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function summarizeText(text: string): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/summarize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error('Error al resumir el texto');
    }

    const data = await response.json();
    return data.summary || data.result || '';
  } catch (error) {
    console.error('Error al resumir:', error);
    throw error;
  }
}
