const baseURL = 'https://firestore.googleapis.com/v1/projects/celebrityfanalizer/databases/(default)/documents/'

const fetchFromFirestore = async (path) => {
  const response = await fetch(baseURL + path)
  return await response.json()
}

export { fetchFromFirestore }
