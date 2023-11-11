import page404 from './routes/404.js'
import collection from './routes/collection.js'
import company from './routes/company.js'
import html from './routes/index.html'
import subcollection from './routes/subcollection.js'

export default {
  async fetch(request, env, ctx) {
    const { pathname, searchParams } = new URL(request.url)

    const collectionName = pathname.split('/').filter(Boolean)[0]
    const documentId = pathname.split('/').filter(Boolean)[1]
    const subcollectionName = pathname.split('/').filter(Boolean)[2]

    if (pathname === '/' || pathname === '/v1') {
      return new Response(html, { headers: { 'content-type': 'text/html', 'Access-Control-Allow-Origin': '*' } })
    }

    if (pathname === '/company') {
      return new Response(company, { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } })
    }

    if (pathname === '/prompts' || pathname === '/entries') {
      const response = await collection(collectionName, searchParams)
      return new Response(response, { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } })
    }

    if (
      ['prompts', 'entries'].includes(collectionName) &&
      ['dislikes', 'likes', 'shares', 'stats', 'visitors'].includes(subcollectionName)
    ) {
      const response = await subcollection(collectionName, documentId, subcollectionName, searchParams)
      return new Response(response, { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } })
    }

    return new Response(page404, { headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' }, status: 404 })
  }
}
