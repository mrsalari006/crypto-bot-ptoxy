export default {
  async fetch(request) {
    const url = new URL(request.url);
    const telegramUrl = 'https://api.telegram.org' + url.pathname.replace('/api', '') + url.search;
    
    try {
      const response = await fetch(telegramUrl, {
        method: request.method,
        headers: { 'Content-Type': 'application/json' },
        body: request.method !== 'GET' ? await request.text() : null
      });
      
      const data = await response.text();
      
      return new Response(data, {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    } catch (error) {
      return new Response(JSON.stringify({ ok: false, error: error.message }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
};