(()=>{var __webpack_modules__={936:function(){var NO_JQUERY={};!function(e,t,r){if(!("console"in e)){var i=e.console={};i.log=i.warn=i.error=i.debug=function(){}}t===NO_JQUERY&&(t={fn:{},extend:function(){for(var e=arguments[0],t=1,r=arguments.length;t<r;t++){var i=arguments[t];for(var n in i)e[n]=i[n]}return e}}),t.fn.pm=function(){return console.log("usage: \nto send:    $.pm(options)\nto receive: $.pm.bind(type, fn, [origin])"),this},t.pm=e.pm=function(e){n.send(e)},t.pm.bind=e.pm.bind=function(e,t,r,i,s){n.bind(e,t,r,i,!0===s)},t.pm.unbind=e.pm.unbind=function(e,t){n.unbind(e,t)},t.pm.origin=e.pm.origin=null,t.pm.poll=e.pm.poll=200;var n={send:function(e){var r=t.extend({},n.defaults,e),i=r.target;if(r.target)if(r.type){var s={data:r.data,type:r.type};r.success&&(s.callback=n._callback(r.success)),r.error&&(s.errback=n._callback(r.error)),"postMessage"in i&&!r.hash?(n._bind(),i.postMessage(JSON.stringify(s),r.origin||"*")):(n.hash._bind(),n.hash.send(r,s))}else console.warn("postmessage type required");else console.warn("postmessage target window required")},bind:function(e,t,r,i,s){n._replyBind(e,t,r,i,s)},_replyBind:function(r,i,s,o,a){"postMessage"in e&&!o?n._bind():n.hash._bind();var l=n.data("listeners.postmessage");l||(l={},n.data("listeners.postmessage",l));var h=l[r];h||(h=[],l[r]=h),h.push({fn:i,callback:a,origin:s||t.pm.origin})},unbind:function(e,t){var r=n.data("listeners.postmessage");if(r)if(e)if(t){var i=r[e];if(i){for(var s=[],o=0,a=i.length;o<a;o++){var l=i[o];l.fn!==t&&s.push(l)}r[e]=s}}else delete r[e];else for(var o in r)delete r[o]},data:function(e,t){return void 0===t?n._data[e]:(n._data[e]=t,t)},_data:{},_CHARS:"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),_random:function(){for(var e=[],t=0;t<32;t++)e[t]=n._CHARS[0|32*Math.random()];return e.join("")},_callback:function(e){var t=n.data("callbacks.postmessage");t||(t={},n.data("callbacks.postmessage",t));var r=n._random();return t[r]=e,r},_bind:function(){n.data("listening.postmessage")||(e.addEventListener?e.addEventListener("message",n._dispatch,!1):e.attachEvent&&e.attachEvent("onmessage",n._dispatch),n.data("listening.postmessage",1))},_dispatch:function(e){try{var t=JSON.parse(e.data)}catch(u){return void console.warn("postmessage data invalid json: ",u)}if(t.type){var r=(n.data("callbacks.postmessage")||{})[t.type];if(r)r(t.data);else for(var i=(n.data("listeners.postmessage")||{})[t.type]||[],s=0,o=i.length;s<o;s++){var a=i[s];if(a.origin&&"*"!==a.origin&&e.origin!==a.origin){if(console.warn("postmessage message origin mismatch",e.origin,a.origin),t.errback){var l={message:"postmessage origin mismatch",origin:[e.origin,a.origin]};n.send({target:e.source,data:l,type:t.errback})}}else try{a.callback?a.fn(t.data,h,e):h(a.fn(t.data,e))}catch(c){if(!t.errback)throw c;n.send({target:e.source,data:c,type:t.errback})}function h(r){t.callback&&n.send({target:e.source,data:r,type:t.callback})}}}else console.warn("postmessage message type required")}};n.hash={send:function(t,r){var i=t.target,s=t.url;if(s){s=n.hash._url(s);var o,a=n.hash._url(e.location.href);if(e==i.parent)o="parent";else try{for(var l=0,h=parent.frames.length;l<h;l++)if(parent.frames[l]==e){o=l;break}}catch(t){o=e.name}if(null!=o){var u={"x-requested-with":"postmessage",source:{name:o,url:a},postmessage:r},c="#x-postmessage-id="+n._random();i.location=s+c+encodeURIComponent(JSON.stringify(u))}else console.warn("postmessage windows must be direct parent/child windows and the child must be available through the parent window.frames list")}else console.warn("postmessage target window url is required")},_regex:/^\#x\-postmessage\-id\=(\w{32})/,_regex_len:50,_bind:function(){n.data("polling.postmessage")||(setInterval((function(){var t=""+e.location.hash,r=n.hash._regex.exec(t);if(r){var i=r[1];n.hash._last!==i&&(n.hash._last=i,n.hash._dispatch(t.substring(n.hash._regex_len)))}}),t.pm.poll||200),n.data("polling.postmessage",1))},_dispatch:function(t){if(t){try{if(!("postmessage"===(t=JSON.parse(decodeURIComponent(t)))["x-requested-with"]&&t.source&&null!=t.source.name&&t.source.url&&t.postmessage))return}catch(p){return}var r=t.postmessage,i=(n.data("callbacks.postmessage")||{})[r.type];if(i)i(r.data);else{var s;s="parent"===t.source.name?e.parent:e.frames[t.source.name];for(var o=(n.data("listeners.postmessage")||{})[r.type]||[],a=0,l=o.length;a<l;a++){var h=o[a];if(h.origin){var u=/https?\:\/\/[^\/]*/.exec(t.source.url)[0];if("*"!==h.origin&&u!==h.origin){if(console.warn("postmessage message origin mismatch",u,h.origin),r.errback){var c={message:"postmessage origin mismatch",origin:[u,h.origin]};n.send({target:s,data:c,type:r.errback,hash:!0,url:t.source.url})}continue}}function d(e){r.callback&&n.send({target:s,data:e,type:r.callback,hash:!0,url:t.source.url})}try{h.callback?h.fn(r.data,d):d(h.fn(r.data))}catch(f){if(!r.errback)throw f;n.send({target:s,data:f,type:r.errback,hash:!0,url:t.source.url})}}}}},_url:function(e){return(""+e).replace(/#.*$/,"")}},t.extend(n,{defaults:{target:null,url:null,type:null,data:null,success:null,error:null,origin:"*",hash:!1}})}(this,"undefined"==typeof jQuery?NO_JQUERY:jQuery),"JSON"in window&&window.JSON||(JSON={}),function(){function f(e){return e<10?"0"+e:e}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(e){return this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z"},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(e){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(e){return escapable.lastIndex=0,escapable.test(e)?'"'+e.replace(escapable,(function(e){var t=meta[e];return"string"==typeof t?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)}))+'"':'"'+e+'"'}function str(e,t){var r,i,n,s,o,a=gap,l=t[e];switch(l&&"object"==typeof l&&"function"==typeof l.toJSON&&(l=l.toJSON(e)),"function"==typeof rep&&(l=rep.call(t,e,l)),typeof l){case"string":return quote(l);case"number":return isFinite(l)?String(l):"null";case"boolean":case"null":return String(l);case"object":if(!l)return"null";if(gap+=indent,o=[],"[object Array]"===Object.prototype.toString.apply(l)){for(s=l.length,r=0;r<s;r+=1)o[r]=str(r,l)||"null";return n=0===o.length?"[]":gap?"[\n"+gap+o.join(",\n"+gap)+"\n"+a+"]":"["+o.join(",")+"]",gap=a,n}if(rep&&"object"==typeof rep)for(s=rep.length,r=0;r<s;r+=1)"string"==typeof(i=rep[r])&&(n=str(i,l))&&o.push(quote(i)+(gap?": ":":")+n);else for(i in l)Object.hasOwnProperty.call(l,i)&&(n=str(i,l))&&o.push(quote(i)+(gap?": ":":")+n);return n=0===o.length?"{}":gap?"{\n"+gap+o.join(",\n"+gap)+"\n"+a+"}":"{"+o.join(",")+"}",gap=a,n}}"function"!=typeof JSON.stringify&&(JSON.stringify=function(e,t,r){var i;if(gap="",indent="","number"==typeof r)for(i=0;i<r;i+=1)indent+=" ";else"string"==typeof r&&(indent=r);if(rep=t,t&&"function"!=typeof t&&("object"!=typeof t||"number"!=typeof t.length))throw new Error("JSON.stringify");return str("",{"":e})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){var j;function walk(e,t){var r,i,n=e[t];if(n&&"object"==typeof n)for(r in n)Object.hasOwnProperty.call(n,r)&&(void 0!==(i=walk(n,r))?n[r]=i:delete n[r]);return reviver.call(e,t,n)}if(cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,(function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)}))),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}()}},__webpack_module_cache__={};function __webpack_require__(e){var t=__webpack_module_cache__[e];if(void 0!==t)return t.exports;var r=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e].call(r.exports,r,r.exports,__webpack_require__),r.exports}var __webpack_exports__={};(()=>{"use strict";const e=new RegExp("^s+|s+$","g"),t=["input","textarea"];function r(e){return t.indexOf(e.tagName.toLowerCase())>-1}window.GUIComponentsDefinedElements={};class i extends HTMLElement{get instanceType(){return"BaseComponent"}setupTemplate(e,t){if(!this.isConnected)return console.log(`DEBUG: component ${this.tagName} was not initialized because it was disconnected from the DOM!`);this.template=e.template,t(e.template)}}class n{get instanceType(){return"Validator"}static isFormElement(e){for(e=e.parentElement;e;){if("GAMEFACE-FORM-CONTROL"===e.tagName||"gameface-form-control"===e.tagName)return!0;e=e.parentElement}return!1}static tooLong(){return!1}static tooShort(){return!1}static rangeOverflow(){return!1}static rangeUnderflow(){return!1}static valueMissing(e){return e.hasAttribute("required")&&!e.value}static nameMissing(e){return!e.name&&!e.getAttribute("name")}static isRequired(e){return e.hasAttribute("required")}static customError(){return!1}static willSerialize(e){return!this.nameMissing(e)}static isBadURL(){return!1}static isBadEmail(){return!1}}class s{get instanceType(){return"NativeElementValidator"}constructor(e){this.element=e}isFormElement(){return n.isFormElement(this.element)}tooLong(){return r(this.element)?a.tooLong(this.element):n.tooLong()}tooShort(){return r(this.element)?a.tooShort(this.element):n.tooShort()}rangeOverflow(){return r(this.element)?a.rangeOverflow(this.element):n.rangeOverflow()}rangeUnderflow(){return r(this.element)?a.rangeUnderflow(this.element):n.rangeUnderflow()}valueMissing(){return n.valueMissing(this.element)}nameMissing(){return n.nameMissing(this.element)}customError(){return n.customError()}isRequired(){return n.isRequired(this.element)}willSerialize(){return n.willSerialize(this.element)}isBadEmail(){return!!r(this.element)&&a.isBadEmail(this.element)}isBadURL(){return!!r(this.element)&&a.isBadURL(this.element)}}class o extends i{get instanceType(){return"CustomElementValidator"}isFormElement(){return n.isFormElement(this)}tooLong(){return n.tooLong(this)}tooShort(){return n.tooShort(this)}valueMissing(){return n.valueMissing(this)}nameMissing(){return n.nameMissing(this)}customError(){return n.customError()}isRequired(){return n.isRequired(this)}rangeOverflow(){return n.rangeOverflow(this)}rangeUnderflow(){return n.rangeUnderflow(this)}willSerialize(){return n.willSerialize(this)}isBadEmail(){return n.isBadEmail(this)}isBadURL(){return n.isBadURL(this)}}class a{get instanceType(){return"TextFieldValidator"}static tooLong(e){const t=e.getAttribute("maxlength");return!!t&&e.value.length>parseFloat(t)}static tooShort(e){const t=e.getAttribute("minlength");return!!t&&e.value.length<parseFloat(t)}static rangeOverflow(e){const t=e.getAttribute("max");return!!t&&parseFloat(e.value)>parseFloat(t)}static rangeUnderflow(e){const t=e.getAttribute("min");return!!t&&parseFloat(e.value)<parseFloat(t)}static isBadURL(e){if("url"!==e.getAttribute("type"))return!1;const t=e.pattern||e.getAttribute("pattern");return!!t&&!e.value.match(t)}static isBadEmail(e){return"email"===e.getAttribute("type")&&!e.value.match("@")}}const l=new Map([["vertical",{mouseAxisCoords:"clientY",size:"height",sizePX:"heightPX",position:"top",scroll:"scrollHeight",offset:"offsetHeight"}],["horizontal",{mouseAxisCoords:"clientX",size:"width",sizePX:"widthPX",position:"left",scroll:"scrollWidth",offset:"offsetWidth"}]]),h=new function(){const t="component-slot",r={DOWN:40,LEFT:37,RIGHT:39,UP:38,HOME:36,END:35,ENTER:13,ESCAPE:27,TAB:9,SHIFT:16,CTRL:17,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,LETTER_A:65},l=new class{constructor(){this.imported=this.imported||[],this.KEYCODES=r,this.cachedComponents={},this.CustomElementValidator=o,this.NativeElementValidator=s,this.TextFieldValidator=a,this.Validator=n,this.BaseComponent=i}importScript(e){const t=document.createElement("script");t.setAttribute("src",e),document.body.appendChild(t)}loadHTML(e){return this.loadResource(e).then((e=>e.template))}whenDefined(e){if(void 0!==window.GUIComponentsDefinedElements[e])return window.GUIComponentsDefinedElements[e].promise;const t=window.GUIComponentsDefinedElements[e]={};return t.promise=new Promise(((e,r)=>{t.resolve=e,t.reject=r})),t.promise}defineCustomElement(e,t){window.GUIComponentsDefinedElements[e]||customElements.get(e)||(this.whenDefined(e),customElements.define(e,t),window.GUIComponentsDefinedElements[e].resolve(t))}importComponent(e){requestAnimationFrame((()=>{this.importScript(e+"/script.js")}))}removeSlashes(e){return e.replace(/[/|\\]/g,"")}removeNewLines(t){return t.replace(e,"").trim()}removeCopyrightNotice(e){return e.replace("\x3c!--Copyright (c) Coherent Labs AD. All rights reserved. Licensed under the MIT License. See License.txt in the project root for license information. --\x3e","").trim()}resolveWithTemplate(e){return new Promise((t=>{t({template:e.template,url:e.url})}))}loadResource(e){if(e.template&&"string"==typeof e.template){if(e.isRendered)return this.resolveWithTemplate(e);const t=this.removeCopyrightNotice(e.template);return new Promise((r=>{r({template:this.removeNewLines(t),url:e.url})}))}if("object"==typeof e.template&&e.isRendered)return this.resolveWithTemplate(e);if(window.__optimize){const t=this.removeSlashes(e.url),r=document.getElementById(t).firstChild;return r?new Promise((t=>{t({template:r.innerHTML,url:e.url})})):this.requestResource(e.url)}return this.requestResource(e.url)}requestResource(e){const t=new XMLHttpRequest,r=new Promise((function(r,i){t.onload=n=>{200==t.status?r({template:t.responseText,url:e}):i(n)},t.onerror=i}));return t.open("GET",e),t.send(),r}findSlots(e,r,i={}){const n=e.children,s=n.length;for(let e=0;e<s;++e){const s=n[e],o=s.tagName.toLowerCase();if("component-slot"===o){const e=s.dataset.name;i[e]||(i[e]=[]),i[e].push(s),this.findSlots(s,r,i)}else if(s.hasAttribute("slot")){const e=s.getAttribute("slot");i[e]||(i[e]=[]),i[e].push(s),this.findSlots(s,r,i)}else("gameface-scrollable-container"===o||o!==t&&r!==o&&!window.GUIComponentsDefinedElements[o])&&this.findSlots(s,r,i)}return i}replaceSlots(e,t){const r=t[0];if(e.length&&r.childNodes.length)for(;r.firstChild;)r.removeChild(r.lastChild);const i=r.parentNode;i.removeChild(r);for(let t=0;t<e.length;++t)i.appendChild(e[t])}transferContent(e,t){for(;t.childNodes.length>0;){const e=t.childNodes;t.removeChild(e[e.length-1])}for(;e.childNodes.length>0;){const r=e.childNodes[0];e.removeChild(r),t.appendChild(r)}}renderOnce(e){return!e.isRendered&&(this.render(e),e.isRendered=!0,!0)}render(e){const t=document.createElement("div");t.innerHTML=e.template;const r=e.tagName.toLowerCase(),i=this.findSlots(t,r),n=this.findSlots(e,r),s=Object.keys(n);if(Object.keys(i).length)for(const e of s)n[e]&&i[e]&&this.replaceSlots(n[e],i[e]);this.transferContent(t,e)}transferChildren(e,t,r){const i=document.createElement("div");i.innerHTML=e.template;const n=i.querySelector(t);r.forEach((e=>n.appendChild(e))),this.transferContent(i,e)}waitForFrames(e=(()=>{}),t=3){if(0===t)return e();t--,requestAnimationFrame((()=>this.waitForFrames(e,t)))}isBrowserGameface(){return navigator.userAgent.match("Cohtml")}};class h extends HTMLElement{constructor(){super(),this.originalAppendChild=this.appendChild,this.originalInsertBefore=this.insertBefore,this.originalReplaceChild=this.replaceChild,this.originalRemoveChild=this.removeChild,this.appendChild=e=>{const t=this.originalAppendChild(e);return this.disptachSlotChange(t),t},this.insertBefore=(e,t)=>{const r=this.originalInsertBefore(e,t);return this.disptachSlotChange(r),r},this.replaceChild=(e,t)=>{const r=this.originalReplaceChild(e,t);return this.disptachSlotChange(r),r},this.removeChild=e=>{const t=this.originalRemoveChild(e);return this.disptachSlotChange(t),t}}disptachSlotChange(e){this.dispatchEvent(new CustomEvent("slotchange"),{target:this,child:e})}}return l.defineCustomElement(t,h),l},u=h.BaseComponent;h.defineCustomElement("gameface-slider",class extends u{set handlePosition(e){this._handlePosition=e,this.handle.style[this.units.position]=e+"%"}get handlePosition(){return this._handlePosition}get handlePositionPx(){const e=this.slider.getBoundingClientRect()[this.units.size];return this.handlePosition/100*e}constructor(){super(),this.onSlideUp=e=>{this.onSlideWithArrorws(-1)},this.onSlideDown=e=>{this.onSlideWithArrorws(1)},this.onClick=this.onClick.bind(this),this.onWheel=this.onWheel.bind(this),this.onMouseDown=this.onMouseDown.bind(this),this.onMouseMove=this.onMouseMove.bind(this),this.onMouseUp=this.onMouseUp.bind(this),this.init=this.init.bind(this)}init(e){this.setupTemplate(e,(()=>{h.renderOnce(this),this.setup()}))}connectedCallback(){this.step=this.getAttribute("step")||10,this._handlePosition=0,this.orientation=this.getAttribute("orientation")||"vertical",this.template="vertical"===this.orientation?' <div class="guic-vertical-slider-wrapper"> <div class="guic-slider-vertical-arrow up"><div class="guic-slider-arrow-up"></div></div> <div class="guic-slider-vertical-slider"> <div class="guic-slider-vertical-handle handle"></div> </div> <div class="guic-slider-vertical-arrow down"><div class="guic-slider-arrow-down"></div></div> </div> ':' <div class="guic-horizontal-slider-wrapper"> <div class="guic-slider-horizontal-arrow up"><div class="guic-slider-arrow-left"></div></div> <div class="guic-slider-horizontal-slider"> <div class="guic-slider-horizontal-handle handle"></div> </div> <div class="guic-slider-horizontal-arrow down"><div class="guic-slider-arrow-right"></div></div> </div> ',this.units=l.get(this.orientation),h.loadResource(this).then(this.init).catch((e=>console.error(e)))}setup(){this.slider=this.getElementsByClassName(`guic-slider-${this.orientation}-slider`)[0],this.handle=this.getElementsByClassName(`guic-slider-${this.orientation}-handle`)[0],this.attachEventListeners()}disconnectedCallback(){this.removeEventListeners()}_getPxSizeWithoutUnits(e){let t=this.units.sizePX;navigator.userAgent.includes("Cohtml")||(t=t.substring(0,t.length-2));const r=getComputedStyle(e)[t];return Number(r.substring(0,r.length-2))}resize(e){h.waitForFrames((()=>{const t=this._getPxSizeWithoutUnits(this.querySelector(`.guic-${this.orientation}-slider-wrapper`)),r=2*this._getPxSizeWithoutUnits(this.querySelector(`.guic-slider-${this.orientation}-arrow`))/t*100,i=this.slider[this.units.offset],n=i/(100-r)*(i/e[this.units.scroll]*100);this.handle.style[this.units.size]=n+"px",this.scrollTo(this.handlePositionPx)}))}removeEventListeners(){document.removeEventListener("mousemove",this.onMouseMove),document.removeEventListener("mouseup",this.onMouseUp)}attachEventListeners(){this.slider.addEventListener("click",this.onClick),this.slider.addEventListener("wheel",this.onWheel),this.handle.addEventListener("mousedown",this.onMouseDown),this.querySelector(".up").addEventListener("mousedown",this.onSlideUp),this.querySelector(".down").addEventListener("mousedown",this.onSlideDown),document.addEventListener("mousemove",this.onMouseMove),document.addEventListener("mouseup",this.onMouseUp)}onMouseDown(e){this.mousedown=!0;const t=this.handle.getBoundingClientRect(),r=this.slider.getBoundingClientRect()[this.units.position],i=t[this.units.position]-r,n=e[this.units.mouseAxisCoords]-r;this.delta=n-i}onMouseUp(){this.mousedown=!1,this.dragging=!1,this.slidingWithArrows&&(this.slidingWithArrows=!1,clearInterval(this.interval))}onMouseMove(e){if(!this.mousedown)return;this.dragging=!0;const t=this.slider.getBoundingClientRect(),r=e[this.units.mouseAxisCoords]-t[this.units.position];this.scrollTo(r-this.delta)}onSlideWithArrorws(e){this.slidingWithArrows=!0,this.interval=setInterval((()=>this.scrollTo(this.getNextScrollPosition(e,this.step))),10)}scrollTo(e){const t=this.handle.getBoundingClientRect(),r=this.slider.getBoundingClientRect(),i=t[this.units.size]/r[this.units.size]*100;let n=e/r[this.units.size]*100;n<0&&(n=0),n+i>100&&(n=100-i),this.handlePosition=n,this.dispatchEvent(new CustomEvent("slider-scroll",{detail:{handlePosition:n}}))}onWheel(e){const t=e.deltaY<0?-1:1;this.scrollTo(this.getNextScrollPosition(t,this.step))}onClick(e){if(e.target.classList.contains("handle"))return;let t=-1;this.handle.getBoundingClientRect()[this.units.position]<e[this.units.mouseAxisCoords]&&(t=1),this.scrollTo(this.getNextScrollPosition(t,this.step))}getNextScrollPosition(e,t=this.step){return this.handlePosition*this.slider.getBoundingClientRect()[this.units.size]/100+e*t}});var c=__webpack_require__(936),d="undefined"!=typeof globalThis&&globalThis||"undefined"!=typeof self&&self||void 0!==d&&d,p={searchParams:"URLSearchParams"in d,iterable:"Symbol"in d&&"iterator"in Symbol,blob:"FileReader"in d&&"Blob"in d&&function(){try{return new Blob,!0}catch(e){return!1}}(),formData:"FormData"in d,arrayBuffer:"ArrayBuffer"in d};if(p.arrayBuffer)var f=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],m=ArrayBuffer.isView||function(e){return e&&f.indexOf(Object.prototype.toString.call(e))>-1};function g(e){if("string"!=typeof e&&(e=String(e)),/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(e)||""===e)throw new TypeError("Invalid character in header field name");return e.toLowerCase()}function y(e){return"string"!=typeof e&&(e=String(e)),e}function b(e){var t={next:function(){var t=e.shift();return{done:void 0===t,value:t}}};return p.iterable&&(t[Symbol.iterator]=function(){return t}),t}function v(e){this.map={},e instanceof v?e.forEach((function(e,t){this.append(t,e)}),this):Array.isArray(e)?e.forEach((function(e){this.append(e[0],e[1])}),this):e&&Object.getOwnPropertyNames(e).forEach((function(t){this.append(t,e[t])}),this)}function w(e){if(e.bodyUsed)return Promise.reject(new TypeError("Already read"));e.bodyUsed=!0}function _(e){return new Promise((function(t,r){e.onload=function(){t(e.result)},e.onerror=function(){r(e.error)}}))}function E(e){var t=new FileReader,r=_(t);return t.readAsArrayBuffer(e),r}function C(e){if(e.slice)return e.slice(0);var t=new Uint8Array(e.byteLength);return t.set(new Uint8Array(e)),t.buffer}function S(){return this.bodyUsed=!1,this._initBody=function(e){var t;this.bodyUsed=this.bodyUsed,this._bodyInit=e,e?"string"==typeof e?this._bodyText=e:p.blob&&Blob.prototype.isPrototypeOf(e)?this._bodyBlob=e:p.formData&&FormData.prototype.isPrototypeOf(e)?this._bodyFormData=e:p.searchParams&&URLSearchParams.prototype.isPrototypeOf(e)?this._bodyText=e.toString():p.arrayBuffer&&p.blob&&(t=e)&&DataView.prototype.isPrototypeOf(t)?(this._bodyArrayBuffer=C(e.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):p.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(e)||m(e))?this._bodyArrayBuffer=C(e):this._bodyText=e=Object.prototype.toString.call(e):this._bodyText="",this.headers.get("content-type")||("string"==typeof e?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):p.searchParams&&URLSearchParams.prototype.isPrototypeOf(e)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},p.blob&&(this.blob=function(){var e=w(this);if(e)return e;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?w(this)||(ArrayBuffer.isView(this._bodyArrayBuffer)?Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset,this._bodyArrayBuffer.byteOffset+this._bodyArrayBuffer.byteLength)):Promise.resolve(this._bodyArrayBuffer)):this.blob().then(E)}),this.text=function(){var e,t,r,i=w(this);if(i)return i;if(this._bodyBlob)return e=this._bodyBlob,r=_(t=new FileReader),t.readAsText(e),r;if(this._bodyArrayBuffer)return Promise.resolve(function(e){for(var t=new Uint8Array(e),r=new Array(t.length),i=0;i<t.length;i++)r[i]=String.fromCharCode(t[i]);return r.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},p.formData&&(this.formData=function(){return this.text().then(T)}),this.json=function(){return this.text().then(JSON.parse)},this}v.prototype.append=function(e,t){e=g(e),t=y(t);var r=this.map[e];this.map[e]=r?r+", "+t:t},v.prototype.delete=function(e){delete this.map[g(e)]},v.prototype.get=function(e){return e=g(e),this.has(e)?this.map[e]:null},v.prototype.has=function(e){return this.map.hasOwnProperty(g(e))},v.prototype.set=function(e,t){this.map[g(e)]=y(t)},v.prototype.forEach=function(e,t){for(var r in this.map)this.map.hasOwnProperty(r)&&e.call(t,this.map[r],r,this)},v.prototype.keys=function(){var e=[];return this.forEach((function(t,r){e.push(r)})),b(e)},v.prototype.values=function(){var e=[];return this.forEach((function(t){e.push(t)})),b(e)},v.prototype.entries=function(){var e=[];return this.forEach((function(t,r){e.push([r,t])})),b(e)},p.iterable&&(v.prototype[Symbol.iterator]=v.prototype.entries);var A=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function x(e,t){if(!(this instanceof x))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');var r,i,n=(t=t||{}).body;if(e instanceof x){if(e.bodyUsed)throw new TypeError("Already read");this.url=e.url,this.credentials=e.credentials,t.headers||(this.headers=new v(e.headers)),this.method=e.method,this.mode=e.mode,this.signal=e.signal,n||null==e._bodyInit||(n=e._bodyInit,e.bodyUsed=!0)}else this.url=String(e);if(this.credentials=t.credentials||this.credentials||"same-origin",!t.headers&&this.headers||(this.headers=new v(t.headers)),this.method=(i=(r=t.method||this.method||"GET").toUpperCase(),A.indexOf(i)>-1?i:r),this.mode=t.mode||this.mode||null,this.signal=t.signal||this.signal,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&n)throw new TypeError("Body not allowed for GET or HEAD requests");if(this._initBody(n),!("GET"!==this.method&&"HEAD"!==this.method||"no-store"!==t.cache&&"no-cache"!==t.cache)){var s=/([?&])_=[^&]*/;s.test(this.url)?this.url=this.url.replace(s,"$1_="+(new Date).getTime()):this.url+=(/\?/.test(this.url)?"&":"?")+"_="+(new Date).getTime()}}function T(e){var t=new FormData;return e.trim().split("&").forEach((function(e){if(e){var r=e.split("="),i=r.shift().replace(/\+/g," "),n=r.join("=").replace(/\+/g," ");t.append(decodeURIComponent(i),decodeURIComponent(n))}})),t}function B(e,t){if(!(this instanceof B))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');t||(t={}),this.type="default",this.status=void 0===t.status?200:t.status,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in t?t.statusText:"",this.headers=new v(t.headers),this.url=t.url||"",this._initBody(e)}x.prototype.clone=function(){return new x(this,{body:this._bodyInit})},S.call(x.prototype),S.call(B.prototype),B.prototype.clone=function(){return new B(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new v(this.headers),url:this.url})},B.error=function(){var e=new B(null,{status:0,statusText:""});return e.type="error",e};var O=[301,302,303,307,308];B.redirect=function(e,t){if(-1===O.indexOf(t))throw new RangeError("Invalid status code");return new B(null,{status:t,headers:{location:e}})};var U=d.DOMException;try{new U}catch(e){(U=function(e,t){this.message=e,this.name=t;var r=Error(e);this.stack=r.stack}).prototype=Object.create(Error.prototype),U.prototype.constructor=U}function P(e,t){return new Promise((function(r,i){var n=new x(e,t);if(n.signal&&n.signal.aborted)return i(new U("Aborted","AbortError"));var s=new XMLHttpRequest;function o(){s.abort()}s.onload=function(){var e,t,i={status:s.status,statusText:s.statusText,headers:(e=s.getAllResponseHeaders()||"",t=new v,e.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach((function(e){var r=e.split(":"),i=r.shift().trim();if(i){var n=r.join(":").trim();t.append(i,n)}})),t)};i.url="responseURL"in s?s.responseURL:i.headers.get("X-Request-URL");var n="response"in s?s.response:s.responseText;setTimeout((function(){r(new B(n,i))}),0)},s.onerror=function(){setTimeout((function(){i(new TypeError("Network request failed"))}),0)},s.ontimeout=function(){setTimeout((function(){i(new TypeError("Network request failed"))}),0)},s.onabort=function(){setTimeout((function(){i(new U("Aborted","AbortError"))}),0)},s.open(n.method,function(e){try{return""===e&&d.location.href?d.location.href:e}catch(t){return e}}(n.url),!0),"include"===n.credentials?s.withCredentials=!0:"omit"===n.credentials&&(s.withCredentials=!1),"responseType"in s&&(p.blob?s.responseType="blob":p.arrayBuffer&&n.headers.get("Content-Type")&&-1!==n.headers.get("Content-Type").indexOf("application/octet-stream")&&(s.responseType="arraybuffer")),!t||"object"!=typeof t.headers||t.headers instanceof v?n.headers.forEach((function(e,t){s.setRequestHeader(t,e)})):Object.getOwnPropertyNames(t.headers).forEach((function(e){s.setRequestHeader(e,y(t.headers[e]))})),n.signal&&(n.signal.addEventListener("abort",o),s.onreadystatechange=function(){4===s.readyState&&n.signal.removeEventListener("abort",o)}),s.send(void 0===n._bodyInit?null:n._bodyInit)}))}P.polyfill=!0,d.fetch||(d.fetch=P,d.Headers=v,d.Request=x,d.Response=B),window.postMessage=function(e){(0,c.pm)({origin:"http://127.0.0.1/:3000",target:window,data:e})}})()})();