# ytdl-getinfo ![](https://travis-ci.org/TheBITLINK/ytdl-getinfo.svg?branch=master)

Gets information on a video (or playlist) using youtube-dl.

Like the getInfo function of `node-youtube-dl`, but promisified and event-based.

## Usage

```javascript
const { getInfo } = require('ytdl-getinfo')
```

## Examples

- Basic example:
  ```javascript
  getInfo('https://www.youtube.com/watch?v=v7BddpYYNGk').then(info => {
    // info.items[0] should contain the output of youtube-dl --dump-json
    console.log(info.items[0].title)
  })
  ```

- Video Search:
  ```javascript
  getInfo('Muzzy - Endgame').then(info => {
    // info.items[0] contains information of the first search result
    console.log(info.items[0].url)    
  })
  ```

- Custom Arguments:
  ```javascript
  getInfo('v7BddpYYNGk', ['--format=bestaudio']).then(info => {
    // ...
  })
  ```

- Playlists (event based)
  ```javascript
  getInfo('PLwiyx1dc3P2JR9N8gQaQN_BCvlSlap7re').then(info => {
    // info.partial is true for playlists
    if (info.partial) {
      info.on('video', v => console.log(v.title))
      info.on('done', () => console.log(`Playlist contains ${info.items.length} items.`))
    }
  })
  ```

- Playlists (promise based)
  ```javascript
  getInfo('PLwiyx1dc3P2JR9N8gQaQN_BCvlSlap7re', [], true).then(info => {
    // info.items contains all the playlist items
  })
  ```

- Multiple queries at once (acts like a playlist)
  ```javascript
  getInfo(['v7BddpYYNGk', 'BMhrBLD_B2U']).then(info => {
    // ...
  })
  ```

## Manually updating the youtube-dl binary

```javascript
require('ytdl-getinfo').update().then(version => {
  console.log(`youtube-dl updated to version ${version}`)
})
```

## Determining the version of the youtube-dl binary

```javascript
require('ytdl-getinfo').getVersion().then(version => {
  console.log(`Current youtube-dl version: ${version}`)
})
```
