import ytdl from 'ytdl-core'
import fs from 'fs'

export const downloader = (videoId) => new Promise((resolve, reject) => {
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`
  console.log('[DOWNLOADING_VIDEO]', videoUrl)

  ytdl(videoUrl, { quality: "lowestaudio", filter: 'audioonly' })
    .on('end', () => {
      console.log('[FINISHED_DOWNLOAD]', videoUrl)
      resolve()
    })
    .on('error', () => {
      console.log('[ERROR_DOWNLOAD]', videoUrl)
      reject('[ERROR_DOWNLOAD_VIDEO]')
    })
    .pipe(fs.createWriteStream('audio.mp4'))
})