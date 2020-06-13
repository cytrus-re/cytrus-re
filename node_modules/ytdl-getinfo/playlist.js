const EventEmitter = require('events')

/**
 * Represents a video playlist.
 */
class Playlist extends EventEmitter {
  constructor () {
    super()
    /**
     * Items of the playlist
     */
    this.items = []
    /**
     * true when youtube-dl is still getting information on other videos
     * @type {boolean}
     */
    this.partial = true
  }

  /**
   * Cancels playlist fetching
   */
  cancel () {
    if (this.partial && this._cancel) {
      this._cancel()
      this.emit('cancelled')
    }
  }
}

// JSDoc Events
/**
 * Emitted when information about a video is available
 *
 * @event Playlist#video
 * @type {object}
 */
/**
 * Emitted when all videos are done
 *
 * @event Playlist#done
 */
/**
 * Emitted when youtube-dl reports an error
 *
 * @event Playlist#error
 */


module.exports = Playlist
