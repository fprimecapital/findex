/*! This file is auto-generated */
!function(w){var l=window.wpApiSettings;function t(e){return e=t.buildAjaxOptions(e),t.transport(e)}t.buildAjaxOptions=function(e){var t,n,a,p,o,r,i,d=e.url,s=e.path,c=e.method;for(i in"string"==typeof e.namespace&&"string"==typeof e.endpoint&&(t=e.namespace.replace(/^\/|\/$/g,""),s=(n=e.endpoint.replace(/^\//,""))?t+"/"+n:t),"string"==typeof s&&(a=l.root,s=s.replace(/^\//,""),"string"==typeof a&&-1!==a.indexOf("?")&&(s=s.replace("?","&")),d=a+s),o=!(e.data&&e.data._wpnonce),r=!0,p=e.headers||{})if(p.hasOwnProperty(i))switch(i.toLowerCase()){case"x-wp-nonce":o=!1;break;case"accept":r=!1}return o&&(p=w.extend({"X-WP-Nonce":l.nonce},p)),r&&(p=w.extend({Accept:"application/json, */*;q=0.1"},p)),"string"==typeof c&&("PUT"!==(c=c.toUpperCase())&&"DELETE"!==c||(p=w.extend({"X-HTTP-Method-Override":c},p),c="POST")),delete(e=w.extend({},e,{headers:p,url:d,method:c})).path,delete e.namespace,delete e.endpoint,e},t.transport=w.ajax,window.wp=window.wp||{},window.wp.apiRequest=t}(jQuery);