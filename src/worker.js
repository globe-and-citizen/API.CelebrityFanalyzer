import page404 from './routes/404.html'
import gc from './routes/globe-and-citizen.js'
import html from './routes/index.html'

export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url)

    switch (pathname) {
      case '/':
        return new Response(html, { headers: { 'content-type': 'text/html;charset=UTF-8' } })

      case '/globe-and-citizen':
        return new Response(gc, { headers: { 'Content-Type': 'application/json' } })

      case '/stats':
        return new Response('Statistics will be placed here')
    }

    return new Response(page404, { headers: { 'content-type': 'text/html;charset=UTF-8' }, status: 404 })
  }
}
