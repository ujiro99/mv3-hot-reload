"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setConfig = exports.PORT = exports.isDev = exports.Message = void 0;
var Message;
(function (Message) {
    Message["FileChange"] = "file-change";
    Message["Reload"] = "reload";
})(Message = exports.Message || (exports.Message = {}));
exports.isDev = true;
exports.PORT = 9012;
const setConfig = (conf) => {
    if (conf.isDev != null) {
        exports.isDev = conf.isDev;
    }
    if (conf.PORT != null) {
        exports.PORT = conf.PORT;
    }
};
exports.setConfig = setConfig;
