import { fetchFromFirestore } from './firebase'
import page404 from './routes/404.js'
import collection from './routes/collection.js'
import company from './routes/company.js'
import html from './routes/index.html'
import v1 from './routes/v1.html'

export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url)

    const collectionName = pathname.split('/').filter(Boolean)[0]
    const documentId = pathname.split('/').filter(Boolean)[1]
    const subcollectionName = pathname.split('/').filter(Boolean)[2]

    if (pathname === '/') {
      return new Response(html, { headers: { 'content-type': 'text/html' } })
    }

    if (pathname === '/v1') {
      return new Response(v1, { headers: { 'content-type': 'text/html' } })
    }

    if (pathname === '/company') {
      return new Response(company, { headers: { 'Content-Type': 'application/json' } })
    }

    if (pathname === '/prompts' || pathname === '/entries') {
      const response = await collection(collectionName)
      return new Response(response, { headers: { 'Content-Type': 'application/json' } })
    }

    if ((collectionName === 'prompts' || collectionName === 'entries') && /^[0-9]{4}-[0-9]{2}$/.test(documentId)) {
      switch (subcollectionName) {
        case 'visitors':
        case 'shares':
        case 'likes':
          const subcollectionData = await fetchFromFirestore(`${collectionName}/${documentId}/${subcollectionName}`)
          return new Response(JSON.stringify(subcollectionData, null, 2), { headers: { 'Content-Type': 'application/json' } })
      }
    }

    return new Response(page404, { headers: { 'content-type': 'application/json' }, status: 404 })
  }
}
