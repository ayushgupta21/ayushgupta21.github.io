import {data, getActiveDataIndex, setActiveDataIndex} from './items.js'
import {activateLabel, renderSidebar} from "./sidebar.js";
import {renderImage, updateImage} from "./image.js";


function renderInitialPage(){
    renderSidebar()
    if(data.length)
    {
        setActiveDataIndex(0)
        activateLabel(getActiveDataIndex())
        renderImage(getActiveDataIndex())
    }
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