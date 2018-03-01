function API() {
    var send = function(message, callback) { this.pubnub.publish({message: message, channel: 'Main'}, callback); };
    var statusHandler = null;
    var responseHandler = null;

    var initializeWatson = function(callback) {
        var request = new XMLHttpRequest();
        var _callback = function(response) {
            console.log(response);
        }
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) { _callback(request.responseText); }
        }
        request.open("GET", "https://watsonplatform.net/authorization/api/v1/token");
        request.send({
            url: "https://stream.watsonplatform.net/text-to-speech/api",
            username: "8d444664-2dd9-4aee-a3cd-69f3bcb1c0f9",
            password: "eLJQtO1GiNvK"});
    }

    this.pubnub = new PubNub({
        subscribeKey: 'sub-c-068dc258-1d09-11e8-a9da-22fca5d72012',
        publishKey: 'pub-c-2f4b5653-d80e-4da0-af6d-427d318cade8'
    });
    this.pubnub.addListener({
        status: function(statusEvent) {
            if (statusEvent.category === "PNUnknownCategory") {
                var newState = { new: 'error' };
                this.pubnub.setState(
                    { state: newState },
                    function (status) { console.log(statusEvent.errorData.message) }
                );
            }
            typeof statusHandler == 'function' && statusHandler(statusEvent.category);
        },
        message: responseHandler
    });
    this.pubnub.subscribe({channels: ['Main']});
    initializeWatson()
    return this;
}
