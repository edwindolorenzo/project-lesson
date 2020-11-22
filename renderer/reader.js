// Create button in remote content to mark item as "Done"

let readitClose = document.createElement('div')
readitClose.innerText = 'Done'

// Style button
readitClose.style.position = 'fixed'
readitClose.style.bottom = '15px'
readitClose.style.right = '15px'
readitClose.style.padding = '5px 10px'
readitClose.style.fontSize = '20px'
readitClose.style.fontWeight = 'bold'
readitClose.style.background = 'dodgerblue'
readitClose.style.color = 'white'
readitClose.style.borderRadius = '5px'
readitClose.style.cursor = 'default'
readitClose.style.boxShadow = '2px 2px 2px rgba(0,0,0,0.2)'
readitClose.style.zIndex = '9999'

// Attach clik handler
readitClose.onclick = e => {
  // alert('Done with item')

  // Message parent (Opener) window
  window.opener.postMessage({
    action: 'delete-reader-item',
    itemIndex: {{index}}
  }, '*')
}



// Append button to body

// error  because from DOM html ( non standart javascript) you can use ipc renderer
// document.getElementsByTagName('body')[0].appendChild(readitClose)
// ==============================================
// you can use other method

// document.getElementsByTagName('body')[0].innerHtml += readitClose.outerHTML

document.getElementsByTagName('body')[0].append(readitClose)
