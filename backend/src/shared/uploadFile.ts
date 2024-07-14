/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */

import config from '../config'
const cloudinary = require('cloudinary').v2

// Configuration
cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
})

export async function uploadMultipleFiles(files: any): Promise<string[]> {
   try {
     const uploadResults = []

     // Loop through the files and upload each one
     for (const file of files) {
       if (file?.fieldname === 'file') {
         const uploadResult = await cloudinary.uploader.upload(file.path, {
           folder: 'Sophisticated',
         })
         uploadResults.push(uploadResult.secure_url)
       }
     }

     return uploadResults
   } catch (error) {
     console.error('Error uploading files:', error)
     throw error
   }
}

module.exports = { uploadMultipleFiles }
