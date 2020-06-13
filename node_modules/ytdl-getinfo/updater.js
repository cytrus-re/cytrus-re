const fs = require('fs')
const path = require('path')
const request = require('request')
const { execFile } = require('child_process')

/**
 * Updates or downloads the youtube-dl binary.
 * @return {Promise<String>} - New version number
 */
function updateBinary () {
  return new Promise((resolve, reject) => {
    const bin = `youtube-dl${process.platform === 'win32' ? '.exe' : ''}`
    const dest = path.join(__dirname, `ytdl`, bin)

    // Get the latest version
    request.get(`https://yt-dl.org/downloads/latest/${bin}`)
    .on('error', e => reject(e)) // Handle errors
    .on('end', () => setTimeout(() => {
      // Try to get the version number
      execFile(dest, ['--version'], (error, stdout, stderr) => {
        if (error || stderr.length) return reject(error || stderr)
        resolve(stdout)
      })
    }, 1000))
    .pipe(fs.createWriteStream(dest, { mode: 0o755 }))
  })
}

if (require.main === module) {
  // CLI
  console.log('Updating youtube-dl to the latest version...')
  updateBinary().then(version => {
    console.log(`Successfully downloaded youtube-dl ${version}`)
    process.exit()
  }).catch(e => {
    console.error(e)
    process.exit(1)
  })
} else {
  // Module
  module.exports = updateBinary
}
