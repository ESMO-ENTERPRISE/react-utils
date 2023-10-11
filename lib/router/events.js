"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterEvents = void 0;
class RouterEvents {
    constructor() {
        this.listener = [];
    }
    dispatch(data) {
        this.listener.forEach(callback => callback(data));
    }
    addListener(callback) {
        this.listener.push(callback);
    }
    removeListener(callback) {
        const callbackIndex = this.listener.indexOf(callback);
        if (callbackIndex > -1) {
            this.listener.splice(callbackIndex, 1);
        }
    }
}
exports.RouterEvents = RouterEvents;
