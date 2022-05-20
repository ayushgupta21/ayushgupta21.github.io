import data from './items.js'
let CurrentActiveIndex;

function breakText(text){
    const leftPartSize = text.length > 10 ? text.length-10 : text.length;
    return [text.slice(0,leftPartSize), text.slice(leftPartSize)]
}

function createLabelTitle(title){
    const labelTitleNode = document.createElement('div')
    labelTitleNode.setAttribute('class', 'label-title')
    const [leftTitle, rightTitle] = breakText(title)
    labelTitleNode.innerHTML = `<div class="left-text">${leftTitle}</div> 
                            <div class="right-text">${rightTitle}</div>`
    return labelTitleNode
}

function createLabelNode({previewImage, title}){
    const labelNode = document.createElement('div')
    labelNode.setAttribute('class', 'label')
    labelNode.innerHTML = `<div><img src=${previewImage} alt="${title}"/></div>`
    labelNode.appendChild(createLabelTitle(title))
    return labelNode
}

function updateCurrentLabelTitle(newTitle){
    const labelNode = document.querySelector(`#label-${CurrentActiveIndex}`)
    labelNode.removeChild(labelNode.lastChild)
    labelNode.appendChild(createLabelTitle(newTitle))
}

function activateLabel(labelIndex){
    const labelNode = document.querySelector(`#label-${labelIndex}`)
    labelNode.classList.add('active-label')
}

function deActivateLabel(labelIndex){
    const labelNode = document.querySelector(`#label-${labelIndex}`)
    labelNode.classList.remove('active-label')
}

function updateImage(currentImageIndex, nextImageIndex){
    activateLabel(nextImageIndex)
    deActivateLabel(currentImageIndex)
    CurrentActiveIndex = nextImageIndex
    renderImage(nextImageIndex)
}

function renderSidebar(){
    const sidebarNode = document.querySelector('.sidebar')
    data.forEach((item, index) => {
        let labelNode = createLabelNode(item)
        labelNode.setAttribute('id', `label-${index}`)
        labelNode.addEventListener('click', () => {
            updateImage(CurrentActiveIndex, index)
        })
        sidebarNode.appendChild(labelNode)
    })
}

function renderImage(imageIndex){
    const {previewImage, title} = data[imageIndex]
    const imageContainerNode = document.querySelector('.image-container')
    imageContainerNode.innerHTML = `<img src=${previewImage} class="preview-image" alt="${title}"/>
                                    <p contenteditable="true" id="active-title">${title}</p >`
    const titleEditorNode = document.querySelector('#active-title')
    titleEditorNode.addEventListener('input', function (){
        updateCurrentLabelTitle(this.innerText.trim())
    })
}

function renderInitialPage(){
    renderSidebar()
    if(data.length)
    {
        CurrentActiveIndex = 0
        activateLabel(CurrentActiveIndex)
        renderImage(CurrentActiveIndex)
    }
    document.addEventListener('keydown', (event) => {
        if(event.code === 'ArrowUp'){
            if(CurrentActiveIndex > 0) updateImage(CurrentActiveIndex, CurrentActiveIndex - 1)
        }
        else if(event.code === 'ArrowDown'){
            if(CurrentActiveIndex < data.length - 1) updateImage(CurrentActiveIndex, CurrentActiveIndex + 1)
        }
    })
}



renderInitialPage()