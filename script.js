var isFullscreen = false;
var startScreen = document.getElementById("start-screen");
var desktop = document.getElementById("desktop");
var startMenu = document.getElementById("start-menu");
var windowExitWindows = document.getElementById("window-exit-windows");

var programManager = {
    window: document.getElementById("window-program-manager"),
    isMouseDown: false,
    mouseXInTitleBar: null,
    mouseYInTitleBar: null
};

var programManagerMain = {
    window: document.getElementById("window-program-manager-main"),
    isMouseDown: false,
    mouseXInTitleBar: null,
    mouseYInTitleBar: null
};

var programManagerAccessories = {
    window: document.getElementById("window-program-manager-accessories"),
    isMouseDown: false,
    mouseXInTitleBar: null,
    mouseYInTitleBar: null
};

var programManagerGames = {
    window: document.getElementById("window-program-manager-games"),
    isMouseDown: false,
    mouseXInTitleBar: null,
    mouseYInTitleBar: null
};

var programManagerStartup = {
    window: document.getElementById("window-program-manager-startup"),
    isMouseDown: false,
    mouseXInTitleBar: null,
    mouseYInTitleBar: null
};

var msdos = {
    window: document.getElementById("window-msdos"),
    isMouseDown: false,
    mouseXInTitleBar: null,
    mouseYInTitleBar: null
};

var notepad = {
    window: document.getElementById("window-notepad"),
    isMouseDown: false,
    mouseXInTitleBar: null,
    mouseYInTitleBar: null
};

var writeApp = {
    window: document.getElementById("window-write"),
    isMouseDown: false,
    mouseXInTitleBar: null,
    mouseYInTitleBar: null
};

var apps = [ programManager, programManagerMain, programManagerAccessories, programManagerGames, programManagerStartup, msdos, notepad, writeApp ];














function init() {
    programManagerMain.window.focus();
    setTimeout(function() {
        startScreen.style.display = "none";
    }, 2000);
}

function startWindowsSession() {
    programManagerMain.window.focus();
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
    thisWindow.style.display = "none";
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
    for (var i=0; i<apps.length; i++)
        if (thisWindow.getAttribute("id") == apps[i].window.id)
            apps[i].window.style.zIndex = (Math.max(apps[0].window.style.zIndex, apps[1].window.style.zIndex, apps[2].window.style.zIndex))+ 1;
}

function setMouseDown(titleBar, mouse) {
    for (var i=0; i<apps.length; i++) {
        if (titleBar.parentElement.parentElement.getAttribute("id") == apps[i].window.id) {
            apps[i].isMouseDown = true;
            apps[i].mouseXInTitleBar = mouse.clientX - apps[i].window.offsetLeft;
            apps[i].mouseYInTitleBar = mouse.clientY - apps[i].window.offsetTop;
        }
    }
}

function setMouseUp(titleBar) {
    for (var i=0; i<apps.length; i++)
        if (titleBar.parentElement.parentElement.getAttribute("id") == apps[i].window.id)
            apps[i].isMouseDown = false;
}

function tryMoveElement(mouse) {
    for (var i=0; i<apps.length; i++) {
        if (apps[i].isMouseDown) {
            apps[i].window.style.left = mouse.clientX - apps[i].mouseXInTitleBar + "px";
            apps[i].window.style.top = mouse.clientY - apps[i].mouseYInTitleBar + "px";
        }
    }
}

function runApp(app) {
    app.window.style.display = "block";
    app.window.style.zIndex = "2";
    app.window.focus();
    clickOnWindow(app.window);
}