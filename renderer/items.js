// Dom nodes
let items = document.getElementById('items')
// Add new item

// Track items in storage
exports.storage = JSON.parse(localStorage.getItem('readit-items')) || []

// Presist storage
exports.save = () => {
  localStorage.setItem('readit-items', JSON.stringify(this.storage))
}

// set items as selected
exports.select = e => {
  //remove currently selected item
  document.getElementsByClassName('read-item selected')[0].classList.remove('selected')
  // add to clicked item
  e.currentTarget.classList.add('selected')
}

// change selection with arrow
exports.changeSelection = direction =>{
  let currentItem = document.getElementsByClassName('read-item selected')[0]
  if (direction === 'ArrowUp' && currentItem.previousElementSibling) {
    currentItem.classList.remove('selected')
    currentItem.previousElementSibling.classList.add('selected')
  } else if (direction === 'ArrowDown' && currentItem.nextElementSibling) {
    currentItem.classList.remove('selected')
    currentItem.nextElementSibling.classList.add('selected')
  }

}

// Open selected item

exports.open = () => {
  // only if we have items (in case of menu open)
  if( !this.storage.length) return

  let selectedItem = document.getElementsByClassName('read-item selected')[0]

  // get URL
  let contentURL = selectedItem.dataset.url

  console.log('Opening item' , contentURL)
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