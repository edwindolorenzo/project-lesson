const {Menu, shell} = require('electron')
// Module func to create main app menu

module.exports = appWin => {
  let template = [
    {
      label: 'Items',
      submenu: [
        {
          label: 'Add New',
          accelerator:  'CmdOrCtrl+O',
          click: () => {
            appWin.send('menu-show-modal')
          }
        },
        {
          label: 'Read Item',
          accelerator: 'CmdOrCtrl+Enter',
          click: () => {
            appWin.send('menu-open-item')
          }
        },
        {
          label: 'Delete item',
          accelerator: 'CmdOrCtrl+Backspace',
          click: () => {
            appWin.send('menu-delete-item')
          }
        },
        {
          label: 'Open in Browser',
          accelerator: 'CmdorCtrl+Shift+Enter',
          click: () => {
            appWin.send('menu-open-item-native')
          }
        },
        {
          label: 'Search items',
          accelerator: 'CmdOrCtrl+S',
          click: () => {
            appWin.send('menu-focus-search')
          }
        }
      ]
    },
    {
      role: 'editMenu'
    },
    {
      role: 'windowMenu'
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn more',
          click: () => {
            shell.openExternal('https://github.com/stackacademytv/master-electron')
          }
        }
      ]
    }
  ]

  /*
  platform 
  (windows) => win32 or win64
  (linux) => linux
  (mac) => darwin
  */
  // FOR MAC APP
  if (process.platform === 'darwin') template.unshift({ role: 'appMenu'})

  let menu = Menu.buildFromTemplate(template)

  Menu.setApplicationMenu(menu)
}