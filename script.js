var isFullscreen = false;
var startScreen = document.getElementById("start-screen");
var desktop = document.getElementById("desktop");
var startMenu = document.getElementById("start-menu");
var windowExitWindows = document.getElementById("window-exit-windows");

var programManager = {
	window: document.getElementById("window-program-manager"),
	isMaximized: false,
	x: null,
	y: null,
	width: null,
	height: null,
	isMouseDown: false,
	mouseXInTitleBar: null,
	mouseYInTitleBar: null
};

var programManagerMain = {
	window: document.getElementById("window-program-manager-main"),
	isMaximized: false,
	x: null,
	y: null,
	width: null,
	height: null,
	isMouseDown: false,
	mouseXInTitleBar: null,
	mouseYInTitleBar: null
};

var programManagerAccessories = {
	window: document.getElementById("window-program-manager-accessories"),
	isMaximized: false,
	x: null,
	y: null,
	width: null,
	height: null,
	isMouseDown: false,
	mouseXInTitleBar: null,
	mouseYInTitleBar: null
};

var programManagerGames = {
	window: document.getElementById("window-program-manager-games"),
	isMaximized: false,
	x: null,
	y: null,
	width: null,
	height: null,
	isMouseDown: false,
	mouseXInTitleBar: null,
	mouseYInTitleBar: null
};

var programManagerStartup = {
	window: document.getElementById("window-program-manager-startup"),
	isMaximized: false,
	x: null,
	y: null,
	width: null,
	height: null,
	isMouseDown: false,
	mouseXInTitleBar: null,
	mouseYInTitleBar: null
};

var programManagerApplications = {
	window: document.getElementById("window-program-manager-applications"),
	isMaximized: false,
	x: null,
	y: null,
	width: null,
	height: null,
	isMouseDown: false,
	mouseXInTitleBar: null,
	mouseYInTitleBar: null
};

var msdos = {
	window: document.getElementById("window-msdos"),
	isMaximized: false,
	x: null,
	y: null,
	width: null,
	height: null,
	isMouseDown: false,
	mouseXInTitleBar: null,
	mouseYInTitleBar: null
};

var notepad = {
	window: document.getElementById("window-notepad"),
	isMaximized: false,
	x: null,
	y: null,
	width: null,
	height: null,
	isMouseDown: false,
	mouseXInTitleBar: null,
	mouseYInTitleBar: null
};

var writeApp = {
	window: document.getElementById("window-write"),
	isMaximized: false,
	x: null,
	y: null,
	width: null,
	height: null,
	isMouseDown: false,
	mouseXInTitleBar: null,
	mouseYInTitleBar: null
};

var apps = [ programManager, programManagerMain, programManagerAccessories, programManagerGames, programManagerStartup, programManagerApplications, msdos, notepad, writeApp ];

var fileManager = {
	mouseX: null,
	mouseY: null,
	x: null,
	y: null
};












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

function closeWindow(caller) {
	var thisWindow;
	if (caller.className == "control-menu-box")
		thisWindow = caller.parentElement.parentElement.parentElement;
	else if (caller.className == "menu-command")
		thisWindow = caller.parentElement.parentElement.parentElement.parentElement;
	else if (caller.className == "minimize-button")
		thisWindow = caller.parentElement.parentElement;
	else if (caller.tagName == "BUTTON")
		thisWindow = caller.parentElement.parentElement;
	thisWindow.style.display = "none";
}

function maximizeWindow(caller) {
	var thisApp;		
	var thisWindow;
	var restoreCommand;
	var maximizeCommand;
	var maximizeButton;

	if (caller.className == "menu-command")
		thisWindow = caller.parentElement.parentElement.parentElement.parentElement;
	else if (caller.className == "title" || caller.className == "maximize-button")
		thisWindow = caller.parentElement.parentElement;

	for (var i=0; i<apps.length; i++)
		if (thisWindow.id == apps[i].window.id) {
			console.log("yeah");
			thisApp = apps[i];
		}

	restoreCommand = thisWindow.children[0].children[0].children[1].children[0];
	maximizeCommand = thisWindow.children[0].children[0].children[1].children[4];
	maximizeButton = thisWindow.children[0].children[5];

	// MAXIMIZE WINDOW
	if (restoreCommand.className == "menu-command disabled") {
		thisApp.x = thisWindow.offsetLeft;
		thisApp.y = thisWindow.offsetTop;
		thisApp.width = thisWindow.offsetWidth;
		thisApp.height = thisWindow.offsetHeight;
		console.log(thisApp.width);
		thisWindow.style.top = "0px";
		thisWindow.style.left = "0px";
		thisWindow.style.width = "100%";
		thisWindow.style.height = "100%";
		thisWindow.style.border = "0px";

		restoreCommand.className = "menu-command";
		maximizeCommand.className = "menu-command disabled";
		maximizeButton.children[0].className = "fas fa-sort";
		maximizeButton.children[0].style.verticalAlign = "middle";
	} // RESTORE WINDOW
	else if (restoreCommand.className == "menu-command") {
		thisWindow.style.top = thisApp.y + "px";
		thisWindow.style.left = thisApp.x + "px";
		thisWindow.style.width = thisApp.width + "px";
		thisWindow.style.height = thisApp.height + "px";
		thisWindow.style.border = "";

		restoreCommand.className = "menu-command disabled";
		maximizeCommand.className = "menu-command";
		maximizeButton.children[0].className = "fas fa-sort-up";
		maximizeButton.children[0].style.verticalAlign = "bottom";
	}

	thisWindow.focus();
}

