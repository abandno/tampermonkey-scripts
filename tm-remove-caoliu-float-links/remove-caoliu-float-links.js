// ==UserScript==
// @name         自动移除视频窗口上的遮挡
// @name:en      Auto remove floating shelter of caoliu video frame
// @namespace    http://life666.top/
// @version      0.1
// @description  自动移除草榴视频窗口上的links. 遮挡视频, 太讨厌了
// @description:en  Auto remove floating links of caoliu video frame. Blocking the video, it's so annoying
// @author       Nisus Liu
// @license      MIT
// @match        *://*.t66y.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=greasyfork.org
// @grant        none
// @require      https://cdn.staticfile.org/jquery/2.1.1/jquery.min.js
// ==/UserScript==

// !!! 同源策略限制, 貌似实现不了

(function () {
  'use strict';
  console.log('[Auto remove floating shelter of caoliu video frame]');
  loop();

  function loop() {
    setTimeout(() => {
      const r = removeShelter();
      // 没有找到 <div class='links'></div> , 这是因为可能没有点击显示隐藏内容(视频流). 出来后, 才有 links 遮挡物
      if (!r) {
        loop();
      }
    }, 1000);
  }


  function removeShelter() {
    // const $linksDiv = $('.package .links');
    // console.log($linksDiv);
    // if ($linksDiv && $linksDiv.length > 0) {
    //   $linksDiv[0].remove();
    //   return true;
    // }
    // return false;
    // const links = window.frames['iframe1'].document.getElementsByClassName('links')
    const links = $("#iframe1").contents().find(".links");
    if (links != null && links.length > 0) {
      links[0].remove();
      return true;
    }

    return false;
  }

})();
