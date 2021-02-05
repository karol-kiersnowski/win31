var isFullscreen = false;
var startScreen = document.getElementById("start-screen");
var desktop = document.getElementById("desktop");
var startMenu = document.getElementById("start-menu");
var windowExitWindows = document.getElementById("window-exit-windows");

var programManager = {
    window: document.getElementById("window-program-manager"),
    isMinimize: false,
    isMaximize: false,
    isMouseDown: false,
    mouseXInTitleBar: null,
    mouseYInTitleBar: null
};

var programManagerMain = {
    window: document.getElementById("window-program-manager-main"),
    isMinimize: false,
    isMaximize: false,
    isMouseDown: false,
    mouseXInTitleBar: null,
    mouseYInTitleBar: null
};

var programManagerAccessories = {
    window: document.getElementById("window-program-manager-accessories"),
    isMinimize: false,
    isMaximize: false,
    isMouseDown: false,
    mouseXInTitleBar: null,
    mouseYInTitleBar: null
};

var programManagerGames = {
    window: document.getElementById("window-program-manager-games"),
    isMinimize: false,
    isMaximize: false,
    isMouseDown: false,
    mouseXInTitleBar: null,
    mouseYInTitleBar: null
};

var programManagerStartup = {
    window: document.getElementById("window-program-manager-startup"),
    isMinimize: false,
    isMaximize: false,
    isMouseDown: false,
    mouseXInTitleBar: null,
    mouseYInTitleBar: null
};

var programManagerApplications = {
    window: document.getElementById("window-program-manager-applications"),
    isMinimize: false,
    isMaximize: false,
    isMouseDown: false,
    mouseXInTitleBar: null,
    mouseYInTitleBar: null
};

var msdos = {
    window: document.getElementById("window-msdos"),
    isMinimize: false,
    isMaximize: false,
    isMouseDown: false,
    mouseXInTitleBar: null,
    mouseYInTitleBar: null
};

var notepad = {
    window: document.getElementById("window-notepad"),
    isMinimize: false,
    isMaximize: false,
    isMouseDown: false,
    mouseXInTitleBar: null,
    mouseYInTitleBar: null
};

var writeApp = {
    window: document.getElementById("window-write"),
    isMinimize: false,
    isMaximize: false,
    isMouseDown: false,
    mouseXInTitleBar: null,
    mouseYInTitleBar: null
};

var apps = [ programManager, programManagerMain, programManagerAccessories, programManagerGames, programManagerStartup, programManagerApplications, msdos, notepad, writeApp ];














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

function maximizeWindow(maximizeButton) {
	var thisApp;
	var thisWindow = maximizeButton.parentElement.parentElement;
	var restoreButtonInOptions = thisWindow.children[0].children[0].children[0].children[0];
	var maximizeButtonInOptions = thisWindow.children[0].children[0].children[0].children[4];

	for (var i=0; i<apps.length; i++)
        if (thisWindow.getAttribute("id") == apps[i].window.id)
            thisApp = apps[i];

	if (thisApp.isMaximize) {
		thisApp.window.style.top = "";
		thisApp.window.style.left = "";
		thisApp.window.style.width = "";
		thisApp.window.style.height = "";
		thisApp.window.style.border = "";
		if (maximizeButton.className == "maximize-button")
			thisApp.isMaximize = false;

		maximizeButton.children[0].className = "fas fa-sort-up";
		maximizeButton.children[0].style.verticalAlign = "bottom";

		restoreButtonInOptions.className = "menu-element disabled";
		maximizeButtonInOptions.className = "menu-element";
	} else {
		thisApp.window.style.top = "0px";
		thisApp.window.style.left = "0px";
		thisApp.window.style.width = "100%";
		thisApp.window.style.height = "100%";
		thisApp.window.style.border = "0px";

		if (maximizeButton.className == "maximize-button")
			thisApp.isMaximize = true;

		maximizeButton.children[0].className = "fas fa-sort";
		maximizeButton.children[0].style.verticalAlign = "middle";

		restoreButtonInOptions.className = "menu-element";
		maximizeButtonInOptions.className = "menu-element disabled";
	}
}

// function maximizeWindowByOptions(maximizeButton) {
// 	if (maximizeButton.className == "menu-element")

// }

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