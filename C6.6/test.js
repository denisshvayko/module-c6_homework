const output = document.getElementById("output");
const btnOpen = document.querySelector('.j-btn-open');
const btnClose = document.querySelector('.j-btn-close');
const btnSend = document.querySelector('.j-btn-send');
const btnGeo = document.querySelector('.geo-btn');
let websocket;
const wsUri = "wss://echo.websocket.org/";

function get_screen_parametrs(){
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { coords } = position;
            let my_geo = `https://www.openstreetmap.org/search?query=${coords.latitude}%${coords.longitude}`;
            writeToScreen(my_geo, 'user');
            websocket.send(my_geo);
        });
    }
}

btnGeo.addEventListener('click', get_screen_parametrs);



function writeToScreen(message, person) {
    let pre = document.createElement("div");
    pre.style.padding = "5px";
    pre.style.wordWrap = "break-word";
    pre.style.borderStyle = "solid";
    pre.style.borderColor = "#72B0BB";
    pre.style.borderRadius = "8px";
    if (person == "user"){
        pre.style.marginLeft = "auto";
        pre.style.background = "#CDF2A8"
    }
    else if(person == 'companion'){
        pre.style.marginRight = "auto";
        pre.style.background = "#FBFCFC"
    }
    else{
        pre.style.margin = "0 auto";
    }
    pre.innerHTML = message;
    output.appendChild(pre);
}

btnOpen.addEventListener('click', () => {
    websocket = new WebSocket(wsUri);
    websocket.onopen = function(evt) {
        writeToScreen("Собеседник найден", 'system');
    };
    websocket.onclose = function(evt) {
        writeToScreen("Диалог окончен", 'system');
    };
    websocket.onmessage = function(evt) {
        if (evt.data.includes('www.openstreetmap.org') == false) {
            writeToScreen(evt.data, 'companion');
        }
    };
    websocket.onerror = function(evt) {
        writeToScreen('Начните диалог заново', 'system');
    };
});

btnClose.addEventListener('click', () => {
    websocket.close();
    websocket = null;
});

btnSend.addEventListener('click', () => {
    let myMessage = document.querySelector('input[name="user-text"]').value;
    if(myMessage!=""){
    writeToScreen(myMessage, 'user');
    websocket.send(myMessage);
    }
});
