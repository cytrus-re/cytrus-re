const Playlist = require('./playlist')
const update = require('./updater')
const path = require('path')
const os = require('os')
const { spawn, execFile } = require('child_process')
const { platform } = process

module.exports = {
  update,
  /**
   * Gets information about a video url.
   *
   * By default, if you don't pass any args to the executable, the following
   * will be used: --default-search=ytsearch -i
   *
   * --dump-json will always be used no matter what.
   *
   * Unless wait is set to true, the promise will resolve when there's information
   * on at least one video.
   *
   * @param {string|string[]} query - URL(s) to find.
   * @param {string[]} args - Arguments passed to the youtube-dl executable.
   * @param {boolean} wait - Wait for all videos before resolving the promise.
   * @return {Promise<Playlist>} - A playlist object containing the video information.
   */
  getInfo (query, args, wait = false) {
    return new Promise((resolve, reject) => {
      let lastError
      let pData = ''
      // Checks
      if (!query) return reject(new Error('No query specified.'))
      if (typeof query !== 'string' && !(query instanceof Array)) {
        return reject(new Error('query must be a string or array'))
      }
      // Arguments
      const a = ['--dump-json']
        .concat(args || ['--default-search=ytsearch', '-i', '--format=best'])
        .concat(['-a', '-']) // stdin
      const q = [].concat(query)
      // Create a playlist object
      const pl = new Playlist()
      // Launch the youtube-dl executable
      const bin = path.join(__dirname, `ytdl`, `youtube-dl${platform === 'win32' ? '.exe' : ''}`)
      const ytdl = spawn(bin, a, { maxBuffer: Infinity })
      // Handle errors
      ytdl.on('error', reject)
      ytdl.stderr.on('data', d => pl.emit('error', new Error(d)))
      // Send query
      ytdl.stdin.end(q.join(os.EOL), 'utf8')
      // Parse incoming data
      ytdl.stdout.on('data', d => {
        pData += d
        if (pData.indexOf('\n') <= 0) return
        try {
          const data = JSON.parse(pData)
          pl.items.push(data)
          pl.emit('video', data)
          if (pl.items.length === 2 && !wait) {
            // Wait 100ms for the process to exit before resolving the promise
            // This way, if there's only 2 videos, the playlist will be resolved
            // with 'partial' set to false.
            setTimeout(() => {
              if (pl.partial) {
                resolve(pl)
                pl.emit('video', data)
              }
            }, 100)
          }
        } catch (e) {
          pl.emit('error', e)
        }
        pData = ''
      })
      // Close Event
      ytdl.on('close', code => {
        pl.partial = false
        pl.emit('done')
        // Reject the promise if there are no items and there's a error
        if (!pl.items.length && code > 0) {
          return reject(lastError || new Error('Process exited with code ' + code))
        }
        // Resolve the promise if wait is set to true or there's only one item
        if (wait || pl.items.length <= 1) resolve(pl)
      })
      // Keep track of the errors
      pl.on('error', e => { lastError = e })
      // Add a _cancel function to kill the process
      pl._cancel = () => ytdl.kill()
    })
  },
  /**
   * Resolves to the version string of the youtube-dl executable
   * @return {Promise<string>}
   */
  getVersion () {
    const bin = path.join(__dirname, `ytdl`, `youtube-dl${platform === 'win32' ? '.exe' : ''}`)

    return new Promise((resolve, reject) => {
      execFile(bin, ['--version'], (error, stdout, stderr) => {
        if (error || stderr.length) return reject(error || stderr)
        resolve(stdout)
      })
    })
  }
}
