<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:io-request:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:io-request:scopedAttributes");

Map<String, Object> options = new HashMap<String, Object>();

options.putAll(scopedAttributes);
options.putAll(dynamicAttributes);

java.lang.Object _boundingBox = (java.lang.Object)request.getAttribute("alloy:io-request:boundingBox");
java.lang.Object _contentBox = (java.lang.Object)request.getAttribute("alloy:io-request:contentBox");
java.lang.Object _srcNode = (java.lang.Object)request.getAttribute("alloy:io-request:srcNode");

boolean hasBoundingBox = GetterUtil.getBoolean(String.valueOf(_boundingBox));
boolean hasContentBox = GetterUtil.getBoolean(String.valueOf(_contentBox));
boolean hasSrcNode = GetterUtil.getBoolean(String.valueOf(_srcNode));

java.lang.Boolean _active = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:io-request:active"), false);
java.util.HashMap _arguments = JSONFactoryUtil.getHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:arguments")));
java.lang.Boolean _autoLoad = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:io-request:autoLoad"), true);
java.lang.Boolean _cache = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:io-request:cache"), true);
java.lang.String _cfg = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:cfg"));
java.util.HashMap _context = JSONFactoryUtil.getHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:context")));
java.util.HashMap _data = JSONFactoryUtil.getHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:data")));
java.lang.String _dataType = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:dataType"));
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:io-request:destroyed"), false);
java.util.HashMap _form = JSONFactoryUtil.getHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:form")));
java.util.HashMap _headers = JSONFactoryUtil.getHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:headers")));
java.lang.Object _host = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:host"));
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:io-request:initialized"), false);
java.lang.String _method = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:method"));
java.lang.Object _responseData = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:responseData"));
java.lang.Boolean _sync = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:io-request:sync"), false);
java.lang.Number _timeout = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:io-request:timeout")), 0);
java.util.HashMap _transaction = JSONFactoryUtil.getHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:transaction")));
java.lang.String _uri = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:uri"));
java.util.HashMap _xdr = JSONFactoryUtil.getHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:xdr")));
java.lang.Object _afterActiveChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:afterActiveChange"));
java.lang.Object _afterArgumentsChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:afterArgumentsChange"));
java.lang.Object _afterAutoLoadChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:afterAutoLoadChange"));
java.lang.Object _afterCacheChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:afterCacheChange"));
java.lang.Object _afterCfgChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:afterCfgChange"));
java.lang.Object _afterContextChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:afterContextChange"));
java.lang.Object _afterDataChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:afterDataChange"));
java.lang.Object _afterDataTypeChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:afterDataTypeChange"));
java.lang.Object _afterDestroy = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:afterDestroy"));
java.lang.Object _afterDestroyedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:afterDestroyedChange"));
java.lang.Object _afterFormChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:afterFormChange"));
java.lang.Object _afterHeadersChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:afterHeadersChange"));
java.lang.Object _afterHostChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:afterHostChange"));
java.lang.Object _afterInit = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:afterInit"));
java.lang.Object _afterInitializedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:afterInitializedChange"));
java.lang.Object _afterComplete = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:afterComplete"));
java.lang.Object _afterEnd = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:afterEnd"));
java.lang.Object _afterFailure = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:afterFailure"));
java.lang.Object _afterStart = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:afterStart"));
java.lang.Object _afterSuccess = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:afterSuccess"));
java.lang.Object _afterXdrReady = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:afterXdrReady"));
java.lang.Object _afterMethodChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:afterMethodChange"));
java.lang.Object _afterResponseDataChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:afterResponseDataChange"));
java.lang.Object _afterSyncChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:afterSyncChange"));
java.lang.Object _afterTimeoutChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:afterTimeoutChange"));
java.lang.Object _afterTransactionChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:afterTransactionChange"));
java.lang.Object _afterUriChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:afterUriChange"));
java.lang.Object _afterXdrChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:afterXdrChange"));
java.lang.Object _onActiveChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:onActiveChange"));
java.lang.Object _onArgumentsChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:onArgumentsChange"));
java.lang.Object _onAutoLoadChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:onAutoLoadChange"));
java.lang.Object _onCacheChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:onCacheChange"));
java.lang.Object _onCfgChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:onCfgChange"));
java.lang.Object _onContextChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:onContextChange"));
java.lang.Object _onDataChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:onDataChange"));
java.lang.Object _onDataTypeChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:onDataTypeChange"));
java.lang.Object _onDestroy = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:onDestroy"));
java.lang.Object _onDestroyedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:onDestroyedChange"));
java.lang.Object _onFormChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:onFormChange"));
java.lang.Object _onHeadersChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:onHeadersChange"));
java.lang.Object _onHostChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:onHostChange"));
java.lang.Object _onInit = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:onInit"));
java.lang.Object _onInitializedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:onInitializedChange"));
java.lang.Object _onComplete = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:onComplete"));
java.lang.Object _onEnd = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:onEnd"));
java.lang.Object _onFailure = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:onFailure"));
java.lang.Object _onStart = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:onStart"));
java.lang.Object _onSuccess = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:onSuccess"));
java.lang.Object _onXdrReady = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:onXdrReady"));
java.lang.Object _onMethodChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:onMethodChange"));
java.lang.Object _onResponseDataChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:onResponseDataChange"));
java.lang.Object _onSyncChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:onSyncChange"));
java.lang.Object _onTimeoutChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:onTimeoutChange"));
java.lang.Object _onTransactionChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:onTransactionChange"));
java.lang.Object _onUriChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:onUriChange"));
java.lang.Object _onXdrChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:onXdrChange"));

