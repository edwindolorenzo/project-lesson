// Modules
const {BrowserWindow} = require('electron')

let offscreenWindow

module.exports = (url, callback) => {

  // Create offscreen window
  offscreenWindow = new BrowserWindow({
    width: 500,
    height: 500,
    show: false,
    webPreferences: {
      offscreen: true
    }
  })

  // Load item url
  offscreenWindow.loadURL(url)
    
  offscreenWindow.webContents.on('did-finish-load', e => {
    let title = offscreenWindow.getTitle()

    offscreenWindow.webContents.capturePage().then( image => {

      // Get image as a dataUrl
      let screenshot = image.toDataURL()

      // Execute callback with new item object
      callback({ title, screenshot, url})

      // Clean up
      offscreenWindow.close()
      offscreenWindow = null
    })
  })
}
