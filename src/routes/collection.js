import { fetchFromFirestore } from '../firebase'
import page404 from './404.js'

async function handleRequest(collectionName) {
  try {
    const collection = await fetchFromFirestore(collectionName)

    const computedCollection = collection.documents.map((document) => ({
      id: document.fields.id.stringValue,
      title: document.fields.title.stringValue,
      slug: document.fields.slug.stringValue
    }))

    return JSON.stringify(computedCollection, null, 2)
  } catch (error) {
    return page404
  }
}

export default handleRequest
