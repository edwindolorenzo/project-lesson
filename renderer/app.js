// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { ipcRenderer, TouchBarOtherItemsProxy } = require("electron")
const items = require('./items')

// Dom Nodes
let showModal = document.getElementById('show-modal')
    closeModal = document.getElementById('close-modal')
    modal = document.getElementById('modal')
    addItem = document.getElementById('add-item')
    itemUrl = document.getElementById('url')

// Disable & Enable modal buttons
const toogleModalButtons = () =>{
  if (addItem.disabled === true){
    addItem.disabled = false
    addItem.style.opacity = 1
    addItem.innerText = 'Add Item'
    closeModal.style.display = 'inline'    
  }else {
    addItem.disabled = true
    addItem.style.opacity = 0.5
    addItem.innerText = 'Adding...'
    closeModal.style.display = 'none'
  }
}

//Show modal
showModal.addEventListener('click', e => {
  modal.style.display = 'flex'
  itemUrl.focus();
})

closeModal.addEventListener('click', e => {
  modal.style.display = 'none'
})

// handle new item
addItem.addEventListener('click', e => {
  if (itemUrl.value){
    // console.log(itemUrl.value);
    ipcRenderer.send('new-item', itemUrl.value)
    toogleModalButtons()
  }
})

// Listen for new item from main process
ipcRenderer.on('new-item-success', (e, newItem) => {

  // console.log(newItem)

  // Add new item to "items" node
  items.addItem(newItem, true)

  
  toogleModalButtons()

  modal.style.display = 'none'
  itemUrl.value = ''
})

// Listen for keyboard submit
itemUrl.addEventListener('keyup', e => {
  if(e.key === 'Enter') addItem.click();
})