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
    "url": "webpack-runtime-56a7c535aef43c958c08.js"
  },
  {
    "url": "commons-59dd9d8454e4ab9e4eed.js"
  },
  {
    "url": "app-f794aba6ef7b24bbc3d6.js"
  },
  {
    "url": "component---node-modules-gatsby-plugin-offline-app-shell-js-4a6a2e47367ed2ace4c9.js"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "360f74118d45e0e1dbaa82109f97b61e"
  },
  {
    "url": "styles.46da33b7b581fffac91d.css"
  },
  {
    "url": "styles-579c9d0342aff5426fba.js"
  },
  {
    "url": "component---src-pages-404-jsx-a663ab01b994f715a5b5.js"
  },
  {
    "url": "page-data/404.html/page-data.json",
    "revision": "591881850959ecebf2639c9deb9e5b34"
  },
  {
    "url": "page-data/offline-plugin-app-shell-fallback/page-data.json",
    "revision": "1d878819a56a95e9f6adc06de418f089"
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