import {data, getActiveDataIndex, isValidDataIndex, setActiveDataIndex} from './data.js'
import {activateLabelByIndex, renderSidebar} from "./sidebar.js";
import {renderActiveImage, updateActiveImageByIndex} from "./activeimage.js";

/**
 * Function to render page on window load
 */
function renderInitialPage(initialActiveDataIndex) {
    renderSidebar()
    setActiveDataIndex(initialActiveDataIndex)
    activateLabelByIndex(initialActiveDataIndex)
    if(isValidDataIndex(initialActiveDataIndex)) renderActiveImage(data[initialActiveDataIndex])
    document.addEventListener('keydown', (event) => {
        // On up key press next active image will be the image just before current active image in data array
        if (event.code === 'ArrowUp') {
            updateActiveImageByIndex(getActiveDataIndex() - 1)
        }
        // On down key press next active image will be the image just after current active image in data array
        else if (event.code === 'ArrowDown') {
            updateActiveImageByIndex(getActiveDataIndex() + 1)
        }
    })
}

// Render initial view of page with first image data in data array
renderInitialPage(0)