'use strict';

var API = API();
var valueFor = function(id) { return document.getElementById(id).value };

function API() {
    var obj = new Object();
    obj.send = function(message, callback) { obj.pubnub.publish({message: message, channel: 'Main'}, callback); };
    obj.speak = function(text, callback) {
        var voice = 'en-US_LisaVoice';
        var token = obj.watsonToken;
        var format = 'audio/mpeg';
        var wsURI = 'wss://stream.watsonplatform.net/text-to-speech/api/v1/synthesize'
          + '?voice=' + voice
          + '&watson-token=' + token;
        var websocket = new WebSocket(wsURI);
        var audioParts = [];
        websocket.onopen = function(evt) {
            var message = { text: text, accept: format };
            websocket.send(JSON.stringify(message));
        };
        websocket.onerror = function(evt) { console.log(evt) };
        websocket.onclose = function(evt) {
            var audioBlob = new Blob(audioParts, {type: format});
            var audioURL = URL.createObjectURL(audioBlob);
            var audio = new Audio(audioURL);
            audio.onended = function() { typeof obj.statusHandler == 'function' && obj.statusHandler("connected"); };
            audio.play();
            typeof obj.statusHandler == 'function' && obj.statusHandler("playing");
            typeof callback == 'function' && callback(evt);
        };
        websocket.onmessage = function(evt) {
            if (typeof evt.data === 'string') { console.log('Received message: ', evt.data); }
            else { audioParts.push(evt.data); }
        };
    }
    var statusHandler;
    var responseHandler;
    var _initializeWatson = function(callback) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            console.log(request.response);
            if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
                typeof callback == 'function' && callback(request.responseText);
            }
        };
        request.open('GET', 'https://8d444664-2dd9-4aee-a3cd-69f3bcb1c0f9:eLJQtO1GiNvK@stream.watsonplatform.net/authorization/api/v1/token?url=https://stream.watsonplatform.net/text-to-speech/api');
        request.setRequestHeader("Content-type", "text/plain");
        request.send();
    };

    obj.pubnub = new PubNub({
        subscribeKey: 'sub-c-068dc258-1d09-11e8-a9da-22fca5d72012',
        publishKey: 'pub-c-2f4b5653-d80e-4da0-af6d-427d318cade8'
    });
    obj.pubnub.addListener({
        status: function(statusEvent) {
            if (statusEvent.category === "PNUnknownCategory") {
                var newState = { new: 'error' };
                obj.pubnub.setState(
                    { state: newState },
                    function (status) { console.log(statusEvent.errorData.message) }
                );
                typeof obj.statusHandler == 'function' && obj.statusHandler("error");
            } else {
                typeof obj.statusHandler == 'function' && obj.statusHandler("connected");
            }
        },
        message: function(message) {
            typeof obj.statusHandler == 'function' && obj.statusHandler("received");
            typeof obj.responseHandler == 'function' && obj.responseHandler(message);
        }
    });
    obj.pubnub.subscribe({channels: ['Main']});
    _initializeWatson(function(watsonToken) { obj.watsonToken = watsonToken; });
    return obj;
}
