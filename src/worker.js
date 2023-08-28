import page404 from './routes/404.js'
import collection from './routes/collection.js'
import company from './routes/company.js'
import html from './routes/index.html'
import subcollection from './routes/subcollection.js'

export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url)

    const collectionName = pathname.split('/').filter(Boolean)[0]
    const documentId = pathname.split('/').filter(Boolean)[1]
    const subcollectionName = pathname.split('/').filter(Boolean)[2]

    if (pathname === '/' || pathname === '/v1') {
      return new Response(html, { headers: { 'content-type': 'text/html' } })
    }

    if (pathname === '/company') {
      return new Response(company, { headers: { 'Content-Type': 'application/json' } })
    }

    if (pathname === '/prompts' || pathname === '/entries') {
      const response = await collection(collectionName)
      return new Response(response, { headers: { 'Content-Type': 'application/json' } })
    }

    if (
      ['prompts', 'entries'].includes(collectionName) &&
      /^[0-9]{4}-[0-9]{2}$/.test(documentId) &&
      ['dislikes', 'likes', 'shares', 'visitors'].includes(subcollectionName)
    ) {
      const response = await subcollection(collectionName, documentId, subcollectionName)
      return new Response(response, { headers: { 'Content-Type': 'application/json' } })
    }

    return new Response(page404, { headers: { 'content-type': 'application/json' }, status: 404 })
  }
}
