/**
 * This module contains source code for preview image rendering and update
 */
import {data, getActiveDataIndex, setActiveDataIndex} from "./data.js";
import {activateLabel, deActivateLabel, updateCurrentLabelTitle} from "./sidebar.js";

/**
 * Function to render active image on right half of screen
 * @param imageIndex index of image in data array
 */
function renderImage(imageIndex){
    const {previewImage, title} = data[imageIndex]
    const imageContainerNode = document.querySelector('.image-container')
    imageContainerNode.innerHTML = `<img src=${previewImage} class="preview-image" alt="${title}"/>
                                    <p contenteditable="true" id="active-title" >${title}</p >`
    const titleEditorNode = document.querySelector('#active-title')
    titleEditorNode.addEventListener('input', function (){
        updateCurrentLabelTitle(this.innerText.trim())
    })
}

/**
 * Function to update the preview image with a new image
 * @param nextImageIndex new image index in data array
 */
function updateImage(nextImageIndex){
    // Don't update if nextImageIndex is same as currentActiveIndex
    if(nextImageIndex===getActiveDataIndex())return
    activateLabel(nextImageIndex)
    deActivateLabel(getActiveDataIndex())
    setActiveDataIndex(nextImageIndex)
    renderImage(nextImageIndex)
}

export {
    renderImage,
    updateImage
}