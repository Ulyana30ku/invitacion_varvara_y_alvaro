const BACKEND_PROXY_URL = 'https://backbaby.vercel.app/api/rsvp';

export async function submitRSVP(data: Record<string, unknown>) {
  const res = await fetch(BACKEND_PROXY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}
