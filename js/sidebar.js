import {data, getActiveDataIndex, isValidDataIndex} from "./data.js";
import {updateActiveImageByIndex} from "./activeimage.js";

/**
 * Function to split label title into two separate parts with second part of fixed
 * length of either 0 or 10 last characters and first part of remaining characters
 * @param title the string to split
 * @returns {*[]} array of 2 strings obtained from splitting text
 */
function splitTitle(title) {
    const firstPartSize = title.length > 10 ? title.length - 10 : title.length;
    return [title.slice(0, firstPartSize), title.slice(firstPartSize)]
}

/**
 * Function to create a DOM node containing image title for its label
 * @param title title of image label
 * @returns {HTMLDivElement} HTML DOM node to render label title
 */
function createLabelTitleNode(title) {
    const labelTitleNode = document.createElement('div')
    labelTitleNode.setAttribute('class', 'label-title')
    const [leftPart, rightPart] = splitTitle(title)
    /**
     * Append label title in labelTitleNode by splitting label title into
     * two parts. To show ellipsis in center, show ellipsis in left part
     */
    labelTitleNode.innerHTML = `<div class="left-text">${leftPart}</div> 
                            <div class="right-text">${rightPart}</div>`
    return labelTitleNode
}

/**
 * Function to generate a DOM element for image label in sidebar
 * @param previewImage image url
 * @param title image title
 * @returns {HTMLDivElement} HTML DOM node containing the label
 */
function createLabelNode({previewImage, title}) {
    const labelNode = document.createElement('div')
    labelNode.setAttribute('class', 'label')
    // Append label image in labelNode using innerHTMl and string literal
    labelNode.innerHTML = `<img src=${previewImage} alt="${title}"/>`
    labelNode.appendChild(createLabelTitleNode(title))
    return labelNode
}

/**
 * Function to update label title for currently active image
 * @param newTitle new image title
 */
function updateCurrentLabelTitle(newTitle) {
    data[getActiveDataIndex()].title = newTitle
    const labelNode = document.querySelector(`#label-${getActiveDataIndex()}`)
    labelNode.removeChild(labelNode.lastChild)
    labelNode.appendChild(createLabelTitleNode(newTitle))
}

/**
 * Function to show a label active visually
 * @param labelIndex index of label image in data array
 */
function activateLabelByIndex(labelIndex) {
    if(!isValidDataIndex(labelIndex)) return
    const labelNode = document.querySelector(`#label-${labelIndex}`)
    labelNode.classList.add('active-label')
}

/**
 * Function to make an active label inactive visually
 * @param labelIndex index of label image in data array
 */
function deActivateLabel(labelIndex) {
    const labelNode = document.querySelector(`#label-${labelIndex}`)
    labelNode.classList.remove('active-label')
}

/**
 * Function to render sidebar on screen
 */
function renderSidebar() {
    const sidebarNode = document.querySelector('.sidebar')
    data.forEach((image, imageIndex) => {
        let labelNode = createLabelNode(image)
        labelNode.setAttribute('id', `label-${imageIndex}`)
        labelNode.addEventListener('click', () => {
            updateActiveImageByIndex(imageIndex)
        })
        sidebarNode.appendChild(labelNode)
    })
}

export {
    updateCurrentLabelTitle,
    activateLabelByIndex,
    deActivateLabel,
    renderSidebar
}