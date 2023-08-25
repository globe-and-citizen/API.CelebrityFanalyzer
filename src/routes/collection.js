import { fetchFromFirestore } from '../firebase'

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
    console.error('Error handling request:', error)
    return JSON.stringify({ error: 'An error occurred while processing the request.' })
  }
}

export default handleRequest
