"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const utils_1 = require("./utils");
function init() {
    if (utils_1.isDev) {
        chrome.runtime.onMessage.addListener((message) => {
            if (message === utils_1.Message.Reload) {
                chrome.tabs.query({ active: true }).then(() => {
                    chrome.runtime.reload();
                    chrome.tabs.reload();
                });
            }
        });
    }
}
exports.init = init;
