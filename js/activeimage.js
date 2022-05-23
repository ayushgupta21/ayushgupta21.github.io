import {data, getActiveDataIndex, isValidDataIndex, setActiveDataIndex} from "./data.js";
import {activateLabelByIndex, deActivateLabel, updateCurrentLabelTitle} from "./sidebar.js";

/**
 * Function to render active image on right half of screen
 * @param imageIndex index of image in data array
 */
function renderActiveImage({previewImage, title}) {
    const imageContainerNode = document.querySelector('.image-container')
    imageContainerNode.innerHTML = `<img src=${previewImage} class="preview-image" alt="${title}"/>
                                    <p contenteditable="true" id="active-title" >${title}</p >`
    const titleEditorNode = document.querySelector('#active-title')
    // Add event listener to update label title on active title edit
    titleEditorNode.addEventListener('input', function () {
        updateCurrentLabelTitle(this.innerText.trim())
    })
}

/**
 * Function to check if a data index is valid
 * data index to update active image
 * @param dataIndex index corresponding to
 * @returns {boolean}
 */
function isValidUpdateIndex(dataIndex) {
    return dataIndex !== getActiveDataIndex() && isValidDataIndex(dataIndex)
}

/**
 * Function to update the preview image with a new image
 * @param nextImageIndex new image index in data array
 */
function updateActiveImageByIndex(nextImageIndex) {
    if (!isValidUpdateIndex(nextImageIndex)) return
    activateLabelByIndex(nextImageIndex)
    deActivateLabel(getActiveDataIndex())
    setActiveDataIndex(nextImageIndex)
    renderActiveImage(data[nextImageIndex])
}

export {
    renderActiveImage,
    updateActiveImageByIndex
}