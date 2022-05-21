import {data, getActiveDataIndex, setActiveDataIndex} from './data.js'
import {activateLabel, renderSidebar} from "./sidebar.js";
import {renderActiveImage, updateActiveImageByIndex} from "./activeimage.js";

/**
 * Function to render page on window load
 */
function renderInitialPage() {
    renderSidebar()
    // If there is some data, render active image with first image in data array
    if (data.length) {
        setActiveDataIndex(0)
        activateLabel(0)
        renderActiveImage(data[0])
    }
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

renderInitialPage()