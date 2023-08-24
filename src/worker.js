import gc from './globe-and-citizen.js'
import html from './index.html'

export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url)

    switch (pathname) {
      case '/':
        return new Response(html, { headers: { 'content-type': 'text/html;charset=UTF-8' } })

      case '/globe-and-citizen':
        return new Response(gc, { headers: { 'Content-Type': 'application/json' } })
    }
  }
}
