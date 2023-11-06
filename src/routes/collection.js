import { fetchFromFirestore } from '../firebase'
import page404 from './404.js'

async function handleRequest(collectionName) {
  try {
    const collection = await fetchFromFirestore(collectionName).then(({ documents, nextPageToken }) => {
      const data = documents.map((document) => ({
        id: document.fields.id.stringValue,
        title: document.fields.title.stringValue,
        slug: document.fields.slug.stringValue
      }))
      const total = data.length
      return { data, nextPageToken, total }
    })

    return JSON.stringify(collection, null, 2)
  } catch (error) {
    return page404
  }
}

export default handleRequest
