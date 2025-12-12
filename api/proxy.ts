// Frontend serverless proxy to avoid CORS in production

// Minimal request/response types to satisfy TypeScript without external deps
type RequestLike = {
  method?: string;
  body?: unknown;
};
type ResponseLike = {
  setHeader: (key: string, value: string) => void;
  status: (code: number) => { json: (data: unknown) => void; end: () => void };
};

export default async function handler(req: RequestLike, res: ResponseLike) {
  // Allow only POST
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(204).end();
  }
  if (req.method !== 'POST') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const backendUrl = process.env.BACKEND_URL || 'https://backend-nextjs-one.vercel.app';

  try {
    const body = req.body ?? {};
    const response = await fetch(`${backendUrl}/api/ai/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => ({}));
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    return res.status(response.status).json(data);
  } catch (e: unknown) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const message = typeof e === 'object' && e !== null && 'message' in e
      ? String((e as { message: unknown }).message)
      : 'Internal error';
    return res.status(500).json({ error: message });
  }
}
