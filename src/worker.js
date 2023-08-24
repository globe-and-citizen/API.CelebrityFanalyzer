import { fetchFromFirestore } from './firebase'
import page404 from './routes/404.html'
import company from './routes/company.js'
import html from './routes/index.html'
import v1 from './routes/v1.html'

export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url)

    const collectionName = pathname.split('/').filter(Boolean)[0]
    const documentId = pathname.split('/').filter(Boolean)[1]

    switch (pathname) {
      case '/':
        return new Response(html, { headers: { 'content-type': 'text/html;charset=UTF-8' } })

      case '/company':
        return new Response(company, { headers: { 'Content-Type': 'application/json' } })

      case `/${collectionName}`:
        const collection = await fetchFromFirestore(collectionName)
        return new Response(JSON.stringify(collection, null, 2), { headers: { 'Content-Type': 'application/json' } })

      case `/${collectionName}/${documentId}/visitors`:
        const visitors = await fetchFromFirestore(`${collectionName}/${documentId}/visitors`)
        return new Response(JSON.stringify(visitors, null, 2), { headers: { 'Content-Type': 'application/json' } })

      case '/v1':
        return new Response(v1, { headers: { 'content-type': 'text/html;charset=UTF-8' } })
    }

    return new Response(page404, { headers: { 'content-type': 'text/html;charset=UTF-8' }, status: 404 })
  }
}
