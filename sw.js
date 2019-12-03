/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v3.6.3/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v3.6.3"});

workbox.core.setCacheNameDetails({prefix: "gatsby-plugin-offline"});

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "webpack-runtime-e210c6d95f6514785e1f.js"
  },
  {
    "url": "commons-11ebaa601d379b46cc75.js"
  },
  {
    "url": "app-3c708fbabc7354e6ddf2.js"
  },
  {
    "url": "component---node-modules-gatsby-plugin-offline-app-shell-js-4a6a2e47367ed2ace4c9.js"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "ed170d83de3a060d2e89789c385c37f6"
  },
  {
    "url": "styles.46da33b7b581fffac91d.css"
  },
  {
    "url": "styles-6884f5ac84186b00d181.js"
  },
  {
    "url": "component---src-pages-404-jsx-a663ab01b994f715a5b5.js"
  },
  {
    "url": "page-data/404.html/page-data.json",
    "revision": "39916604925f88d99f8b4d3ba9321ee0"
  },
  {
    "url": "page-data/offline-plugin-app-shell-fallback/page-data.json",
    "revision": "7a40d9860bd89c7bcaa66ae53022b1a8"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "403f62d3118020b613a9cc8abd5a6032"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute("/offline-plugin-app-shell-fallback/index.html", {
  whitelist: [/^([^.?]*|[^?]*\.([^.?]{5,}|html))(\?.*)?$/],
  blacklist: [/\?(.+&)?no-cache=1$/],
});

workbox.routing.registerRoute(/(\.js$|\.css$|\/static\/)/, workbox.strategies.cacheFirst(), 'GET');
workbox.routing.registerRoute(/^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/, workbox.strategies.staleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/, workbox.strategies.staleWhileRevalidate(), 'GET');
// noop
"use strict";