function restoreWindowFromMaximization() {

}

function minimizeWindow() {

}

function restoreWindowFromMinimization() {

}

function switchScreenMode(caller) {
	var iconButton = caller.children[0];
	var iconText = caller.children[0].children[0];
	//alert(icon.className);
	if (!isFullscreen) {
		document.documentElement.requestFullscreen();
		isFullscreen = true;
		iconButton.style.border = "2px inset";
		iconButton.style.textShadow = "1px 1px #fff";
		iconText.className = "fa fa-compress";
	}
	else {
		document.exitFullscreen();
		isFullscreen = false;
		iconButton.style.border = "2px outset";
		iconButton.style.textShadow = "-1px -1px #fff";
		iconText.className = "fa fa-expand";
	}
}

function clickOnWindow(thisWindow) {
	for (var i=0; i<apps.length; i++)
		if (thisWindow.getAttribute("id") == apps[i].window.id)
			apps[i].window.style.zIndex = (Math.max(apps[0].window.style.zIndex, apps[1].window.style.zIndex, apps[2].window.style.zIndex))+ 1;
}

function setMouseDown(titleBar, mouse) {
	for (var i=0; i<apps.length; i++) {
		if (titleBar.parentElement.parentElement.id == apps[i].window.id) {
			apps[i].isMouseDown = true;
			apps[i].mouseXInTitleBar = mouse.clientX - apps[i].window.offsetLeft;
			apps[i].mouseYInTitleBar = mouse.clientY - apps[i].window.offsetTop;
		}
	}
}

function setMouseUp(titleBar) {
	for (var i=0; i<apps.length; i++)
		if (titleBar.parentElement.parentElement.id == apps[i].window.id)
			apps[i].isMouseDown = false;
}

function tryMoveElement(mouse) {
	for (var i=0; i<apps.length; i++) {
		if (apps[i].window.children[0].children[0].children[1].children[0].className == "menu-command disabled") {
			if (apps[i].isMouseDown) {
				apps[i].window.style.left = mouse.clientX - apps[i].mouseXInTitleBar + "px";
				apps[i].window.style.top = mouse.clientY - apps[i].mouseYInTitleBar + "px";
			}
		}
	}
}

function runApp(app) {
	app.window.style.display = "block";
	app.window.style.zIndex = "2";
	app.window.focus();
	clickOnWindow(app.window);
}

function dragStartIcon(icon, mouse) {
	var parent = icon.parentElement;
	// fileManager.mouseX = mouse.clientX - parent.offsetLeft;
	// fileManager.mouseY = mouse.clientY - parent.offsetTop;
	console.log("Start: " + mouse.clientX + " " + mouse.clientY);
}

function dragEndIcon(icon, mouse) {
	var parent = icon.parentElement;
	icon.style.position.absolute;
	// icon.style.left = mouse.clientX - fileManager.mouseX + "px";
	// icon.style.top = mouse.clientY - fileManager.mouseY + "px";
	console.log("End: " + mouse.offsetLeft + " " + mouse.clientY);
	//console.log(x, y);
	// icon.style.position = "absolute";
	// icon.style.top = icon.offsetTop + "px";
	// icon.style.left = "20px";
}

function dragstart(icon, evt) {
    evt = evt || window.event;
    var x = evt.pageX,
        y = evt.pageY;

    console.log(x, y);
    icon.style.position = "absolute";
    icon.style.top = y + "px";
    icon.style.left = x + "px";
}