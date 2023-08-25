(()=>{var __webpack_modules__={106:function(){var NO_JQUERY={};!function(e,t,r){if(!("console"in e)){var n=e.console={};n.log=n.warn=n.error=n.debug=function(){}}t===NO_JQUERY&&(t={fn:{},extend:function(){for(var e=arguments[0],t=1,r=arguments.length;t<r;t++){var n=arguments[t];for(var s in n)e[s]=n[s]}return e}}),t.fn.pm=function(){return console.log("usage: \nto send:    $.pm(options)\nto receive: $.pm.bind(type, fn, [origin])"),this},t.pm=e.pm=function(e){s.send(e)},t.pm.bind=e.pm.bind=function(e,t,r,n,i){s.bind(e,t,r,n,!0===i)},t.pm.unbind=e.pm.unbind=function(e,t){s.unbind(e,t)},t.pm.origin=e.pm.origin=null,t.pm.poll=e.pm.poll=200;var s={send:function(e){var r=t.extend({},s.defaults,e),n=r.target;if(r.target)if(r.type){var i={data:r.data,type:r.type};r.success&&(i.callback=s._callback(r.success)),r.error&&(i.errback=s._callback(r.error)),"postMessage"in n&&!r.hash?(s._bind(),n.postMessage(JSON.stringify(i),r.origin||"*")):(s.hash._bind(),s.hash.send(r,i))}else console.warn("postmessage type required");else console.warn("postmessage target window required")},bind:function(e,t,r,n,i){s._replyBind(e,t,r,n,i)},_replyBind:function(r,n,i,o,a){"postMessage"in e&&!o?s._bind():s.hash._bind();var l=s.data("listeners.postmessage");l||(l={},s.data("listeners.postmessage",l));var u=l[r];u||(u=[],l[r]=u),u.push({fn:n,callback:a,origin:i||t.pm.origin})},unbind:function(e,t){var r=s.data("listeners.postmessage");if(r)if(e)if(t){var n=r[e];if(n){for(var i=[],o=0,a=n.length;o<a;o++){var l=n[o];l.fn!==t&&i.push(l)}r[e]=i}}else delete r[e];else for(var o in r)delete r[o]},data:function(e,t){return void 0===t?s._data[e]:(s._data[e]=t,t)},_data:{},_CHARS:"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),_random:function(){for(var e=[],t=0;t<32;t++)e[t]=s._CHARS[0|32*Math.random()];return e.join("")},_callback:function(e){var t=s.data("callbacks.postmessage");t||(t={},s.data("callbacks.postmessage",t));var r=s._random();return t[r]=e,r},_bind:function(){s.data("listening.postmessage")||(e.addEventListener?e.addEventListener("message",s._dispatch,!1):e.attachEvent&&e.attachEvent("onmessage",s._dispatch),s.data("listening.postmessage",1))},_dispatch:function(e){try{var t=JSON.parse(e.data)}catch(c){return void console.warn("postmessage data invalid json: ",c)}if(t.type){var r=(s.data("callbacks.postmessage")||{})[t.type];if(r)r(t.data);else for(var n=(s.data("listeners.postmessage")||{})[t.type]||[],i=0,o=n.length;i<o;i++){var a=n[i];if(a.origin&&"*"!==a.origin&&e.origin!==a.origin){if(console.warn("postmessage message origin mismatch",e.origin,a.origin),t.errback){var l={message:"postmessage origin mismatch",origin:[e.origin,a.origin]};s.send({target:e.source,data:l,type:t.errback})}}else try{a.callback?a.fn(t.data,u,e):u(a.fn(t.data,e))}catch(h){if(!t.errback)throw h;s.send({target:e.source,data:h,type:t.errback})}function u(r){t.callback&&s.send({target:e.source,data:r,type:t.callback})}}}else console.warn("postmessage message type required")}};s.hash={send:function(t,r){var n=t.target,i=t.url;if(i){i=s.hash._url(i);var o,a=s.hash._url(e.location.href);if(e==n.parent)o="parent";else try{for(var l=0,u=parent.frames.length;l<u;l++)if(parent.frames[l]==e){o=l;break}}catch(t){o=e.name}if(null!=o){var c={"x-requested-with":"postmessage",source:{name:o,url:a},postmessage:r},h="#x-postmessage-id="+s._random();n.location=i+h+encodeURIComponent(JSON.stringify(c))}else console.warn("postmessage windows must be direct parent/child windows and the child must be available through the parent window.frames list")}else console.warn("postmessage target window url is required")},_regex:/^\#x\-postmessage\-id\=(\w{32})/,_regex_len:50,_bind:function(){s.data("polling.postmessage")||(setInterval((function(){var t=""+e.location.hash,r=s.hash._regex.exec(t);if(r){var n=r[1];s.hash._last!==n&&(s.hash._last=n,s.hash._dispatch(t.substring(s.hash._regex_len)))}}),t.pm.poll||200),s.data("polling.postmessage",1))},_dispatch:function(t){if(t){try{if(!("postmessage"===(t=JSON.parse(decodeURIComponent(t)))["x-requested-with"]&&t.source&&null!=t.source.name&&t.source.url&&t.postmessage))return}catch(p){return}var r=t.postmessage,n=(s.data("callbacks.postmessage")||{})[r.type];if(n)n(r.data);else{var i;i="parent"===t.source.name?e.parent:e.frames[t.source.name];for(var o=(s.data("listeners.postmessage")||{})[r.type]||[],a=0,l=o.length;a<l;a++){var u=o[a];if(u.origin){var c=/https?\:\/\/[^\/]*/.exec(t.source.url)[0];if("*"!==u.origin&&c!==u.origin){if(console.warn("postmessage message origin mismatch",c,u.origin),r.errback){var h={message:"postmessage origin mismatch",origin:[c,u.origin]};s.send({target:i,data:h,type:r.errback,hash:!0,url:t.source.url})}continue}}function d(e){r.callback&&s.send({target:i,data:e,type:r.callback,hash:!0,url:t.source.url})}try{u.callback?u.fn(r.data,d):d(u.fn(r.data))}catch(m){if(!r.errback)throw m;s.send({target:i,data:m,type:r.errback,hash:!0,url:t.source.url})}}}}},_url:function(e){return(""+e).replace(/#.*$/,"")}},t.extend(s,{defaults:{target:null,url:null,type:null,data:null,success:null,error:null,origin:"*",hash:!1}})}(this,"undefined"==typeof jQuery?NO_JQUERY:jQuery),"JSON"in window&&window.JSON||(JSON={}),function(){function f(e){return e<10?"0"+e:e}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(e){return this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z"},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(e){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(e){return escapable.lastIndex=0,escapable.test(e)?'"'+e.replace(escapable,(function(e){var t=meta[e];return"string"==typeof t?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)}))+'"':'"'+e+'"'}function str(e,t){var r,n,s,i,o,a=gap,l=t[e];switch(l&&"object"==typeof l&&"function"==typeof l.toJSON&&(l=l.toJSON(e)),"function"==typeof rep&&(l=rep.call(t,e,l)),typeof l){case"string":return quote(l);case"number":return isFinite(l)?String(l):"null";case"boolean":case"null":return String(l);case"object":if(!l)return"null";if(gap+=indent,o=[],"[object Array]"===Object.prototype.toString.apply(l)){for(i=l.length,r=0;r<i;r+=1)o[r]=str(r,l)||"null";return s=0===o.length?"[]":gap?"[\n"+gap+o.join(",\n"+gap)+"\n"+a+"]":"["+o.join(",")+"]",gap=a,s}if(rep&&"object"==typeof rep)for(i=rep.length,r=0;r<i;r+=1)"string"==typeof(n=rep[r])&&(s=str(n,l))&&o.push(quote(n)+(gap?": ":":")+s);else for(n in l)Object.hasOwnProperty.call(l,n)&&(s=str(n,l))&&o.push(quote(n)+(gap?": ":":")+s);return s=0===o.length?"{}":gap?"{\n"+gap+o.join(",\n"+gap)+"\n"+a+"}":"{"+o.join(",")+"}",gap=a,s}}"function"!=typeof JSON.stringify&&(JSON.stringify=function(e,t,r){var n;if(gap="",indent="","number"==typeof r)for(n=0;n<r;n+=1)indent+=" ";else"string"==typeof r&&(indent=r);if(rep=t,t&&"function"!=typeof t&&("object"!=typeof t||"number"!=typeof t.length))throw new Error("JSON.stringify");return str("",{"":e})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){var j;function walk(e,t){var r,n,s=e[t];if(s&&"object"==typeof s)for(r in s)Object.hasOwnProperty.call(s,r)&&(void 0!==(n=walk(s,r))?s[r]=n:delete s[r]);return reviver.call(e,t,s)}if(cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,(function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)}))),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}()}},__webpack_module_cache__={};function __webpack_require__(e){var t=__webpack_module_cache__[e];if(void 0!==t)return t.exports;var r=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e].call(r.exports,r,r.exports,__webpack_require__),r.exports}var __webpack_exports__={};(()=>{"use strict";const e=new RegExp("^s+|s+$","g"),t=["input","textarea"];function r(e){return t.indexOf(e.tagName.toLowerCase())>-1}window.GUIComponentsDefinedElements={};class n extends HTMLElement{get instanceType(){return"BaseComponent"}setupTemplate(e,t){if(!this.isConnected)return console.log(`DEBUG: component ${this.tagName} was not initialized because it was disconnected from the DOM!`);this.template=e.template,t(e.template)}}class s{get instanceType(){return"Validator"}static isFormElement(e){for(e=e.parentElement;e;){if("GAMEFACE-FORM-CONTROL"===e.tagName||"gameface-form-control"===e.tagName)return!0;e=e.parentElement}return!1}static tooLong(){return!1}static tooShort(){return!1}static rangeOverflow(){return!1}static rangeUnderflow(){return!1}static valueMissing(e){return e.hasAttribute("required")&&!e.value}static nameMissing(e){return!e.name&&!e.getAttribute("name")}static isRequired(e){return e.hasAttribute("required")}static customError(){return!1}static willSerialize(e){return!this.nameMissing(e)}static isBadURL(){return!1}static isBadEmail(){return!1}}class i{get instanceType(){return"NativeElementValidator"}constructor(e){this.element=e}isFormElement(){return s.isFormElement(this.element)}tooLong(){return r(this.element)?a.tooLong(this.element):s.tooLong()}tooShort(){return r(this.element)?a.tooShort(this.element):s.tooShort()}rangeOverflow(){return r(this.element)?a.rangeOverflow(this.element):s.rangeOverflow()}rangeUnderflow(){return r(this.element)?a.rangeUnderflow(this.element):s.rangeUnderflow()}valueMissing(){return s.valueMissing(this.element)}nameMissing(){return s.nameMissing(this.element)}customError(){return s.customError()}isRequired(){return s.isRequired(this.element)}willSerialize(){return s.willSerialize(this.element)}isBadEmail(){return!!r(this.element)&&a.isBadEmail(this.element)}isBadURL(){return!!r(this.element)&&a.isBadURL(this.element)}}class o extends n{get instanceType(){return"CustomElementValidator"}isFormElement(){return s.isFormElement(this)}tooLong(){return s.tooLong(this)}tooShort(){return s.tooShort(this)}valueMissing(){return s.valueMissing(this)}nameMissing(){return s.nameMissing(this)}customError(){return s.customError()}isRequired(){return s.isRequired(this)}rangeOverflow(){return s.rangeOverflow(this)}rangeUnderflow(){return s.rangeUnderflow(this)}willSerialize(){return s.willSerialize(this)}isBadEmail(){return s.isBadEmail(this)}isBadURL(){return s.isBadURL(this)}}class a{get instanceType(){return"TextFieldValidator"}static tooLong(e){const t=e.getAttribute("maxlength");return!!t&&e.value.length>parseFloat(t)}static tooShort(e){const t=e.getAttribute("minlength");return!!t&&e.value.length<parseFloat(t)}static rangeOverflow(e){const t=e.getAttribute("max");return!!t&&parseFloat(e.value)>parseFloat(t)}static rangeUnderflow(e){const t=e.getAttribute("min");return!!t&&parseFloat(e.value)<parseFloat(t)}static isBadURL(e){if("url"!==e.getAttribute("type"))return!1;const t=e.pattern||e.getAttribute("pattern");return!!t&&!e.value.match(t)}static isBadEmail(e){return"email"===e.getAttribute("type")&&!e.value.match("@")}}const l=new function(){const t="component-slot",r={DOWN:40,LEFT:37,RIGHT:39,UP:38,HOME:36,END:35,ENTER:13,ESCAPE:27,TAB:9,SHIFT:16,CTRL:17,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,LETTER_A:65},l=new class{constructor(){this.imported=this.imported||[],this.KEYCODES=r,this.cachedComponents={},this.CustomElementValidator=o,this.NativeElementValidator=i,this.TextFieldValidator=a,this.Validator=s,this.BaseComponent=n}importScript(e){const t=document.createElement("script");t.setAttribute("src",e),document.body.appendChild(t)}loadHTML(e){return this.loadResource(e).then((e=>e.template))}whenDefined(e){if(void 0!==window.GUIComponentsDefinedElements[e])return window.GUIComponentsDefinedElements[e].promise;const t=window.GUIComponentsDefinedElements[e]={};return t.promise=new Promise(((e,r)=>{t.resolve=e,t.reject=r})),t.promise}defineCustomElement(e,t){window.GUIComponentsDefinedElements[e]||customElements.get(e)||(this.whenDefined(e),customElements.define(e,t),window.GUIComponentsDefinedElements[e].resolve(t))}importComponent(e){requestAnimationFrame((()=>{this.importScript(e+"/script.js")}))}removeSlashes(e){return e.replace(/[/|\\]/g,"")}removeNewLines(t){return t.replace(e,"").trim()}removeCopyrightNotice(e){return e.replace("\x3c!--Copyright (c) Coherent Labs AD. All rights reserved. Licensed under the MIT License. See License.txt in the project root for license information. --\x3e","").trim()}resolveWithTemplate(e){return new Promise((t=>{t({template:e.template,url:e.url})}))}loadResource(e){if(e.template&&"string"==typeof e.template){if(e.isRendered)return this.resolveWithTemplate(e);const t=this.removeCopyrightNotice(e.template);return new Promise((r=>{r({template:this.removeNewLines(t),url:e.url})}))}if("object"==typeof e.template&&e.isRendered)return this.resolveWithTemplate(e);if(window.__optimize){const t=this.removeSlashes(e.url),r=document.getElementById(t).firstChild;return r?new Promise((t=>{t({template:r.innerHTML,url:e.url})})):this.requestResource(e.url)}return this.requestResource(e.url)}requestResource(e){const t=new XMLHttpRequest,r=new Promise((function(r,n){t.onload=s=>{200==t.status?r({template:t.responseText,url:e}):n(s)},t.onerror=n}));return t.open("GET",e),t.send(),r}findSlots(e,r,n={}){const s=e.children,i=s.length;for(let e=0;e<i;++e){const i=s[e],o=i.tagName.toLowerCase();if("component-slot"===o){const e=i.dataset.name;n[e]||(n[e]=[]),n[e].push(i),this.findSlots(i,r,n)}else if(i.hasAttribute("slot")){const e=i.getAttribute("slot");n[e]||(n[e]=[]),n[e].push(i),this.findSlots(i,r,n)}else("gameface-scrollable-container"===o||o!==t&&r!==o&&!window.GUIComponentsDefinedElements[o])&&this.findSlots(i,r,n)}return n}replaceSlots(e,t){const r=t[0];if(e.length&&r.childNodes.length)for(;r.firstChild;)r.removeChild(r.lastChild);const n=r.parentNode;n.removeChild(r);for(let t=0;t<e.length;++t)n.appendChild(e[t])}transferContent(e,t){for(;t.childNodes.length>0;){const e=t.childNodes;t.removeChild(e[e.length-1])}for(;e.childNodes.length>0;){const r=e.childNodes[0];e.removeChild(r),t.appendChild(r)}}renderOnce(e){return!e.isRendered&&(this.render(e),e.isRendered=!0,!0)}render(e){const t=document.createElement("div");t.innerHTML=e.template;const r=e.tagName.toLowerCase(),n=this.findSlots(t,r),s=this.findSlots(e,r),i=Object.keys(s);if(Object.keys(n).length)for(const e of i)s[e]&&n[e]&&this.replaceSlots(s[e],n[e]);this.transferContent(t,e)}transferChildren(e,t,r){const n=document.createElement("div");n.innerHTML=e.template;const s=n.querySelector(t);r.forEach((e=>s.appendChild(e))),this.transferContent(n,e)}waitForFrames(e=(()=>{}),t=3){if(0===t)return e();t--,requestAnimationFrame((()=>this.waitForFrames(e,t)))}isBrowserGameface(){return navigator.userAgent.match("Cohtml")}};class u extends HTMLElement{constructor(){super(),this.originalAppendChild=this.appendChild,this.originalInsertBefore=this.insertBefore,this.originalReplaceChild=this.replaceChild,this.originalRemoveChild=this.removeChild,this.appendChild=e=>{const t=this.originalAppendChild(e);return this.disptachSlotChange(t),t},this.insertBefore=(e,t)=>{const r=this.originalInsertBefore(e,t);return this.disptachSlotChange(r),r},this.replaceChild=(e,t)=>{const r=this.originalReplaceChild(e,t);return this.disptachSlotChange(r),r},this.removeChild=e=>{const t=this.originalRemoveChild(e);return this.disptachSlotChange(t),t}}disptachSlotChange(e){this.dispatchEvent(new CustomEvent("slotchange"),{target:this,child:e})}}return l.defineCustomElement(t,u),l},u=l.BaseComponent;l.defineCustomElement("gameface-radial-menu",class extends u{constructor(){super(),this.template=' <div class="guic-radial-menu"> <div class="guic-radial-menu-center"> <div class="guic-radial-menu-center-bullseye"></div> <div class="guic-radial-menu-center-text">Radial Menu</div> <div class="guic-radial-menu-center-bullseye-outer"></div> </div> <div class="guic-radial-menu-items"> <div class="guic-radial-menu-selector"> <div class="guic-radial-menu-selector-bg-1"> <div class="guic-radial-menu-selector-bg-2"></div> </div> </div> </div> </div> ',this._items=[],this.changeItemEvent={},this.selectItemEvent={},this.openKeyCode=0,this.itemsCount=0,this.radialMenuCenter={x:0,y:0},this.itemSelector={},this.segmentDegrees=0,this.currentSegmentId=0,this.radialMenuTemplateWrapper={},this.init=this.init.bind(this)}set items(e){this._items=e,this.initRadialMenu()}get items(){return this._items}init(e){this.setupTemplate(e,(()=>{l.renderOnce(this)}))}connectedCallback(){l.loadResource(this).then(this.init).catch((e=>console.error(e)))}disconnectedCallback(){this.removeOpenKeyEvent(),this.closeAndRemoveEventListeners()}setSelectorSize(){if(2===this.itemsCount)return void(this.itemSelector.style.clipPath="polygon(0% 50%, 0% 0%, 100% 0%, 100% 50%)");const e=this.segmentDegrees/2,t=Math.tan(e*Math.PI/180)/2*100,r=50-t+1e-5,n=50+t+1e-5;this.itemSelector.style.clipPath=`polygon(50% 50%, ${r}% 0%, ${n}% 0%)`}rotateElement(e,t){e.style.transform=`rotate(${t}deg)`}populateItems(){const e=this.getElementsByClassName("guic-radial-menu-items")[0];this.segmentDegrees=360/this.itemsCount;for(let t=0;t<this.itemsCount;t++){const r=this.items[t].imagePath,n=this.segmentDegrees*t,s=document.createElement("div");this.rotateElement(s,n),s.className="guic-radial-menu-item";const i=document.createElement("div");this.rotateElement(i,-1*this.segmentDegrees*t),i.className="guic-radial-menu-item-icon",i.style.backgroundImage=`url('${r}')`,s.appendChild(i),e.appendChild(s)}}getSegment(e,t,r,n){const s={x:0,y:0};s.x=e.x-t.x,s.y=e.y-t.y;let i=Math.atan2(-s.y,s.x);i+=n/180*Math.PI,i<0&&(i=2*Math.PI+i);const o=2*Math.PI/r;return Math.floor(i/o)}hasHighlightedSegmentChanged(e){return(0!==e||this.currentSegmentId-e!=0)&&this.currentSegmentId!==this.itemsCount-e}updateSegmentPosition(e){const t={x:0,y:0};t.x=e.clientX,t.y=e.clientY;const r=this.getSegment(t,this.radialMenuCenter,this.itemsCount,this.segmentDegrees/2-90);this.hasHighlightedSegmentChanged(r)&&(this.currentSegmentId=0===r?0:this.itemsCount-r,this.dispatchEvent(this.changeItemEvent),this.rotateElement(this.itemSelector,r*-this.segmentDegrees))}selectAndClose(){this.classList.remove("guic-radial-menu-open"),this.closeAndRemoveEventListeners(),this.dispatchEvent(this.selectItemEvent)}updateRadialMenuCenterXY(){const e=this.radialMenuTemplateWrapper.getBoundingClientRect();this.radialMenuCenter.x=e.left+e.width/2,this.radialMenuCenter.y=e.top+e.height/2}closeAndRemoveEventListeners(){window.removeEventListener("mousemove",this.updateSegmentPosition),window.removeEventListener("click",this.selectAndClose),window.removeEventListener("resize",this.updateRadialMenuCenterXY),window.removeEventListener("keyup",this.selectAndClose)}openAndAddEventListeners(){requestAnimationFrame((()=>{requestAnimationFrame((()=>{this.updateRadialMenuCenterXY(),window.addEventListener("mousemove",this.updateSegmentPosition),window.addEventListener("click",this.selectAndClose),window.addEventListener("resize",this.updateRadialMenuCenterXY),window.addEventListener("keyup",this.selectAndClose),this.classList.add("guic-radial-menu-open")}))}))}assignOpenKey(){const e=this.dataset.openKeyCode.toUpperCase();l.KEYCODES[e]?this.openKeyCode=l.KEYCODES[e]:Number(e)?this.openKeyCode=Number(e):console.log("Provided key value for opening "+this.dataset.name+" is not a number and doesn't exist in Components library's KEYCODES object.")}onOpenKeyPressed(e){e.repeat||e.keyCode!==this.openKeyCode||this.openAndAddEventListeners()}addOpenKeyEvent(){window.addEventListener("keydown",this.onOpenKeyPressed)}removeOpenKeyEvent(){window.removeEventListener("keydown",this.onOpenKeyPressed)}initRadialMenu(){this.openKeyCode=parseInt(this.dataset.openKeyCode),this.itemsCount=this.items.length,this.changeItemEvent=new CustomEvent(this.dataset.changeEventName),this.selectItemEvent=new CustomEvent(this.dataset.selectEventName),this.onOpenKeyPressed=this.onOpenKeyPressed.bind(this),this.updateSegmentPosition=this.updateSegmentPosition.bind(this),this.selectAndClose=this.selectAndClose.bind(this),this.updateRadialMenuCenterXY=this.updateRadialMenuCenterXY.bind(this),this.radialMenuTemplateWrapper=this.querySelector(".guic-radial-menu"),this.itemSelector=this.querySelector(".guic-radial-menu-selector"),this.querySelector(".guic-radial-menu-center-text").textContent=this.dataset.name,this.populateItems(),this.setSelectorSize(),this.rotateElement(this.itemSelector,0),this.assignOpenKey(),this.addOpenKeyEvent()}});var c=__webpack_require__(106),h="undefined"!=typeof globalThis&&globalThis||"undefined"!=typeof self&&self||void 0!==h&&h,d={searchParams:"URLSearchParams"in h,iterable:"Symbol"in h&&"iterator"in Symbol,blob:"FileReader"in h&&"Blob"in h&&function(){try{return new Blob,!0}catch(e){return!1}}(),formData:"FormData"in h,arrayBuffer:"ArrayBuffer"in h};if(d.arrayBuffer)var p=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],m=ArrayBuffer.isView||function(e){return e&&p.indexOf(Object.prototype.toString.call(e))>-1};function f(e){if("string"!=typeof e&&(e=String(e)),/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(e)||""===e)throw new TypeError("Invalid character in header field name");return e.toLowerCase()}function g(e){return"string"!=typeof e&&(e=String(e)),e}function y(e){var t={next:function(){var t=e.shift();return{done:void 0===t,value:t}}};return d.iterable&&(t[Symbol.iterator]=function(){return t}),t}function b(e){this.map={},e instanceof b?e.forEach((function(e,t){this.append(t,e)}),this):Array.isArray(e)?e.forEach((function(e){this.append(e[0],e[1])}),this):e&&Object.getOwnPropertyNames(e).forEach((function(t){this.append(t,e[t])}),this)}function v(e){if(e.bodyUsed)return Promise.reject(new TypeError("Already read"));e.bodyUsed=!0}function w(e){return new Promise((function(t,r){e.onload=function(){t(e.result)},e.onerror=function(){r(e.error)}}))}function E(e){var t=new FileReader,r=w(t);return t.readAsArrayBuffer(e),r}function _(e){if(e.slice)return e.slice(0);var t=new Uint8Array(e.byteLength);return t.set(new Uint8Array(e)),t.buffer}function C(){return this.bodyUsed=!1,this._initBody=function(e){var t;this.bodyUsed=this.bodyUsed,this._bodyInit=e,e?"string"==typeof e?this._bodyText=e:d.blob&&Blob.prototype.isPrototypeOf(e)?this._bodyBlob=e:d.formData&&FormData.prototype.isPrototypeOf(e)?this._bodyFormData=e:d.searchParams&&URLSearchParams.prototype.isPrototypeOf(e)?this._bodyText=e.toString():d.arrayBuffer&&d.blob&&(t=e)&&DataView.prototype.isPrototypeOf(t)?(this._bodyArrayBuffer=_(e.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):d.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(e)||m(e))?this._bodyArrayBuffer=_(e):this._bodyText=e=Object.prototype.toString.call(e):this._bodyText="",this.headers.get("content-type")||("string"==typeof e?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):d.searchParams&&URLSearchParams.prototype.isPrototypeOf(e)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},d.blob&&(this.blob=function(){var e=v(this);if(e)return e;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?v(this)||(ArrayBuffer.isView(this._bodyArrayBuffer)?Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset,this._bodyArrayBuffer.byteOffset+this._bodyArrayBuffer.byteLength)):Promise.resolve(this._bodyArrayBuffer)):this.blob().then(E)}),this.text=function(){var e,t,r,n=v(this);if(n)return n;if(this._bodyBlob)return e=this._bodyBlob,r=w(t=new FileReader),t.readAsText(e),r;if(this._bodyArrayBuffer)return Promise.resolve(function(e){for(var t=new Uint8Array(e),r=new Array(t.length),n=0;n<t.length;n++)r[n]=String.fromCharCode(t[n]);return r.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},d.formData&&(this.formData=function(){return this.text().then(x)}),this.json=function(){return this.text().then(JSON.parse)},this}b.prototype.append=function(e,t){e=f(e),t=g(t);var r=this.map[e];this.map[e]=r?r+", "+t:t},b.prototype.delete=function(e){delete this.map[f(e)]},b.prototype.get=function(e){return e=f(e),this.has(e)?this.map[e]:null},b.prototype.has=function(e){return this.map.hasOwnProperty(f(e))},b.prototype.set=function(e,t){this.map[f(e)]=g(t)},b.prototype.forEach=function(e,t){for(var r in this.map)this.map.hasOwnProperty(r)&&e.call(t,this.map[r],r,this)},b.prototype.keys=function(){var e=[];return this.forEach((function(t,r){e.push(r)})),y(e)},b.prototype.values=function(){var e=[];return this.forEach((function(t){e.push(t)})),y(e)},b.prototype.entries=function(){var e=[];return this.forEach((function(t,r){e.push([r,t])})),y(e)},d.iterable&&(b.prototype[Symbol.iterator]=b.prototype.entries);var S=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function A(e,t){if(!(this instanceof A))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');var r,n,s=(t=t||{}).body;if(e instanceof A){if(e.bodyUsed)throw new TypeError("Already read");this.url=e.url,this.credentials=e.credentials,t.headers||(this.headers=new b(e.headers)),this.method=e.method,this.mode=e.mode,this.signal=e.signal,s||null==e._bodyInit||(s=e._bodyInit,e.bodyUsed=!0)}else this.url=String(e);if(this.credentials=t.credentials||this.credentials||"same-origin",!t.headers&&this.headers||(this.headers=new b(t.headers)),this.method=(n=(r=t.method||this.method||"GET").toUpperCase(),S.indexOf(n)>-1?n:r),this.mode=t.mode||this.mode||null,this.signal=t.signal||this.signal,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&s)throw new TypeError("Body not allowed for GET or HEAD requests");if(this._initBody(s),!("GET"!==this.method&&"HEAD"!==this.method||"no-store"!==t.cache&&"no-cache"!==t.cache)){var i=/([?&])_=[^&]*/;i.test(this.url)?this.url=this.url.replace(i,"$1_="+(new Date).getTime()):this.url+=(/\?/.test(this.url)?"&":"?")+"_="+(new Date).getTime()}}function x(e){var t=new FormData;return e.trim().split("&").forEach((function(e){if(e){var r=e.split("="),n=r.shift().replace(/\+/g," "),s=r.join("=").replace(/\+/g," ");t.append(decodeURIComponent(n),decodeURIComponent(s))}})),t}function O(e,t){if(!(this instanceof O))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');t||(t={}),this.type="default",this.status=void 0===t.status?200:t.status,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in t?t.statusText:"",this.headers=new b(t.headers),this.url=t.url||"",this._initBody(e)}A.prototype.clone=function(){return new A(this,{body:this._bodyInit})},C.call(A.prototype),C.call(O.prototype),O.prototype.clone=function(){return new O(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new b(this.headers),url:this.url})},O.error=function(){var e=new O(null,{status:0,statusText:""});return e.type="error",e};var T=[301,302,303,307,308];O.redirect=function(e,t){if(-1===T.indexOf(t))throw new RangeError("Invalid status code");return new O(null,{status:t,headers:{location:e}})};var R=h.DOMException;try{new R}catch(e){(R=function(e,t){this.message=e,this.name=t;var r=Error(e);this.stack=r.stack}).prototype=Object.create(Error.prototype),R.prototype.constructor=R}function B(e,t){return new Promise((function(r,n){var s=new A(e,t);if(s.signal&&s.signal.aborted)return n(new R("Aborted","AbortError"));var i=new XMLHttpRequest;function o(){i.abort()}i.onload=function(){var e,t,n={status:i.status,statusText:i.statusText,headers:(e=i.getAllResponseHeaders()||"",t=new b,e.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach((function(e){var r=e.split(":"),n=r.shift().trim();if(n){var s=r.join(":").trim();t.append(n,s)}})),t)};n.url="responseURL"in i?i.responseURL:n.headers.get("X-Request-URL");var s="response"in i?i.response:i.responseText;setTimeout((function(){r(new O(s,n))}),0)},i.onerror=function(){setTimeout((function(){n(new TypeError("Network request failed"))}),0)},i.ontimeout=function(){setTimeout((function(){n(new TypeError("Network request failed"))}),0)},i.onabort=function(){setTimeout((function(){n(new R("Aborted","AbortError"))}),0)},i.open(s.method,function(e){try{return""===e&&h.location.href?h.location.href:e}catch(t){return e}}(s.url),!0),"include"===s.credentials?i.withCredentials=!0:"omit"===s.credentials&&(i.withCredentials=!1),"responseType"in i&&(d.blob?i.responseType="blob":d.arrayBuffer&&s.headers.get("Content-Type")&&-1!==s.headers.get("Content-Type").indexOf("application/octet-stream")&&(i.responseType="arraybuffer")),!t||"object"!=typeof t.headers||t.headers instanceof b?s.headers.forEach((function(e,t){i.setRequestHeader(t,e)})):Object.getOwnPropertyNames(t.headers).forEach((function(e){i.setRequestHeader(e,g(t.headers[e]))})),s.signal&&(s.signal.addEventListener("abort",o),i.onreadystatechange=function(){4===i.readyState&&s.signal.removeEventListener("abort",o)}),i.send(void 0===s._bodyInit?null:s._bodyInit)}))}B.polyfill=!0,h.fetch||(h.fetch=B,h.Headers=b,h.Request=A,h.Response=O),window.postMessage=function(e){(0,c.pm)({origin:"http://127.0.0.1/:3000",target:window,data:e})}})()})();