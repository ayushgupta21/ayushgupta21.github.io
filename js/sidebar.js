/**
 * This module contains the source code to manipulate sidebar and data
 * on user interaction
 */
import {data, getActiveDataIndex, setActiveDataIndex} from "./data.js";
import {updateImage} from "./image.js";

/**
 * Function to break a string into two separate parts
 * to help show ellipsis in the center during overflow
 * @param text the string to split
 * @returns {*[]} array of 2 strings obtained rom breaking text
 */
function breakText(text){
    const leftPartSize = text.length > 10 ? text.length-10 : text.length;
    return [text.slice(0,leftPartSize), text.slice(leftPartSize)]
}

/**
 * Function to create a DOM node containing image title for its label
 * @param title title of image label
 * @returns {HTMLDivElement} HTML DOM node to render label title
 */
function createLabelTitleNode(title){
    const labelTitleNode = document.createElement('div')
    labelTitleNode.setAttribute('class', 'label-title')
    const [leftTitle, rightTitle] = breakText(title)
    labelTitleNode.innerHTML = `<div class="left-text">${leftTitle}</div> 
                            <div class="right-text">${rightTitle}</div>`
    return labelTitleNode
}

/**
 * Function to generate a DOM element for image label in sidebar
 * @param previewImage image url
 * @param title image title
 * @returns {HTMLDivElement} HTML DOM node containing the label
 */
function createLabelNode({previewImage, title}){
    const labelNode = document.createElement('div')
    labelNode.setAttribute('class', 'label')
    labelNode.innerHTML = `<div><img src=${previewImage} alt="${title}"/></div>`
    labelNode.appendChild(createLabelTitleNode(title))
    return labelNode
}

/**
 * Function to update label title for currently active image
 * @param newTitle new image title
 */
function updateCurrentLabelTitle(newTitle){
    // Grab label node
    const labelNode = document.querySelector(`#label-${getActiveDataIndex()}`)
    // Remove last child as last child is the title node
    labelNode.removeChild(labelNode.lastChild)
    // Add new title node
    labelNode.appendChild(createLabelTitleNode(newTitle))
}

/**
 * Function to show a label active visually
 * @param labelIndex index of label image in data array
 */
function activateLabel(labelIndex){
    const labelNode = document.querySelector(`#label-${labelIndex}`)
    labelNode.classList.add('active-label')
}

/**
 * Function to make an active label inactive visually
 * @param labelIndex index of label image in data array
 */
function deActivateLabel(labelIndex){
    const labelNode = document.querySelector(`#label-${labelIndex}`)
    labelNode.classList.remove('active-label')
}

/**
 * Function to render sidebar on screen
 */
function renderSidebar(){
    const sidebarNode = document.querySelector('.sidebar')
    // For each data item create a label node
    data.forEach((item, index) => {
        let labelNode = createLabelNode(item)
        labelNode.setAttribute('id', `label-${index}`)
        /**
         * Add event listener on each label node for click event
         * where a click on a label node updates the image to the image
         * corresponding to this label node
         * */
        labelNode.addEventListener('click', () => {
            updateImage(index)
        })
        sidebarNode.appendChild(labelNode)
    })
}

export {
    breakText,
    createLabelNode,
    createLabelTitleNode,
    setActiveDataIndex,
    updateCurrentLabelTitle,
    getActiveDataIndex,
    activateLabel,
    deActivateLabel,
    renderSidebar
}