export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    
    // Handle preflight OPTIONS request
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders
      });
    }
    
    // Redirect / to /index.html
    if (url.pathname === "/") {
      url.pathname = "/index.html";
    }
    
    // Fetch the asset
    const response = await env.ASSETS.fetch(url);
    
    // Clone the response and add CORS headers
    const newResponse = new Response(response.body, response);
    
    // Add CORS headers to the response
    Object.keys(corsHeaders).forEach(key => {
      newResponse.headers.set(key, corsHeaders[key]);
    });
    
    return newResponse;
  }
}