const fs = require('fs')
const { networkInterfaces } = require('os')

// Dom nodes
let items = document.getElementById('items')
// Add new item

// Get reader Js
let readerJS
fs.readFile(`${__dirname}/reader.js`, (err, data) =>{
  readerJS = data.toString()
})


// Track items in storage
exports.storage = JSON.parse(localStorage.getItem('readit-items')) || []

// Listen for "done" message from reader window
window.addEventListener('message', e =>{
  // console.log(e.data)

  // Check for correct message
  if (e.data.action === 'delete-reader-item'){
    // Delete item at given index
    this.delete(e.data.itemIndex)
    
    // Close the reader window
    e.source.close()
  }
})

// Delete item
exports.delete = itemIndex => {
  items.removeChild(items.childNodes[itemIndex])

  // Remove from storage
  this.storage.splice(itemIndex, 1)
  this.save()

  if (this.storage.length){
    let = newSelectedItemIndex = (itemIndex === 0 ) ? 0 : itemIndex - 1

    document.getElementsByClassName('read-item')[newSelectedItemIndex].classList.add('selected')
  }
}

exports.getSelectedItem = () =>{
  let currentItem = document.getElementsByClassName('read-item selected')[0]

  let itemIndex = 0
  let child = currentItem
  while( (child = child.previousElementSibling) != null) itemIndex++

  // Return selected item and index
  return { node: currentItem, index: itemIndex}
}

// Presist storage
exports.save = () => {
  localStorage.setItem('readit-items', JSON.stringify(this.storage))
}

// set items as selected
exports.select = e => {
  //remove currently selected item
  this.getSelectedItem().node.classList.remove('selected')
  // add to clicked item
  e.currentTarget.classList.add('selected')
}

// change selection with arrow
exports.changeSelection = direction =>{
  let currentItem = this.getSelectedItem()
  if (direction === 'ArrowUp' && currentItem.previousElementSibling) {
    currentItem.node.classList.remove('selected')
    currentItem.node.previousElementSibling.classList.add('selected')
  } else if (direction === 'ArrowDown' && currentItem.nextElementSibling) {
    currentItem.node.classList.remove('selected')
    currentItem.node.nextElementSibling.classList.add('selected')
  }

}

// Open selected item

exports.open = () => {
  // only if we have items (in case of menu open)
  if( !this.storage.length) return

  let selectedItem = this.getSelectedItem()

  // get URL
  let contentURL = selectedItem.node.dataset.url

  // console.log('Opening item' , contentURL)

  // Open item in proxy browserWindow
  let readerWin = window.open(contentURL, '', `
    maxWidth = 2000,
    maxHeight = 2000,
    width = 1200
    height = 800,
    backgroundColor = #DEDEDE,
    nodeIntegration = 0,
    contextIsolation = 1  
  `)

  // Inject JavaScript
  readerWin.eval(readerJS.replace('{{index}}', selectedItem.index))
}

exports.addItem = (item, isNew = false) => {

  let itemNode = document.createElement('div')

  // assign "read-item" class
  itemNode.setAttribute('class', 'read-item')

  // Set item url as data attribute
  itemNode.setAttribute('data-url', item.url)

  itemNode.innerHTML = `<img src="${item.screenshot}"><h2>${item.title}</h2>`

  // Append new node to "items"
  items.appendChild(itemNode)

  // Attach click handler to select
  itemNode.addEventListener('click', this.select)

  // Attach doubleclick handler to open
  itemNode.addEventListener('dblclick', this.open)

  //if this is the first item. select it
  if (document.getElementsByClassName('read-item').length === 1) {
    itemNode.classList.add('selected')
  }

  if(isNew) {
    this.storage.push(item)
    this.save()
  }
}


// Add items from storage when app loads
this.storage.forEach(item => {
  this.addItem(item)
});