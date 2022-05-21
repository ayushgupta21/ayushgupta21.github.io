import {data, getActiveDataIndex, setActiveDataIndex} from './data.js'
import {activateLabel, renderSidebar} from "./sidebar.js";
import {renderImage, updateImage} from "./image.js";

/**
 * Function to render page on window load
 */
function renderInitialPage(){
    renderSidebar()
    // If there is some data render active image with first image in data array
    if(data.length)
    {
        setActiveDataIndex(0)
        activateLabel(getActiveDataIndex())
        renderImage(getActiveDataIndex())
    }
    /**
     * Add event listener on arrow up and down key press to update active image
     */
    document.addEventListener('keydown', (event) => {
        if(event.code === 'ArrowUp'){
            if(getActiveDataIndex() > 0) updateImage(getActiveDataIndex() - 1)
        }
        else if(event.code === 'ArrowDown'){
            if(getActiveDataIndex() < data.length - 1) updateImage(getActiveDataIndex() + 1)
        }
    })
}

renderInitialPage()