@const BACKEND_URL = 'https://backend-nextjs-one.vercel.app';

export async function summarizeText(text: string): Promise<string> {
  try {
    const response = await fetch(\\/api/ai/analyze\, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        content: text,
        type: 'summary'
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error || errorData.message || \Error \\;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('Respuesta del backend:', data);
    
    // Intentar extraer el resumen según la guía del backend
    const result = data.summary
      || data.data?.summary
      || data.data?.result
      || data.result
      || (typeof data === 'string' ? data : '');
    
    if (!result) {
      console.error('No se pudo extraer el resumen. Datos recibidos:', data);
      throw new Error('El backend no devolvió un resumen válido');
    }
    
    return result;
  } catch (error) {
    console.error('Error al resumir:', error);
    throw error;
  }
}
