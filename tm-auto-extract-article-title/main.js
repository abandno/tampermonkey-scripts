// ==UserScript==
// @name         自动抽取文章的标题(Auto Extract Article Title)
// @namespace    http://life666.top/
// @version      0.1
// @description  自动抽取文章的标题
// @author       Nisus Liu
// @match        *://cuiqingcai.com/*
// @match        *://juejin.cn/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=greasyfork.org
// @grant        none
// @require      https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/limonte-sweetalert2/11.4.4/sweetalert2.all.min.js
// @require      https://cdn.staticfile.org/jquery/2.1.1/jquery.min.js
// ==/UserScript==

(function () {
  'use strict';

  // Your code here...

  // console.log('[Auto Extract Article Title] script starting ...')
  // Swal.fire('傻子都会计算机')
  let $tmToc;
  let $tocTtn;
  let hasExtracted = false;

  /**
   * 抽取标题, 生成 TOC
   */
  function extractToc() {
    // h1~h6
    let $headers = $(":header");
    // console.log($headers)
    let hs = []
    $headers.each((ix, ele) => hs.push(ele))
    // console.log(hs)
    $tmToc = $("<div class='TM-AEAT-toc'></div>");
    $tmToc.appendTo("body");
    hs.forEach(h => {
      // 这里需要克隆节点, 否则就是'移动'的效果了
      $tmToc.append(h.cloneNode(true));
    })

    hasExtracted = true;
    $tocTtn.text('取消抽取');
    $tocTtn.addClass('extracted');
  }

  /**
   * 溢出 TOC
   */
  function removeToc() {
    $tmToc.remove();
    $tocTtn.text('抽取标题');
    $tocTtn.removeClass('extracted');
    hasExtracted = false;
  }

  $tocTtn = $('<button class="TM-AEAT-toc-btn">抽取标题</button>');
  $tocTtn.appendTo('body');
  $tocTtn.on('click', function () {
    if (!hasExtracted) {
      extractToc();
    } else {
      removeToc();
    }
  })

  setCustomStyle();


  function setCustomStyle() {
    //获取 style 节点
    let domStyle = document.createElement('style');
    domStyle.type = 'text/css';
    domStyle.rel = 'stylesheet';
    //追加文本节点, 文本节点里内容就是 css 样式长字符串
    domStyle.appendChild(document.createTextNode(`
.TM-AEAT-toc {
    position: absolute;
    top: 0;
    z-index: 10000;
    font-size: 16px;
    width: 10vw;
}
.TM-AEAT-toc-btn {
    position: fixed;
    top: 60px;
    left: 20px;
    z-index: 20000;
    border: none;
    outline: none;
    background-color: red;
    color: white;
    cursor: pointer;
    padding: 15px;
    border-radius: 50%;
    opacity:0.5;
  }

}
    `));
    let domHead = document.getElementsByTagName('head')[0];
    domHead.appendChild(domStyle);
  }


})();
