var startScreen = document.getElementById("start-screen");

var desktop = document.getElementById("desktop");

var isFullscreen = false;

var windowExitWindows = document.getElementById("window-exit-windows"); 
var programManager = {
    window: document.getElementById("window-program-manager"),
    isMouseDown: false,
    mouseXInTitleBar: null,
    mouseYInTitleBar: null
};

var msdos = {
    window: document.getElementById("window-msdos"),
    isMouseDown: false,
    mouseXInTitleBar:null,
    mouseYInTitleBar:null
};

function init() {
    setTimeout(function() {
        startScreen.style.display = "none";
    }, 1000);
}

function startWindowsSession() {
    var audio = new Audio("audio/TADA.WAV");
    audio.play();
    startScreen.style.display = "none";
}

function exitWindowsSession() {
    var audio = new Audio("audio/CHIMES.WAV");
    audio.play();
    setTimeout(function() {
        window.close();
    },1000);
}

function showWindowExitWindows() {
    windowExitWindows.style.display = "block";
    document.getElementById("button-ok").focus();
}

function closeWindow(thisWindow) {
    thisWindow.parentElement.parentElement.style.display = "none";
}

function switchScreenMode() {
    if (!isFullscreen) {
        document.documentElement.requestFullscreen();
        isFullscreen = true;
    }
    else {
        document.exitFullscreen();
        isFullscreen = false;
    }
}

function clickOnWindow(thisWindow) {
    if (thisWindow.getAttribute("id") == "window-program-manager") {
        programManager.window.style.zIndex = "2";
        msdos.window.style.zIndex = "1";
    }
    else if (thisWindow.getAttribute("id") == "window-msdos") {
        programManager.window.style.zIndex = "1";
        msdos.window.style.zIndex = "2";
    }
}

function setMouseDown(titleBar, mouse) {
    if (titleBar.parentElement.parentElement.getAttribute("id") == "window-program-manager") {
        programManager.isMouseDown = true;
        programManager.mouseXInTitleBar = mouse.clientX - programManager.window.offsetLeft;
        programManager.mouseYInTitleBar = mouse.clientY - programManager.window.offsetTop;
    }
    else if (titleBar.parentElement.parentElement.getAttribute("id") == "window-msdos") {
        msdos.isMouseDown = true;
        msdos.mouseXInTitleBar = mouse.clientX - msdos.window.offsetLeft;
        msdos.mouseYInTitleBar = mouse.clientY - msdos.window.offsetTop;
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
        programManager.window.style.left = mouse.clientX - programManager.mouseXInTitleBar + "px";
        programManager.window.style.top = mouse.clientY - programManager.mouseYInTitleBar + "px";
    }
    else if (msdos.isMouseDown) {
        msdos.window.style.left = mouse.clientX - msdos.mouseXInTitleBar + "px";
        msdos.window.style.top = mouse.clientY - msdos.mouseYInTitleBar + "px";
    }
}

function selectIcon(thisIcon) {
    thisIcon.style.backgroundColor = "#00f";
}

function unselectIcon(iconId) {
    document.getElementById(iconId).style.backgroundColor = "#fff";
}

function runMSDOS() {
    msdos.window.style.display = "block";
    msdos.window.style.zIndex = "2";
}