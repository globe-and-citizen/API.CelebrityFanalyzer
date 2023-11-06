const baseURL = 'https://firestore.googleapis.com/v1/projects/celebrityfanalyzer/databases/(default)/documents/'

const fetchFromFirestore = async (path, nextPageToken) => {
  let url = baseURL + path

  if (nextPageToken) {
    url += '?pageToken=' + nextPageToken
  }

  const response = await fetch(url)
  return await response.json()
}

export { fetchFromFirestore }
