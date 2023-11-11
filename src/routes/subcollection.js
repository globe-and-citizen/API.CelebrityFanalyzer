import { fetchFromFirestore } from '../firebase'
import page404 from './404.js'

async function handleRequest(collectionName, documentId, subcollectionName, searchParams) {
  try {
    const path = `${collectionName}/${documentId}/${subcollectionName}`

    const subcollection = await fetchFromFirestore(path, searchParams).then(({ documents, nextPageToken }) => {
      if (subcollectionName === 'dislikes' || subcollectionName === 'likes') {
        const data = documents.map((document) => document.fields.createdAt.timestampValue)
        const total = data.length
        return { data, nextPageToken, total }
      }

      if (subcollectionName === 'shares') {
        const data = documents.map((document) => ({
          createdAt: document.fields.createdAt.timestampValue,
          sharedOn: document.fields.sharedOn.stringValue
        }))
        const total = data.length
        return { data, nextPageToken, total }
      }

      if (subcollectionName === 'stats') {
        const data = documents.map((document) => ({
          author: document.fields.author.referenceValue?.split('/').pop() ?? document.fields.author.stringValue,
          createdAt: document.fields.created.timestampValue,
          clicks: parseInt(document.fields.clicks.integerValue),
          mouseMovements: parseInt(document.fields.mouseMovements.integerValue),
          totalTime: parseInt(document.fields.totalTime.integerValue),
          scrolls: parseInt(document.fields.scrolls.integerValue),
          keypresses: parseInt(document.fields.keypresses.integerValue)
        }))
        const total = data.length
        return { data, nextPageToken, total }
      }

      if (subcollectionName === 'visitors') {
        const data = documents.map((document) => document.fields.visits.arrayValue.values.map((value) => value.stringValue))
        const total = data.length
        return { data, nextPageToken, total }
      }
    })

    return JSON.stringify(subcollection, null, 2)
  } catch (error) {
    return page404
  }
}

export default handleRequest
