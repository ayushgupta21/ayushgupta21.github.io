import {data, getActiveDataIndex, setActiveDataIndex} from "./items.js";
import {activateLabel, deActivateLabel, updateCurrentLabelTitle} from "./sidebar.js";

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
function updateImage(nextImageIndex){
    activateLabel(nextImageIndex)
    deActivateLabel(getActiveDataIndex())
    setActiveDataIndex(nextImageIndex)
    renderImage(nextImageIndex)
}

export {
    renderImage,
    updateImage
}