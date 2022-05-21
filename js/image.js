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
    // Get image data from data index
    const {previewImage, title} = data[imageIndex]
    // Grab node to image container node and put the image, title markup inside
    const imageContainerNode = document.querySelector('.image-container')
    imageContainerNode.innerHTML = `<img src=${previewImage} class="preview-image" alt="${title}"/>
                                    <p contenteditable="true" id="active-title">${title}</p >`
    /**
     * Grab the editable title node of the image
     * add event listener on input to update the label
     * corresponding to the title in sidebar
     * */
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
    // Activate the label for new active image
    activateLabel(nextImageIndex)
    // deactivate label for previous active image
    deActivateLabel(getActiveDataIndex())
    // update the global current active index variable
    setActiveDataIndex(nextImageIndex)
    // render the current image on right side
    renderImage(nextImageIndex)
}

export {
    renderImage,
    updateImage
}