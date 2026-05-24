const conf={
    endpointUrl: String(import.meta.env.VITE_APPWRITE_URL),
    projectId: String(import.meta.env.VITE_PROJECT_ID),
    databaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    tableId: String(import.meta.env.VITE_APPWRITE_TABLE_ID),
    bucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}
export default conf