String uniqueId = StringPool.BLANK;

boolean useJavaScript = GetterUtil.getBoolean((Serializable)dynamicAttributes.get("useJavaScript"), true);
boolean useMarkup = GetterUtil.getBoolean((Serializable)dynamicAttributes.get("useMarkup"), true);

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();

	String prefix = StringPool.POUND.concat(uniqueId);

	if (!hasBoundingBox) {
		_boundingBox = prefix.concat("BoundingBox");

		options.put("boundingBox", _boundingBox);
	}

	if (!hasSrcNode && !hasContentBox) {
		_srcNode = prefix.concat("SrcNode");

		options.put("srcNode", _srcNode);
	}

	if (!hasSrcNode && hasContentBox) {
		_contentBox = prefix.concat("ContentBox");

		options.put("contentBox", _contentBox);
	}
}

_updateOptions(options, "active", _active);
_updateOptions(options, "arguments", _arguments);
_updateOptions(options, "autoLoad", _autoLoad);
_updateOptions(options, "cache", _cache);
_updateOptions(options, "cfg", _cfg);
_updateOptions(options, "context", _context);
_updateOptions(options, "data", _data);
_updateOptions(options, "dataType", _dataType);
_updateOptions(options, "destroyed", _destroyed);
_updateOptions(options, "form", _form);
_updateOptions(options, "headers", _headers);
_updateOptions(options, "host", _host);
_updateOptions(options, "initialized", _initialized);
_updateOptions(options, "method", _method);
_updateOptions(options, "responseData", _responseData);
_updateOptions(options, "sync", _sync);
_updateOptions(options, "timeout", _timeout);
_updateOptions(options, "transaction", _transaction);
_updateOptions(options, "uri", _uri);
_updateOptions(options, "xdr", _xdr);
_updateOptions(options, "afterActiveChange", _afterActiveChange);
_updateOptions(options, "afterArgumentsChange", _afterArgumentsChange);
_updateOptions(options, "afterAutoLoadChange", _afterAutoLoadChange);
_updateOptions(options, "afterCacheChange", _afterCacheChange);
_updateOptions(options, "afterCfgChange", _afterCfgChange);
_updateOptions(options, "afterContextChange", _afterContextChange);
_updateOptions(options, "afterDataChange", _afterDataChange);
_updateOptions(options, "afterDataTypeChange", _afterDataTypeChange);
_updateOptions(options, "afterDestroy", _afterDestroy);
_updateOptions(options, "afterDestroyedChange", _afterDestroyedChange);
_updateOptions(options, "afterFormChange", _afterFormChange);
_updateOptions(options, "afterHeadersChange", _afterHeadersChange);
_updateOptions(options, "afterHostChange", _afterHostChange);
_updateOptions(options, "afterInit", _afterInit);
_updateOptions(options, "afterInitializedChange", _afterInitializedChange);
_updateOptions(options, "afterComplete", _afterComplete);
_updateOptions(options, "afterEnd", _afterEnd);
_updateOptions(options, "afterFailure", _afterFailure);
_updateOptions(options, "afterStart", _afterStart);
_updateOptions(options, "afterSuccess", _afterSuccess);
_updateOptions(options, "afterXdrReady", _afterXdrReady);
_updateOptions(options, "afterMethodChange", _afterMethodChange);
_updateOptions(options, "afterResponseDataChange", _afterResponseDataChange);
_updateOptions(options, "afterSyncChange", _afterSyncChange);
_updateOptions(options, "afterTimeoutChange", _afterTimeoutChange);
_updateOptions(options, "afterTransactionChange", _afterTransactionChange);
_updateOptions(options, "afterUriChange", _afterUriChange);
_updateOptions(options, "afterXdrChange", _afterXdrChange);
_updateOptions(options, "onActiveChange", _onActiveChange);
_updateOptions(options, "onArgumentsChange", _onArgumentsChange);
_updateOptions(options, "onAutoLoadChange", _onAutoLoadChange);
_updateOptions(options, "onCacheChange", _onCacheChange);
_updateOptions(options, "onCfgChange", _onCfgChange);
_updateOptions(options, "onContextChange", _onContextChange);
_updateOptions(options, "onDataChange", _onDataChange);
_updateOptions(options, "onDataTypeChange", _onDataTypeChange);
_updateOptions(options, "onDestroy", _onDestroy);
_updateOptions(options, "onDestroyedChange", _onDestroyedChange);
_updateOptions(options, "onFormChange", _onFormChange);
_updateOptions(options, "onHeadersChange", _onHeadersChange);
_updateOptions(options, "onHostChange", _onHostChange);
_updateOptions(options, "onInit", _onInit);
_updateOptions(options, "onInitializedChange", _onInitializedChange);
_updateOptions(options, "onComplete", _onComplete);
_updateOptions(options, "onEnd", _onEnd);
_updateOptions(options, "onFailure", _onFailure);
_updateOptions(options, "onStart", _onStart);
_updateOptions(options, "onSuccess", _onSuccess);
_updateOptions(options, "onXdrReady", _onXdrReady);
_updateOptions(options, "onMethodChange", _onMethodChange);
_updateOptions(options, "onResponseDataChange", _onResponseDataChange);
_updateOptions(options, "onSyncChange", _onSyncChange);
_updateOptions(options, "onTimeoutChange", _onTimeoutChange);
_updateOptions(options, "onTransactionChange", _onTransactionChange);
_updateOptions(options, "onUriChange", _onUriChange);
_updateOptions(options, "onXdrChange", _onXdrChange);
%>

<%@ include file="init-ext.jsp" %>