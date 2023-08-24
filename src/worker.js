import { fetchFromFirestore } from './firebase'
import page404 from './routes/404.html'
import company from './routes/company.js'
import html from './routes/index.html'

export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url)

    switch (pathname) {
      case '/':
        return new Response(html, { headers: { 'content-type': 'text/html;charset=UTF-8' } })

      case '/company':
        return new Response(company, { headers: { 'Content-Type': 'application/json' } })

      case '/stats':
        const api = await fetchFromFirestore('prompts')
        return new Response(JSON.stringify(api, null, 2), { headers: { 'Content-Type': 'application/json' } })
    }

    return new Response(page404, { headers: { 'content-type': 'text/html;charset=UTF-8' }, status: 404 })
  }
}
