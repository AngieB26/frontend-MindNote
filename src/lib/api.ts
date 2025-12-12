// Configure la URL de tu backend aquí
// En desarrollo usa proxy local directo al backend; en producción usa serverless proxy
const API_BASE_URL = import.meta.env.MODE === 'development' 
  ? '' // Vite proxy manejará /api
  : '' // En producción llamamos a /api/proxy en el mismo dominio

export async function healthCheck(): Promise<boolean> {
  try {
    const res = await fetch((API_BASE_URL ? `${API_BASE_URL}` : '') + '/health');
    return res.ok;
  } catch {
    return false;
  }
}

export async function summarizeText(text: string): Promise<string> {
  try {
    const endpoint = (import.meta.env.MODE === 'development')
      ? '/api/ai/analyze'
      : '/api/proxy';
    const response = await fetch(endpoint, {
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
    return data.result || data.summary || '';
  } catch (error) {
    console.error('Error al resumir:', error);
    throw error;
  }
}
