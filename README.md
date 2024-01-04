# mv3-hot-reload

Enable hot reloading for content script and background script (service worker) in MV3.

## How to use

### 1. Inject the code for hot reloading

```ts
// background
import * as mv3 from 'mv3-hot-reload'

mv3.utils.setConfig({
  isDev: true, // false: Disable hot reloading.
})
mv3.background.init()

// your code...
```

```ts
// content.ts
import * as mv3 from 'mv3-hot-reload'

mv3.content.init()

// your code...
```

### 2. Add a script to your `package.json` and run it before development

Example:

```diff
    "watch:src": "webpack --config webpack/webpack.dev.js --watch",
+   "watch:dist": "mv3-hot-reload",
+   "dev": "concurrently yarn:watch:*",
```

## Credits

The implementation of hot reloading in mv3 refers to [theprimone/violet](https://github.com/theprimone/violet).

## License

MIT
