#!/usr/bin/env node
"use strict";
/* eslint-disable no-console */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chokidar_1 = __importDefault(require("chokidar"));
const ws_1 = __importDefault(require("ws"));
const debounce_1 = __importDefault(require("lodash/debounce"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("../src/utils");
let port = 9012;
let directory = 'dist';
let exclude = [];
const quiet = !!process.env.QUIET;
try {
    const CONFIG_PATH = path_1.default.resolve('mv3-hot-reload.config.js');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const config = require(CONFIG_PATH);
    port = config.port || port;
    directory = config.directory || directory;
    exclude = config.exclude || exclude;
}
catch (err) {
    // ignore
}
const directoryPath = path_1.default.resolve(directory);
const excludePaths = exclude.map((file) => path_1.default.join(directoryPath, file));
const wss = new ws_1.default.Server({ port });
wss.on('listening', () => {
    console.log('hot reload server is listening...');
});
wss.on('close', () => {
    console.log('hot reload server closed.');
});
wss.on('connection', (ws) => {
    const watcher = chokidar_1.default.watch(directoryPath, {
        ignoreInitial: true,
    });
    watcher.on('all', (0, debounce_1.default)((_, path) => {
        if (!excludePaths.includes(path)) {
            if (!quiet) {
                console.log(`File change detected. Path: ${path}`);
            }
            ws.send(utils_1.Message.FileChange);
        }
    }, 500));
    wss.on('close', () => {
        watcher.close();
    });
});
