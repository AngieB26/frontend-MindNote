const BACKEND_URL = 'https://backend-nextjs-one.vercel.app';

export async function summarizeText(text: string): Promise<string> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/ai/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        text,
        type: 'summary'
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error || errorData.message || `Error ${response.status}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    // Soporta tanto el formato viejo como el nuevo
    return data.result || data.data?.result || data.summary || '';
  } catch (error) {
    console.error('Error al resumir:', error);
    throw error;
  }
}
