function setDisplayByElementClassName(className, mode, index = -1) {
    if (index !== -1){
        document.getElementsByClassName(className)[index].style.display = mode
    }
    else{
        document.getElementsByClassName(className).style.display = mode
    }
}

function setDisplayByElementId(id, mode) {
    document.getElementById(id).style.display = mode
}

function setUiLoginDisplay(){
    setDisplayByElementId('galaxy', 'none')
    setDisplayByElementId('formularies', 'block')
    setDisplayByElementClassName('create-box', 'none', 0)
    setDisplayByElementId('win', 'none')
    setDisplayByElementId('lose', 'none')
}

function setUiGameDisplay(){
    setDisplayByElementId('galaxy', 'none')
    setDisplayByElementId('formularies', 'block')
    setDisplayByElementClassName('create-box', 'none', 0)
    setDisplayByElementId('win', 'none')
    setDisplayByElementId('lose', 'none')
}

function setUiWinDisplay(){
    setDisplayByElementId('galaxy', 'none')
    setDisplayByElementId('formularies', 'none')
    setDisplayByElementClassName('create-box', 'none', 0)
    setDisplayByElementId('win', 'block')
    setDisplayByElementId('lose', 'none')
}

function setUiLoseDisplay(){
    setDisplayByElementId('galaxy', 'none')
    setDisplayByElementId('formularies', 'none')
    setDisplayByElementClassName('create-box', 'none', 0)
    setDisplayByElementId('win', 'none')
    setDisplayByElementId('lose', 'block')
}