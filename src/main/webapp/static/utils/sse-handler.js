/// <reference path="./typings/sse/sse.d.ts" />
define(["require", "exports"], function (require, exports) {
    var EventSourceExtended = (function () {
        function EventSourceExtended(source, keepConnected, debug) {
            if (keepConnected === void 0) { keepConnected = true; }
            if (debug === void 0) { debug = false; }
            this.source = source;
            this.keepConnected = keepConnected;
            this.debug = debug;
            this.events = {};
            this.newSource();
            if (keepConnected) {
                this.on("error", this.reconnect.bind(this));
            }
            this.debugMessage("New EventSource from \"" + source + "\"", this.eventSource);
        }
        EventSourceExtended.prototype.on = function (eventName, eventHandler) {
            var eventArray = this.events[eventName] || [];
            if (eventArray.indexOf(eventHandler) === -1) {
                eventArray.push(eventHandler);
                this.events[eventName] = eventArray;
                this.eventSource.addEventListener(eventName, eventHandler);
            }
            return this.debugMessage("Added listener for \"" + eventName + "\"", eventHandler);
        };
        EventSourceExtended.prototype.off = function (eventName, eventHandler) {
            var eventArray = this.events[eventName];
            if (eventArray !== void 0) {
                var index = eventArray.indexOf(eventHandler);
                if (index > -1) {
                    eventArray.splice(index, 1);
                    this.eventSource.removeEventListener(eventName, eventHandler);
                }
            }
            return this.debugMessage("Removed listener for \"" + eventName + "\"", eventHandler);
        };
        EventSourceExtended.prototype.reconnect = function () {
            return ([
                this.eventSource.CONNECTING,
                this.eventSource.CLOSED
            ].indexOf(this.eventSource.readyState) > -1)
                ? this.closeSource().newSource().debugMessage("Reconnect EventSource from \"" + this.source + "\"", this.eventSource)
                : this.debugMessage("Reconnection is not neccesary");
        };
        EventSourceExtended.prototype.newSource = function () {
            this.timestamp = (new Date()).getTime();
            this.eventSource = new EventSource(this.source + "?" + this.timestamp);
            return this.loadEvents().debugMessage("New EventSource from \"" + this.source + "\" (" + this.timestamp + ")");
        };
        EventSourceExtended.prototype.closeSource = function () {
            this.eventSource.close();
            return this.removeEvents().debugMessage("Closed EventSource");
        };
        EventSourceExtended.prototype.removeEvents = function () {
            var _this = this;
            this.loopTroughEvents(function (eventName, eventHandler) {
                _this.eventSource.removeEventListener(eventName, eventHandler);
            });
            return this.debugMessage("Removed events");
        };
        EventSourceExtended.prototype.loadEvents = function () {
            var _this = this;
            this.loopTroughEvents(function (eventName, eventHandler) {
                _this.eventSource.addEventListener(eventName, eventHandler);
            });
            return this.debugMessage("Loaded events");
        };
        EventSourceExtended.prototype.loopTroughEvents = function (callback) {
            var events = this.events;
            if (events) {
                Object.keys(events).forEach(function (eventName) {
                    events[eventName].forEach(function (eventHandler) {
                        callback(eventName, eventHandler);
                    });
                });
            }
            return this.debugMessage("Loop trough events with callback", callback);
        };
        EventSourceExtended.prototype.debugMessage = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i - 0] = arguments[_i];
            }
            if (this.debug) {
                console.log.apply(console, params);
            }
            return this;
        };
        return EventSourceExtended;
    })();
    exports.EventSourceExtended = EventSourceExtended;
    exports.sources = [];
    function addSource(source, keepConnected, debug) {
        if (keepConnected === void 0) { keepConnected = true; }
        exports.sources.push(new EventSourceExtended(source, keepConnected, debug));
        return exports.sources[exports.sources.length - 1];
    }
    exports.addSource = addSource;
});
