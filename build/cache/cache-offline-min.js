/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.2.0PR1
build: nightly
*/
YUI.add("cache-offline",function(E){function D(){D.superclass.constructor.apply(this,arguments);}var A=E.config.win.localStorage,C=E.JSON,F={NAME:"cacheOffline",ATTRS:{sandbox:{value:"default",writeOnce:"initOnly"},expires:{value:86400000},max:{value:null,readOnly:true},uniqueKeys:{value:true,readOnly:true,setter:function(){return true;}}},flushAll:function(){var G=A,H;if(G){if(G.clear){G.clear();}else{for(H in G){if(G.hasOwnProperty(H)){G.removeItem(H);delete G[H];}}}}else{}}},B=A?{_setMax:function(G){return null;},_getSize:function(){var I=0,H=0,G=A.length;for(;H<G;++H){if(A.key(H).indexOf(this.get("sandbox"))===0){I++;}}return I;},_getEntries:function(){var G=[],J=0,I=A.length,H=this.get("sandbox");for(;J<I;++J){if(A.key(J).indexOf(H)===0){G[J]=C.parse(A.key(J).substring(H.length));}}return G;},_defAddFn:function(L){var K=L.entry,J=K.request,I=K.cached,G=K.expires;K.cached=I.getTime();K.expires=G?G.getTime():G;try{A.setItem(this.get("sandbox")+C.stringify({"request":J}),C.stringify(K));}catch(H){this.fire("error",{error:H});}},_defFlushFn:function(I){var H,G=A.length-1;for(;G>-1;--G){H=A.key(G);if(H.indexOf(this.get("sandbox"))===0){A.removeItem(H);}}},retrieve:function(J){this.fire("request",{request:J});var I,G,H;try{H=this.get("sandbox")+C.stringify({"request":J});try{I=C.parse(A.getItem(H));}catch(L){}}catch(K){}if(I){I.cached=new Date(I.cached);G=I.expires;G=!G?null:new Date(G);I.expires=G;if(this._isMatch(J,I)){this.fire("retrieve",{entry:I});return I;}}return null;}}:{_setMax:function(G){return null;}};E.mix(D,F);E.extend(D,E.Cache,B);E.CacheOffline=D;},"3.2.0PR1",{requires:["cache-base","json"]});