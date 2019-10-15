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
    "url": "webpack-runtime-08cc543c34f529fe869b.js"
  },
  {
    "url": "commons-a97f373134895372ce0e.js"
  },
  {
    "url": "app-064033f7a7cc71086323.js"
  },
  {
    "url": "component---node-modules-gatsby-plugin-offline-app-shell-js-4a6a2e47367ed2ace4c9.js"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "53622720ad718df66b61dc785e8a4e94"
  },
  {
    "url": "styles.f1f2abc56ca1dc74d0a6.css"
  },
  {
    "url": "styles-9b06d4df2f0c17fea955.js"
  },
  {
    "url": "component---src-pages-404-jsx-a663ab01b994f715a5b5.js"
  },
  {
    "url": "page-data/404.html/page-data.json",
    "revision": "c15d53d2abb615c48d143a5da1231ce2"
  },
  {
    "url": "page-data/offline-plugin-app-shell-fallback/page-data.json",
    "revision": "1cc0d2657b83d6f5415480b3928c9f21"
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