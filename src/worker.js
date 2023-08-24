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
