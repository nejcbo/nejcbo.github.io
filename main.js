
//WebSocket
var ws_port = 1337;
var url = 'ws://' + window.location.hostname + ':' + ws_port;

// This is called when the page finishes loading
function init() {
	wsConnect(url);
}

// Call this to connect to the WebSocket server
function wsConnect(url) {
    
   
    websocket = new WebSocket(url); // Connect to WebSocket server
    
    // Assign callbacks
    websocket.onopen = function(evt) { onOpen(evt) };
    websocket.onclose = function(evt) { onClose(evt) };
    websocket.onmessage = function(evt) { onMessage(evt) };
    websocket.onerror = function(evt) { onError(evt) };
}

// Called when a WebSocket connection is established with the server
function onOpen(evt) {

   
    console.log("Connected"); // Log connection state
   
    doSend("getLEDState"); // Get the current state of the LED
}

// Called when the WebSocket connection is closed
function onClose(evt) {

    
    console.log("Disconnected"); // Log disconnection state
	
    setTimeout(function() { wsConnect(url) }, 2000); // Try to reconnect after a few seconds
}

// Called when a message is received from the server
function onMessage(evt) {

   
    console.log("Received: " + evt.data); // Print out our received message
    
    // Update LED state
	var x = document.getElementById("stat");
    switch(evt.data) {
        case "0":
            console.log("LED is off");
			x.innerHTML = "OFF";
            break;
        case "1":
            console.log("LED is on");
			x.innerHTML = "ON";
			break;
        default:
            break;
  }
}

// Called when a WebSocket error occurs
function onError(evt) {
    console.log("ERROR: " + evt.data);
}

// Sends a message to the server (and prints it to the console)
function doSend(message) {
    console.log("Sending: " + message);
    websocket.send(message);
}
function onPress() {
	doSend("toggleLED");
    doSend("getLEDState");
}

// Call the init function as soon as the page loads
window.addEventListener("load", init, false);


function w3_open() {
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("myOverlay").style.display = "block";
}
function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("myOverlay").style.display = "none";
}
function homepage() {
  window.location.replace("home.html");
}
function programsetup() {
  window.location.replace("programsetup.html");
}
function settings() {
  window.location.replace("settings.html");
}
function service() {
  window.location.replace("service.html");
}
function info() {
  window.location.replace("info.html");
}

function menu() {
  document.write('\
<div class="w3-sidebar w3-bar-block w3-black" style="display:none;z-index:5" id="mySidebar">\
  <button onclick="homepage()" class="w3-bar-item w3-button"><i class="icon-home"></i> Home</button>\
  <button onclick="programsetup()" class="w3-bar-item w3-button"><i class="icon-list-bullet"></i> Program setup</button>\
  <button onclick="settings()" class="w3-bar-item w3-button"><i class="icon-cog"></i> Settings</button>\
  <button onclick="service()" class="w3-bar-item w3-button"><i class="icon-wrench"></i> Service</button>\
  <button onclick="info()" class="w3-bar-item w3-button icon-info"> Info</button>\
  <a href="#" class="w3-bar-item w3-button w3-display-bottomleft"><i class="icon-off"></i> Standby</a>\
</div>\
\
<div class="w3-overlay w3-animate-opacity" onclick="w3_close()" style="cursor:pointer" id="myOverlay"></div>\
<div class="w3-black w3-xlarge">\
  <button class="w3-button w3-black" onclick="w3_open()"><i class="icon-menu"></i></button>\
  <a id="pagename">Home</a>\
  </div>\
');
}
