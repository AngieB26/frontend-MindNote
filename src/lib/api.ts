// Configure la URL de tu backend aquí
// En desarrollo usa proxy local, en producción usa Vercel
const API_BASE_URL = import.meta.env.MODE === 'development' 
  ? '' // Usa el proxy de Vite en desarrollo
  : import.meta.env.VITE_API_URL || 'https://backend-nextjs-7lzl119g1-angiebq26s-projects.vercel.app';

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
    const endpoint = (API_BASE_URL ? `${API_BASE_URL}` : '') + '/api/ai/analyze';
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
