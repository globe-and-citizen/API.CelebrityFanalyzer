import { fetchFromFirestore } from '../firebase'
import page404 from './404.js'

async function handleRequest(collectionName, documentId, subcollectionName) {
  try {
    const path = `${collectionName}/${documentId}/${subcollectionName}`

    const subcollection = await fetchFromFirestore(path).then(({ documents }) => {
      if (subcollectionName === 'dislikes' || subcollectionName === 'likes') {
        const data = documents.map((document) => document.fields.createdAt.timestampValue)
        const total = data.length
        return { data, total }
      }

      if (subcollectionName === 'shares') {
        const data = documents.map((document) => ({
          createdAt: document.fields.createdAt.timestampValue,
          sharedOn: document.fields.sharedOn.stringValue
        }))
        const total = data.length
        return { data, total }
      }

      if (subcollectionName === 'visitors') {
        const data = documents.map((document) => document.fields.visits.arrayValue.values.map((value) => value.stringValue))
        const total = data.length
        return { data, total }
      }
    })

    return JSON.stringify(subcollection, null, 2)
  } catch (error) {
    return page404
  }
}

export default handleRequest
