const baseURL = 'https://firestore.googleapis.com/v1/projects/celebrityfanalyzer/databases/(default)/documents/'

const fetchFromFirestore = async (path, searchParams) => {
  let url = baseURL + path

  if (searchParams.has('pageSize')) {
    url += (url.includes('?') ? '&' : '?') + 'pageSize=' + searchParams.get('pageSize')
  }

  if (searchParams.has('pageToken')) {
    url += (url.includes('?') || url.includes('&') ? '&' : '?') + 'pageToken=' + searchParams.get('pageToken')
  }

  const response = await fetch(url)
  return await response.json()
}

export { fetchFromFirestore }
