/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
  async fetch(request, env, ctx) {
    const data = {
      name: 'Globe & Citizen',
      products: ['Celebrity Fanalyzer', 'Layer 8', 'Crypto Tips', 'Globe & Citizen']
    }
    const jsonData = JSON.stringify(data)

    return new Response(jsonData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
