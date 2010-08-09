/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.2.0PR1
build: nightly
*/
YUI.add("frame",function(B){var A=function(){A.superclass.constructor.apply(this,arguments);};B.extend(A,B.Base,{_ready:null,_rendered:null,_iframe:null,_instance:null,_create:function(){var E,D,C;this._iframe=B.Node.create(A.HTML);this._iframe.setStyle("visibility","hidden");this._iframe.set("src",this.get("src"));this.get("container").append(this._iframe);C=this._resolveWinDoc();E=C.win;D=C.doc;return{win:E,doc:D};},_resolveWinDoc:function(D){var C=(D)?D:{};C.win=B.Node.getDOMNode(this._iframe.get("contentWindow"));C.doc=B.Node.getDOMNode(this._iframe.get("contentWindow.document"));if(!C.doc){C.doc=B.config.doc;}if(!C.win){C.win=B.config.win;}return C;},_onDomEvent:function(E){var D=this._iframe.getXY(),C=this._instance.one("win");E.frameX=D[0]+E.pageX-C.get("scrollLeft");E.frameY=D[1]+E.pageY-C.get("scrollTop");E.frameTarget=E.target;E.frameCurrentTarget=E.currentTarget;E.frameEvent=E;this.publish(E.type,{emitFacade:true,stoppedFn:B.bind(function(G,F){G.halt();},this,E),preventedFn:B.bind(function(G,F){G.preventDefault();},this,E)});this.fire(E.type,E);},initializer:function(){this.publish("ready",{emitFacade:true,defaultFn:this._defReadyFn});},destructor:function(){var C=this.getInstance();C.one("doc").detachAll();C=null;this._iframe.remove();},_DOMPaste:function(F){var D=this.getInstance(),C="",E=D.config.win;if(F._event.originalTarget){C=F._event.originalTarget;}if(F._event.clipboardData){C=F._event.clipboardData.getData("Text");}if(E.clipboardData){C=E.clipboardData.getData("Text");if(C==""){if(!E.clipboardData.setData("Text",C)){C=null;}}}F.frameTarget=F.target;F.frameCurrentTarget=F.currentTarget;F.frameEvent=F;if(C){F.clipboardData={data:C,getData:function(){return C;}};}else{F.clipboardData=null;}this.fire("paste",F);},_defReadyFn:function(){var D=this.getInstance(),C=B.bind(this._onDomEvent,this);D.Node.DOM_EVENTS.paste=1;B.each(D.Node.DOM_EVENTS,function(F,E){if(F===1){if(E!=="focus"&&E!=="blur"&&E!=="paste"){D.on(E,C,D.config.doc);}}});D.on("paste",B.bind(this._DOMPaste,this),D.one("body"));D.on("focus",C,D.config.win);D.on("blur",C,D.config.win);D._use=D.use;D.use=B.bind(this.use,this);this._iframe.setStyles({visibility:"inherit"});D.one("body").setStyle("display","block");},_onContentReady:function(E){if(!this._ready){this._ready=true;var D=this.getInstance(),C=B.clone(this.get("use"));this.fire("contentready");if(E){D.config.doc=B.Node.getDOMNode(E.target);}C.push(B.bind(function(){this.fire("ready");},this));D.use.apply(D,C);D.one("doc").get("documentElement").addClass("yui-js-enabled");}},_resolveBaseHref:function(C){if(!C||C===""){C=B.config.doc.location.href;if(C.indexOf("?")!==-1){C=C.substring(0,C.indexOf("?"));}C=C.substring(0,C.lastIndexOf("/"))+"/";}return C;},_getHTML:function(C){if(this._ready){var D=this.getInstance();C=D.one("body").get("innerHTML");}return C;},_setHTML:function(C){if(this._ready){var D=this.getInstance();D.one("body").set("innerHTML",C);}else{this.on("contentready",B.bind(function(E,G){var F=this.getInstance();F.one("body").set("innerHTML",E);},this,C));}return C;},_setExtraCSS:function(C){if(this._ready){var E=this.getInstance(),D=E.get("#extra_css");D.remove();E.one("head").append('<style id="extra_css">'+C+"</style>");}return C;},_instanceLoaded:function(E){this._instance=E;this._instance.on("contentready",B.bind(this._onContentReady,this),"body");var C="",D=((this.get("extracss"))?'<style id="extra_css">'+this.get("extracss")+"</style>":""),F=this._instance.config.doc;C=B.substitute(A.PAGE_HTML,{DIR:this.get("dir"),LANG:this.get("lang"),TITLE:this.get("title"),META:A.META,CONTENT:this.get("content"),BASE_HREF:this.get("basehref"),DEFAULT_CSS:A.DEFAULT_CSS,EXTRA_CSS:D});if(B.config.doc.compatMode!="BackCompat"){C=A.DOC_TYPE+"\n"+C;}else{}F.open();F.write(C);F.close();if(this.get("designMode")){F.designMode="on";if(!B.UA.ie){this._instance.on("domready",function(H){try{F.execCommand("styleWithCSS",false,false);F.execCommand("insertbronreturn",false,false);}catch(G){}});}}},use:function(){var E=this.getInstance(),D=B.Array(arguments),C=false;if(B.Lang.isFunction(D[D.length-1])){C=D.pop();}if(C){D.push(function(){C.apply(E,arguments);});}E._use.apply(E,D);},delegate:function(E,D,C,G){var F=this.getInstance();if(!F){return false;}if(!G){G=C;C="body";}return F.delegate(E,D,C,G);},getInstance:function(){return this._instance;},render:function(H){if(this._rendered){return this;}this._rendered=true;if(H){this.set("container",H);}var I,J,F=this._create(),C=B.bind(function(K){this._instanceLoaded(K);},this),E=B.clone(this.get("use")),D={debug:false,bootstrap:false,win:F.win,doc:F.doc},G=B.bind(function(){D=this._resolveWinDoc(D);I=YUI(D);try{I.use("node-base",C);if(J){clearInterval(J);}}catch(K){J=setInterval(function(){G();},350);}},this);E.push(G);B.use.apply(B,E);return this;},focus:function(C){if(B.UA.ie||B.UA.gecko){this.getInstance().one("win").focus();if(C){C();}}else{try{B.one("win").focus();B.later(100,this,function(){this.getInstance().one("win").focus();if(C){C();}});}catch(D){}}return this;},show:function(){this._iframe.setStyles({position:"static",left:""});if(B.UA.gecko){try{this._instance.config.doc.designMode="on";}catch(C){}this.focus();}return this;},hide:function(){this._iframe.setStyles({position:"absolute",left:"-999999px"});return this;}},{DEFAULT_CSS:"html { height: 95%; } body { padding: 7px; background-color: #fff; font: 13px/1.22 arial,helvetica,clean,sans-serif;*font-size:small;*font:x-small; } a, a:visited, a:hover { color: blue !important; text-decoration: underline !important; cursor: text !important; } img { cursor: pointer !important; border: none; }",HTML:'<iframe border="0" frameBorder="0" marginWidth="0" marginHeight="0" leftMargin="0" topMargin="0" allowTransparency="true" width="100%" height="99%"></iframe>',PAGE_HTML:'<html dir="{DIR}" lang="{LANG}"><head><title>{TITLE}</title>{META}<base href="{BASE_HREF}"/><style id="editor_css">{DEFAULT_CSS}</style>{EXTRA_CSS}</head><body>{CONTENT}</body></html>',DOC_TYPE:'<!DOCTYPE HTML PUBLIC "-/'+"/W3C/"+"/DTD HTML 4.01/"+'/EN" "http:/'+'/www.w3.org/TR/html4/strict.dtd">',META:'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/><meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">',NAME:"frame",ATTRS:{title:{value:"Blank Page"},dir:{value:"ltr"},lang:{value:"en-US"},src:{value:"javascript"+((B.UA.ie)?":false":":")+";"},designMode:{writeOnce:true,value:false},content:{value:"<br>",setter:"_setHTML",getter:"_getHTML"},basehref:{value:false,getter:"_resolveBaseHref"},use:{writeOnce:true,value:["substitute","node","node-style","selector-css3"]},container:{value:"body",setter:function(C){return B.one(C);
}},id:{writeOnce:true,getter:function(C){if(!C){C="iframe-"+B.guid();}return C;}},extracss:{value:"",setter:"_setExtraCSS"},host:{value:false}}});B.Frame=A;},"3.2.0PR1",{requires:["base","node","selector-css3","substitute"],skinnable:false});YUI.add("selection",function(B){var A="textContent",D="innerHTML",C="fontFamily";B.Selection=function(){var J,I,E,G,F,H;if(B.config.win.getSelection){J=B.config.win.getSelection();}else{if(B.config.doc.selection){J=B.config.doc.selection.createRange();}}this._selection=J;if(J.pasteHTML){A="nodeValue";this.isCollapsed=(J.compareEndPoints("StartToEnd",J))?false:true;if(this.isCollapsed){this.anchorNode=this.focusNode=B.one(J.parentElement());I=J.parentElement();G=I.childNodes;F=J.duplicate();for(H=0;H<G.length;H++){F.select(G[H]);if(F.inRange(J)){E=G[H];}}this.ieNode=E;if(E){if(E.nodeType!==3){if(E.firstChild){E=E.firstChild;}}this.anchorNode=this.focusNode=B.Selection.resolve(E);this.anchorOffset=this.focusOffset=(this.anchorNode.nodeValue)?this.anchorNode.nodeValue.length:0;this.anchorTextNode=this.focusTextNode=B.one(E);}}}else{this.isCollapsed=J.isCollapsed;this.anchorNode=B.Selection.resolve(J.anchorNode);this.focusNode=B.Selection.resolve(J.focusNode);this.anchorOffset=J.anchorOffset;this.focusOffset=J.focusOffset;this.anchorTextNode=B.one(J.anchorNode);this.focusTextNode=B.one(J.focusNode);}if(B.Lang.isString(J.text)){this.text=J.text;}else{this.text=J.toString();}};B.Selection.filter=function(G){var F=B.all(B.Selection.ALL),H=B.all("strong,em"),E;F.each(function(J){if(J.getStyle(C)){var I=new B.StyleSheet("editor");I.set("."+J._yuid,{fontFamily:J.getStyle(C)});J.addClass(J._yuid);J.removeAttribute("face");J.setStyle(C,"");if(J.getAttribute("style")===""){J.removeAttribute("style");}if(J.getAttribute("style").toLowerCase()==="font-family: "){J.removeAttribute("style");}}});H.each(function(L,I){var J=L.get("tagName").toLowerCase(),K="i";if(J==="strong"){K="b";}B.Selection.prototype._swap(H.item(I),K);});E=B.all("ol,ul");E.each(function(J,I){var K=J.all("li");if(!K.size()){J.remove();}});if(G){B.Selection.filterBlocks();}};B.Selection.filterBlocks=function(){var K=B.config.doc.body.childNodes,G,F,M=false,I=true,E,N,O,L,J;if(K){for(G=0;G<K.length;G++){F=B.one(K[G]);if(!F.test(B.Selection.BLOCKS)){I=true;if(K[G].nodeType==3){if(K[G].textContent=="\n"){I=false;}}if(I){if(!M){M=[];}M.push(K[G]);}}else{M=B.Selection._wrapBlock(M);}}M=B.Selection._wrapBlock(M);}N=B.all("p");if(N.size()===1){O=N.item(0).all("br");if(O.size()===1){O.item(0).remove();var H=N.item(0).get("innerHTML");if(H==""||H==" "){N.set("innerHTML",B.Selection.CURSOR);E=new B.Selection();E.focusCursor(true,false);}}}else{N.each(function(Q){var P=Q.get("innerHTML");if(P===""){Q.remove();}});}L=B.all("div, p");L.each(function(Q){var P=Q.get("innerHTML");if(P===""){Q.remove();}else{if(Q.get("childNodes").size()==1){if(Q.ancestor("p")){Q.replace(Q.get("firstChild"));}}}});J=B.all(".Apple-style-span, .apple-style-span");J.each(function(P){P.setAttribute("style","");});};B.Selection._wrapBlock=function(F){if(F){var E=B.Node.create("<p></p>"),H=B.one(F[0]),G;for(G=1;G<F.length;G++){E.append(F[G]);}H.replace(E);E.prepend(H);}return false;};B.Selection.unfilter=function(){var F=B.all("body [class]"),G="",E,H;F.each(function(I){if(I.hasClass(I._yuid)){I.setStyle(C,I.getStyle(C));I.removeClass(I._yuid);if(I.getAttribute("class")===""){I.removeAttribute("class");}}});E=B.all(".yui-non");E.each(function(I){if(I.get("innerHTML")===""){I.remove();}else{I.removeClass("yui-non");}});H=B.all("body [id]");H.each(function(I){if(I.get("id").indexOf("yui_3_")===0){I.removeAttribute("id");I.removeAttribute("_yuid");}});G=B.one("body").get("innerHTML");F.each(function(I){I.addClass(I._yuid);I.setStyle(C,"");if(I.getAttribute("style")===""){I.removeAttribute("style");}});return G;};B.Selection.resolve=function(E){if(E&&E.nodeType===3){E=E.parentNode;}return B.one(E);};B.Selection.getText=function(E){return E.get("innerHTML").replace(B.Selection.STRIP_HTML,"");};B.Selection.ALL="[style],font[face]";B.Selection.STRIP_HTML=/<\S[^><]*>/g;B.Selection.BLOCKS="p,div,ul,ol,table,style";B.Selection.TMP="yui-tmp";B.Selection.DEFAULT_TAG="span";B.Selection.CURID="yui-cursor";B.Selection.CURSOR='<span id="'+B.Selection.CURID+'">&nbsp;</span>';B.Selection.prototype={text:null,isCollapsed:null,anchorNode:null,anchorOffset:null,anchorTextNode:null,focusNode:null,focusOffset:null,focusTextNode:null,_selection:null,_wrap:function(G,E){var F=B.Node.create("<"+E+"></"+E+">");F.set(D,G.get(D));G.set(D,"");G.append(F);return B.Node.getDOMNode(F);},_swap:function(G,E){var F=B.Node.create("<"+E+"></"+E+">");F.set(D,G.get(D));G.replace(F,G);return B.Node.getDOMNode(F);},getSelected:function(){B.Selection.filter();B.config.doc.execCommand("fontname",null,B.Selection.TMP);var F=B.all(B.Selection.ALL),E=[];F.each(function(H,G){if(H.getStyle(C,B.Selection.TMP)){H.setStyle(C,"");H.removeAttribute("face");if(H.getAttribute("style")===""){H.removeAttribute("style");}if(!H.test("body")){E.push(B.Node.getDOMNode(F.item(G)));}}});return B.all(E);},insertContent:function(E){return this.insertAtCursor(E,this.anchorTextNode,this.anchorOffset,true);},insertAtCursor:function(K,F,H,M){var O=B.Node.create("<"+B.Selection.DEFAULT_TAG+' class="yui-non"></'+B.Selection.DEFAULT_TAG+">"),E,I,G,N,J=this.createRange(),L;if(F&&F.test("body")){L=B.Node.create("<span></span>");F.append(L);F=L;}if(J.pasteHTML){N=B.Node.create(K);J.pasteHTML('<span id="rte-insert"></span>');E=B.one("#rte-insert");if(E){E.set("id","");E.replace(N);return N;}else{B.on("available",function(){E.set("id","");E.replace(N);},"#rte-insert");}}else{if(H>0){E=F.get(A);I=B.one(B.config.doc.createTextNode(E.substr(0,H)));G=B.one(B.config.doc.createTextNode(E.substr(H)));F.replace(I,F);N=B.Node.create(K);if(N.get("nodeType")===11){L=B.Node.create("<span></span>");L.append(N);N=L;}I.insert(N,"after");if(G&&G.get("length")){N.insert(O,"after");O.insert(G,"after");this.selectNode(O,M);}}else{if(F.get("nodeType")===3){F=F.get("parentNode");
}N=B.Node.create(K);F.append(N);}}return N;},wrapContent:function(F){F=(F)?F:B.Selection.DEFAULT_TAG;if(!this.isCollapsed){var H=this.getSelected(),K=[],G,I,J,E;H.each(function(N,L){var M=N.get("tagName").toLowerCase();if(M==="font"){K.push(this._swap(H.item(L),F));}else{K.push(this._wrap(H.item(L),F));}},this);G=this.createRange();J=K[0];I=K[K.length-1];if(this._selection.removeAllRanges){G.setStart(K[0],0);G.setEnd(I,I.childNodes.length);this._selection.removeAllRanges();this._selection.addRange(G);}else{G.moveToElementText(B.Node.getDOMNode(J));E=this.createRange();E.moveToElementText(B.Node.getDOMNode(I));G.setEndPoint("EndToEnd",E);G.select();}K=B.all(K);return K;}else{return B.all([]);}},replace:function(K,I){var F=this.createRange(),J,E,G,H;if(F.getBookmark){G=F.getBookmark();E=this.anchorNode.get("innerHTML").replace(K,I);this.anchorNode.set("innerHTML",E);F.moveToBookmark(G);H=B.one(F.parentElement());}else{J=this.anchorTextNode;E=J.get(A);G=E.indexOf(K);E=E.replace(K,"");J.set(A,E);H=this.insertAtCursor(I,J,G,true);}return H;},remove:function(){this._selection.removeAllRanges();return this;},createRange:function(){if(B.config.doc.selection){return B.config.doc.selection.createRange();}else{return B.config.doc.createRange();}},selectNode:function(H,J,E){E=E||0;H=B.Node.getDOMNode(H);var F=this.createRange();if(F.selectNode){F.selectNode(H);this._selection.removeAllRanges();this._selection.addRange(F);if(J){try{this._selection.collapse(H,E);}catch(G){this._selection.collapse(H,0);}}}else{if(H.nodeType===3){H=H.parentNode;}try{F.moveToElementText(H);}catch(I){}if(J){F.collapse(((E)?false:true));}F.select();}return this;},setCursor:function(){return this.insertContent(B.Selection.CURSOR);},getCursor:function(){return B.one("#"+B.Selection.CURID);},removeCursor:function(E){var F=this.getCursor();if(F){if(E){F.removeAttribute("id");F.set("innerHTML","&nbsp;");}else{F.remove();}}return F;},focusCursor:function(G,E){if(G!==false){G=true;}if(E!==false){E=true;}var F=this.removeCursor(true);if(F){this.selectNode(F,G,E);}},toString:function(){return"Selection Object";}};},"3.2.0PR1",{requires:["node"],skinnable:false});YUI.add("exec-command",function(B){var A=function(){A.superclass.constructor.apply(this,arguments);};B.extend(A,B.Base,{_inst:null,command:function(E,D){var C=A.COMMANDS[E];if(C){return C.call(this,E,D);}else{return this._command(E,D);}},_command:function(E,D){var C=this.getInstance();try{C.config.doc.execCommand(E,false,D);}catch(F){}},getInstance:function(){if(!this._inst){this._inst=this.get("host").getInstance();}return this._inst;},initializer:function(){B.mix(this.get("host"),{execCommand:function(D,C){return this.exec.command(D,C);},_execCommand:function(D,C){return this.exec._command(D,C);}});}},{NAME:"execCommand",NS:"exec",ATTRS:{host:{value:false}},COMMANDS:{wrap:function(E,C){var D=this.getInstance();return(new D.Selection()).wrapContent(C);},inserthtml:function(E,C){var D=this.getInstance();return(new D.Selection()).insertContent(C);},insertandfocus:function(G,D){var F=this.getInstance(),C,E;D+=F.Selection.CURSOR;C=this.command("inserthtml",D);E=new F.Selection();E.focusCursor(true,true);return C;},insertbr:function(E){var D=this.getInstance(),F,C=new D.Selection();C.setCursor();F=C.getCursor();F.insert("<br>","before");C.focusCursor(true,false);return F.previous();},insertimage:function(D,C){return this.command("inserthtml",'<img src="'+C+'">');},addclass:function(E,C){var D=this.getInstance();return(new D.Selection()).getSelected().addClass(C);},removeclass:function(E,C){var D=this.getInstance();return(new D.Selection()).getSelected().removeClass(C);},backcolor:function(E,F){var D=this.getInstance(),C=new D.Selection(),G;if(B.UA.gecko||B.UA.opera){E="hilitecolor";}if(!B.UA.ie){this._command("styleWithCSS","true");}if(C.isCollapsed){if(C.anchorNode&&(C.anchorNode.get("innerHTML")==="&nbsp;")){C.anchorNode.setStyle("backgroundColor",F);G=C.anchorNode;G.set("innerHTML","<br>");}else{G=this.command("inserthtml",'<span style="background-color: '+F+'">'+D.Selection.CURSOR+"</span>");C.focusCursor(true,true);}return G;}else{return this._command(E,F);}if(!B.UA.ie){this._command("styleWithCSS",false);}},hilitecolor:function(){return A.COMMANDS.backcolor.apply(this,arguments);},fontname:function(E,F){var D=this.getInstance(),C=new D.Selection(),G;if(C.isCollapsed){if(C.anchorNode&&(C.anchorNode.get("innerHTML")==="&nbsp;")){C.anchorNode.setStyle("fontFamily",F);G=C.anchorNode;}else{G=this.command("inserthtml",'<span style="font-family: '+F+'">'+D.Selection.CURSOR+"</span>");C.focusCursor(true,true);}return G;}else{return this._command("fontname",F);}},fontsize:function(F,G){var E=this.getInstance(),D=new E.Selection(),H,C;if(D.isCollapsed){H=this.command("inserthtml",'<font size="'+G+'">&nbsp;</font>');C=H.get("previousSibling");if(C.get("nodeType")===3){C.remove();}D.selectNode(H.get("firstChild"),true,false);return H;}else{return this._command("fontsize",G);}}}});B.namespace("Plugin");B.Plugin.ExecCommand=A;},"3.2.0PR1",{requires:["frame"],skinnable:false});YUI.add("editor-tab",function(C){var B=function(){B.superclass.constructor.apply(this,arguments);},A="host";C.extend(B,C.Base,{_onNodeChange:function(E){var D="indent";if(E.changedType==="tab"){if(!E.changedNode.test("li, li *")){E.changedEvent.halt();E.preventDefault();if(E.changedEvent.shiftKey){D="outdent";}this.get(A).execCommand(D,"");}}},initializer:function(){this.get(A).on("nodeChange",C.bind(this._onNodeChange,this));}},{NAME:"editorTab",NS:"tab",ATTRS:{host:{value:false}}});C.namespace("Plugin");C.Plugin.EditorTab=B;},"3.2.0PR1",{requires:["editor-base"],skinnable:false});YUI.add("createlink-base",function(B){var A={};A.STRINGS={PROMPT:"Please enter the URL for the link to point to:",DEFAULT:"http://"};B.namespace("Plugin");B.Plugin.CreateLinkBase=A;B.mix(B.Plugin.ExecCommand.COMMANDS,{createlink:function(H){var G=this.get("host").getInstance(),E,C,F,D=prompt(A.STRINGS.PROMPT,A.STRINGS.DEFAULT);if(D){this.get("host")._execCommand(H,D);
F=new G.Selection();E=F.getSelected();if(!F.isCollapsed&&E.size()){C=E.item(0).one("a");if(C){E.item(0).replace(C);}}else{this.get("host").execCommand("inserthtml",'<a href="'+D+'">'+D+"</a>");}}return C;}});},"3.2.0PR1",{requires:["editor-base"],skinnable:false});YUI.add("editor-base",function(B){var A=function(){A.superclass.constructor.apply(this,arguments);};B.extend(A,B.Base,{frame:null,initializer:function(){var C=new B.Frame({designMode:true,title:A.STRINGS.title,use:A.USE,dir:this.get("dir"),extracss:this.get("extracss"),host:this}).plug(B.Plugin.ExecCommand);C.after("ready",B.bind(this._afterFrameReady,this));C.addTarget(this);this.frame=C;this.publish("nodeChange",{emitFacade:true,bubbles:true,defaultFn:this._defNodeChangeFn});},destructor:function(){this.frame.destroy();this.detachAll();},copyStyles:function(F,E){var C=["color","fontSize","fontFamily","backgroundColor","fontStyle"],D={};B.each(C,function(G){D[G]=F.getStyle(G);});if(F.ancestor("b,strong")){D.fontWeight="bold";}E.setStyles(D);},_defNodeChangeFn:function(N){var M=this.getInstance();switch(N.changedType){case"enter":if(B.UA.webkit){if(N.changedEvent.shiftKey){this.execCommand("insertbr");N.changedEvent.preventDefault();}}break;case"tab":if(!N.changedNode.test("li, li *")&&!N.changedEvent.shiftKey){var F=new M.Selection();F.setCursor();var O=F.getCursor();O.insert(A.TABKEY,"before");F.focusCursor();N.changedEvent.preventDefault();}break;case"enter-up":if(N.changedNode.test("p")){var I=N.changedNode.previous(),E,P,Q=false;if(I){E=I.one(":last-child");while(!Q){if(E){P=E.one(":last-child");if(P){E=P;}else{Q=true;}}else{Q=true;}}if(E){this.copyStyles(E,N.changedNode);}}}break;}var L=this.getDomPath(N.changedNode),C={},K,D,H=[],J="",G="";if(N.commands){C=N.commands;}L.each(function(Y){var S=Y.get("tagName").toLowerCase(),X=A.TAG2CMD[S],W=B.Node.getDOMNode(Y);if(X){C[X]=1;}var V=W.style;if(V.fontWeight.toLowerCase()=="bold"){C.bold=1;}if(V.fontStyle.toLowerCase()=="italic"){C.italic=1;}if(V.textDecoration.toLowerCase()=="underline"){C.underline=1;}if(V.textDecoration.toLowerCase()=="line-through"){C.strikethrough=1;}var U=Y.getStyle("fontFamily").split(",")[0].toLowerCase();if(U){K=U;}D=Y.getStyle("fontSize");var T=Y.get("className").split(" ");B.each(T,function(Z){if(Z!==""&&(Z.substr(0,4)!=="yui_")){H.push(Z);}});J=A.FILTER_RGB(Y.getStyle("color"));var R=A.FILTER_RGB(Y.getStyle("backgroundColor"));if(R!=="transparent"){G=R;}});N.dompath=L;N.classNames=H;N.commands=C;if(!N.fontFamily){N.fontFamily=K;}if(!N.fontSize){N.fontSize=D;}if(!N.fontColor){N.fontColor=J;}if(!N.backgroundColor){N.backgroundColor=G;}},getDomPath:function(C){var E=[],D=this.frame.getInstance();while(C!==null){if(C.test("html")||C.test("doc")||!C.get("tagName")){C=null;break;}if(!C.inDoc()){C=null;break;}if(C.get("nodeName")&&C.get("nodeType")&&(C.get("nodeType")==1)){E.push(D.Node.getDOMNode(C));}if(C.test("body")){C=null;break;}C=C.get("parentNode");}if(E.length===0){E[0]=D.config.doc.body;}return D.all(E.reverse());},_afterFrameReady:function(){var C=this.frame.getInstance();this.frame.on("mousedown",B.bind(this._onFrameMouseDown,this));this.frame.on("keyup",B.bind(this._onFrameKeyUp,this));this.frame.on("keydown",B.bind(this._onFrameKeyDown,this));this.frame.on("keypress",B.bind(this._onFrameKeyPress,this));C.Selection.filter();this.fire("ready");},_onFrameMouseDown:function(C){this.fire("nodeChange",{changedNode:C.frameTarget,changedType:"mousedown",changedEvent:C});},_onFrameKeyUp:function(E){var D=this.frame.getInstance(),C=new D.Selection();if(C.anchorNode){this.fire("nodeChange",{changedNode:C.anchorNode,changedType:"keyup",selection:C,changedEvent:E});if(A.NC_KEYS[E.keyCode]){this.fire("nodeChange",{changedNode:C.anchorNode,changedType:A.NC_KEYS[E.keyCode]+"-up",selection:C,changedEvent:E});}}},_onFrameKeyDown:function(E){var D=this.frame.getInstance(),C=new D.Selection();if(C.anchorNode){this.fire("nodeChange",{changedNode:C.anchorNode,changedType:"keydown",changedEvent:E});if(A.NC_KEYS[E.keyCode]){this.fire("nodeChange",{changedNode:C.anchorNode,changedType:A.NC_KEYS[E.keyCode],changedEvent:E});this.fire("nodeChange",{changedNode:C.anchorNode,changedType:A.NC_KEYS[E.keyCode]+"-down",changedEvent:E});}}},_onFrameKeyPress:function(E){var D=this.frame.getInstance(),C=new D.Selection();if(C.anchorNode){this.fire("nodeChange",{changedNode:C.anchorNode,changedType:"keypress",changedEvent:E});if(A.NC_KEYS[E.keyCode]){this.fire("nodeChange",{changedNode:C.anchorNode,changedType:A.NC_KEYS[E.keyCode]+"-press",changedEvent:E});}}},execCommand:function(G,I){var D=this.frame.execCommand(G,I),F=this.frame.getInstance(),E=new F.Selection(),C={},H={changedNode:E.anchorNode,changedType:"execcommand",nodes:D};switch(G){case"forecolor":H.fontColor=I;break;case"backcolor":H.backgroundColor=I;break;case"fontsize":H.fontSize=I;break;case"fontname":H.fontFamily=I;break;}C[G]=1;H.commands=C;this.fire("nodeChange",H);return D;},getInstance:function(){return this.frame.getInstance();},render:function(C){this.frame.set("content",this.get("content"));this.frame.render(C);return this;},focus:function(C){this.frame.focus(C);return this;},show:function(){this.frame.show();return this;},hide:function(){this.frame.hide();return this;},getContent:function(){var C="",D=this.getInstance();if(D&&D.Selection){C=D.Selection.unfilter();}C=C.replace(/ _yuid="([^>]*)"/g,"");return C;}},{TABKEY:'<span class="tab">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>',FILTER_RGB:function(E){if(E.toLowerCase().indexOf("rgb")!=-1){var H=new RegExp("(.*?)rgb\\s*?\\(\\s*?([0-9]+).*?,\\s*?([0-9]+).*?,\\s*?([0-9]+).*?\\)(.*?)","gi");var D=E.replace(H,"$1,$2,$3,$4,$5").split(",");if(D.length==5){var G=parseInt(D[1],10).toString(16);var F=parseInt(D[2],10).toString(16);var C=parseInt(D[3],10).toString(16);G=G.length==1?"0"+G:G;F=F.length==1?"0"+F:F;C=C.length==1?"0"+C:C;E="#"+G+F+C;}}return E;},TAG2CMD:{"b":"bold","strong":"bold","i":"italic","em":"italic","u":"underline","sup":"superscript","sub":"subscript","img":"insertimage","a":"createlink","ul":"insertunorderedlist","ol":"insertorderedlist"},NC_KEYS:{8:"backspace",9:"tab",13:"enter",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",46:"delete"},USE:["substitute","node","selector-css3","selection","stylesheet"],NAME:"editorBase",STRINGS:{title:"Rich Text Editor"},ATTRS:{content:{value:"<br>",setter:function(C){if(C.substr(0,1)==="\n"){C=C.substr(1);
}if(C===""){C="<br>";}return this.frame.set("content",C);},getter:function(){return this.frame.get("content");}},dir:{writeOnce:true,value:"ltr"},extracss:{value:false,setter:function(C){if(this.frame){this.frame.set("extracss",C);}return C;}}}});B.EditorBase=A;},"3.2.0PR1",{requires:["base","frame","node","exec-command"],skinnable:false});YUI.add("editor-lists",function(F){var E=function(){E.superclass.constructor.apply(this,arguments);},B="li",C="ol",D="ul",A="host";F.extend(E,F.Base,{_onNodeChange:function(K){var J=this.get(A).getInstance(),G,N,O,H,I,L,M=false,P;if(F.UA.ie&&K.changedType==="enter"){if(K.changedNode.test(B+", "+B+" *")){K.changedEvent.halt();K.preventDefault();N=K.changedNode;O=J.Node.create("<"+B+">"+E.NON+"</"+B+">");if(!N.test(B)){N=N.ancestor(B);}N.insert(O,"after");G=new J.Selection();G.selectNode(O.get("firstChild"));}}if(K.changedType==="tab"){if(K.changedNode.test(B+", "+B+" *")){K.changedEvent.halt();K.preventDefault();N=K.changedNode;I=K.changedEvent.shiftKey;L=N.ancestor(C+","+D);P=D;if(L.get("tagName").toLowerCase()===C){P=C;}if(!N.test(B)){N=N.ancestor(B);}if(I){if(N.ancestor(B)){N.ancestor(B).insert(N,"after");M=true;}}else{if(N.previous(B)){H=J.Node.create("<"+P+"></"+P+">");N.previous(B).append(H);H.append(N);M=true;}}}if(M){N.all(E.REMOVE).remove();if(F.UA.ie){N=N.append(E.NON).one(E.NON_SEL);}(new J.Selection()).selectNode(N,true,true);}}},initializer:function(){this.get(A).on("nodeChange",F.bind(this._onNodeChange,this));}},{NON:'<span class="yui-non">&nbsp;</span>',NON_SEL:"span.yui-non",REMOVE:"br",NAME:"editorLists",NS:"lists",ATTRS:{host:{value:false}}});F.namespace("Plugin");F.Plugin.EditorLists=E;F.mix(F.Plugin.ExecCommand.COMMANDS,{insertunorderedlist:function(I){var H=this.get("host").getInstance(),G;this.get("host")._execCommand(I,"");G=(new H.Selection()).getSelected();return G;},insertorderedlist:function(I){var H=this.get("host").getInstance(),G;this.get("host")._execCommand(I,"");G=(new H.Selection()).getSelected();return G;}});},"3.2.0PR1",{requires:["editor-base"],skinnable:false});YUI.add("editor-bidi",function(H){var G=function(){G.superclass.constructor.apply(this,arguments);},C="host",B="dir",D="BODY",A="nodeChange",F="bidiContextChange",E=D+" > p";H.extend(G,H.Base,{lastDirection:null,firstEvent:null,_checkForChange:function(){var J=this.get(C),L=J.getInstance(),K=new L.Selection(),I,M;if(K.isCollapsed){I=G.blockParent(K.focusNode);M=I.getStyle("direction");if(M!==this.lastDirection){J.fire(F,{changedTo:M});this.lastDirection=M;}}else{J.fire(F,{changedTo:"select"});this.lastDirection=null;}},_afterNodeChange:function(I){if(this.firstEvent||G.EVENTS[I.changedType]){this._checkForChange();this.firstEvent=false;}},_afterMouseUp:function(I){this._checkForChange();this.firstEvent=false;},_fixFirstPara:function(){var I=this.get(C),K=I.getInstance(),J;K.one("body").setContent("<p>"+K.Selection.CURSOR+"</p>");J=new K.Selection();J.focusCursor(true,false);},_onNodeChange:function(M){var O=this.get(C),L=O.getInstance();switch(M.changedType){case"keydown":var Q=L.config.doc.body.innerHTML;if(Q&&Q.toLowerCase()=="<br>"){this._fixFirstPara();}break;case"backspace-up":case"delete-up":var I=L.all(E),P,J,K,N;if(I.size()<2){N=L.one(D);if(I.item(0)){N=I.item(0);}if(L.Selection.getText(N)===""&&!N.test("p")){this._fixFirstPara();}else{if(N.test("p")&&N.get("innerHTML").length===0){M.changedEvent.halt();}}}break;}},_afterEditorReady:function(){var I=this.get(C),J=I.getInstance();if(J){J.Selection.filterBlocks();}},_afterContentChange:function(){var I=this.get(C),J=I.getInstance();if(J){J.Selection.filterBlocks();}},_afterPaste:function(){var I=this.get(C),K=I.getInstance(),J=new K.Selection();J.setCursor();H.later(50,I,function(){K.Selection.filterBlocks();J.focusCursor(true,true);});},initializer:function(){var I=this.get(C);this.firstEvent=true;I.after(A,H.bind(this._afterNodeChange,this));I.on(A,H.bind(this._onNodeChange,this));I.frame.after("mouseup",H.bind(this._afterMouseUp,this));I.after("ready",H.bind(this._afterEditorReady,this));I.after("contentChange",H.bind(this._afterContentChange,this));I.after("frame:paste",H.bind(this._afterPaste,this));}},{EVENTS:{"backspace-up":true,"pageup-up":true,"pagedown-down":true,"end-up":true,"home-up":true,"left-up":true,"up-up":true,"right-up":true,"down-up":true,"delete-up":true},BLOCKS:H.Selection.BLOCKS+",LI,HR,"+D,DIV_WRAPPER:"<DIV></DIV>",blockParent:function(K,J){var I=K,M,L;if(!I){I=H.one(D);}if(!I.test(G.BLOCKS)){I=I.ancestor(G.BLOCKS);}if(J&&I.test(D)){M=H.Node.create(G.DIV_WRAPPER);I.get("children").each(function(O,N){if(N===0){L=O;}else{M.append(O);}});L.replace(M);M.prepend(L);I=M;}return I;},_NODE_SELECTED:"bidiSelected",addParents:function(L){var I,K,J;for(I=0;I<L.length;I+=1){L[I].setData(G._NODE_SELECTED,true);}for(I=0;I<L.length;I+=1){K=L[I].get("parentNode");if(!K.test(D)&&!K.getData(G._NODE_SELECTED)){J=true;K.get("children").some(function(M){if(!M.getData(G._NODE_SELECTED)){J=false;return true;}});if(J){L.push(K);K.setData(G._NODE_SELECTED,true);}}}for(I=0;I<L.length;I+=1){L[I].clearData(G._NODE_SELECTED);}return L;},NAME:"editorBidi",NS:"editorBidi",ATTRS:{host:{value:false}}});H.namespace("Plugin");H.Plugin.EditorBidi=G;H.Plugin.ExecCommand.COMMANDS.bidi=function(M,N){var L=this.getInstance(),K=new L.Selection(),J,P,I,O;L.Selection.filterBlocks();if(K.isCollapsed){P=G.blockParent(K.anchorNode);P.setAttribute(B,N);J=P;}else{I=K.getSelected();O=[];I.each(function(Q){if(!Q.test(D)){O.push(G.blockParent(Q));}});O=L.all(G.addParents(O));O.setAttribute(B,N);J=O;}this.get(C).get(C).editorBidi.checkForChange();return J;};},"3.2.0PR1",{requires:["editor-base","selection"],skinnable:false});YUI.add("editor",function(A){},"3.2.0PR1",{use:["frame","selection","exec-command","editor-base"],skinnable:false});