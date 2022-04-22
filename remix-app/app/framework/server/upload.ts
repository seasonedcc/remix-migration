import { Storage } from '@google-cloud/storage'
import type * as Google from '@google-cloud/storage'

type File = Google.File

type Metadata = {
  contentType: string
  md5Hash: string
  size: string
  etag: string
  updated: string
}

const google = (projectId: string, bucketName: string) => {
  const storage = new Storage({
    projectId: projectId,
  })
  const bucket = storage.bucket(bucketName)

  const metadata = async (fileName: string) =>
    (await bucket.file(fileName).getMetadata())[0] as Metadata

  return {
    listFiles: () => bucket.getFiles().then(([files]) => files),
    metadata,
    downloadStream: async (fileName: string) => {
      const file = bucket.file(fileName)
      return {
        stream: file.createReadStream(),
        metadata: await metadata(fileName),
      }
    },
    uploadStream: (fileName: string, stream: NodeJS.ReadableStream) =>
      new Promise<string>((resolve, reject) => {
        const file = bucket.file(fileName)

        const streamFileUpload = async () =>
          stream.pipe(file.createWriteStream()).on('finish', () => {
            console.log(`${fileName} uploaded to ${bucketName}`)
            resolve(fileName)
          })

        streamFileUpload().catch(reject)
      }),
  }
}

export { google }
export type { File, Metadata }
