import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: '69278jhg', // תחליפי ל-ID שלך
  dataset: 'production',
  useCdn: false, // השתמש ב-`false` כדי לקבל נתונים עדכניים תמיד
  apiVersion: '2023-01-01',
  apiHost: 'https://api.sanity.io', // Use the dev server as proxy
})