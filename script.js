var desktop = document.getElementById("desktop");
var windowProgramManager = document.getElementById("window-program-manager");
var windowMsdos = document.getElementById("window-msdos");

var programManager = {isMouseDown:false, mouseXInTitleBar:null, mouseYInTitleBar:null};
var msdos = {isMouseDown:false, mouseXInTitleBar:null, mouseYInTitleBar:null};

function setMouseDown(titleBar, mouse) {
    if (titleBar.parentElement.parentElement.getAttribute("id") == "window-program-manager") {
        programManager.isMouseDown = true;
        programManager.mouseXInTitleBar = mouse.clientX - windowProgramManager.offsetLeft;
        programManager.mouseYInTitleBar = mouse.clientY - windowProgramManager.offsetTop;
    }
    else if (titleBar.parentElement.parentElement.getAttribute("id") == "window-msdos") {
        msdos.isMouseDown = true;
        msdos.mouseXInTitleBar = mouse.clientX - windowMsdos.offsetLeft;
        msdos.mouseYInTitleBar = mouse.clientY - windowMsdos.offsetTop;
    }
}

function setMouseUp(titleBar) {
    if (titleBar.parentElement.parentElement.getAttribute("id") == "window-program-manager") {
        programManager.isMouseDown = false;
    }
    else if (titleBar.parentElement.parentElement.getAttribute("id") == "window-msdos") {
        msdos.isMouseDown = false;
    }
}

function tryMoveElement(mouse) {
    if (programManager.isMouseDown) {
        windowProgramManager.style.left = mouse.clientX - programManager.mouseXInTitleBar + "px";
        windowProgramManager.style.top = mouse.clientY - programManager.mouseYInTitleBar + "px";
    }
    else if (msdos.isMouseDown) {
        windowMsdos.style.left = mouse.clientX - msdos.mouseXInTitleBar + "px";
        windowMsdos.style.top = mouse.clientY - msdos.mouseYInTitleBar + "px";
    }
}

function runMSDOS() {
    //desktop.appendChild
    windowMsdos.style.display = "block";
}