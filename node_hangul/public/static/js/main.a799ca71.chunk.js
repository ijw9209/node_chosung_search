(this["webpackJsonpmy-components"]=this["webpackJsonpmy-components"]||[]).push([[0],{111:function(e,t){},134:function(e,t,n){},135:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(10),l=n.n(o),i=(n(81),n(16)),c=n.n(i),s=n(27),u=n(28),f=n(65),m=n(26),d=n(66),h=n(67),p=n(71),x=n(156),v=n(158),g=n(68),E=n.n(g),y=n(154);function w(e){var t=e.text;return r.a.createElement(x.a,{display:"flex",alignItems:"center",justifyContent:"center",height:"10vh",width:"100%",fontSize:"h3.fontSize",bgcolor:y.a[900]},r.a.createElement("div",null,t))}function k(e){var t=e.title;return r.a.createElement(x.a,{textAlign:"center",bgcolor:y.a[700],m:.5},t)}function b(e){var t=e.master,n=t.lastIndexedCount?t.lastIndexedCount:0,a=t.searching,o=void 0===a?0:a;return r.a.createElement(x.a,{display:"flex",flexDirection:"row",justifyContent:"space-around",alignItems:"center",height:"20vh",mx:.5,mb:.5,fontSize:"fontSize",bgcolor:y.a[700]},r.a.createElement(x.a,{display:"flex",justifyContent:"flex-start",flexDirection:"column",m:2,textAlign:"left"},r.a.createElement("div",null,"PID: ",t.pid),r.a.createElement("div",null,"MEM: ",t.mem),r.a.createElement("p",null),r.a.createElement("div",null,"TOTAL INDEXED : ",n.toLocaleString()),r.a.createElement("div",null,"LAST INDEXED DATE: ",t.lastIndexedDate)),r.a.createElement(x.a,null,r.a.createElement("div",{style:{fontSize:"12px"}},"Searching"),r.a.createElement("div",{style:{fontSize:"60px"}},o)))}var C=n(157);function S(e){var t=e.currentLog,n={display:"flex",flexGrow:0,flexShrink:1,flexBasis:"130px",overflow:"hidden"};return r.a.createElement(x.a,{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"stretch",flexGrow:3,mx:.5,mb:.5,overflow:"auto",textOverflow:"ellipsis",fontSize:"12px",bgcolor:y.a[700]},t.map((function(e){return r.a.createElement("div",{style:{display:"flex",marginLeft:"10px",marginTop:"3px",flexDirection:"row",justifyContent:"flex-start",height:"1.2em",color:e.cacheHit&&"cyan"}},r.a.createElement("div",{style:n},e.eventTime),r.a.createElement("div",{style:n},e.userId),r.a.createElement("div",{style:n},e.ip),r.a.createElement("div",{style:n},e.elapsed,"\ucd08"),r.a.createElement("div",{style:n},e.resultCount,"\uac74"),r.a.createElement(C.a,{title:e.keyword},r.a.createElement("div",{style:{display:"flex",flexShrink:0,flexBasis:"auto",width:"300px",overflow:"hidden",textOverflow:"ellipsis"}},e.keyword)))})))}function j(e){var t=e.workers,n="".concat(12-t.length/3,"px"),a="".concat(15-t.length/3,"px"),o="".concat(25-t.length/3,"px");return r.a.createElement(x.a,{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"flex-start",flexWrap:"wrap",mx:.5,height:"100vh",bgcolor:y.a[700]},t.map((function(e){return r.a.createElement(x.a,{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",m:1,fontSize:a,bgcolor:y.a[600]},r.a.createElement(x.a,{display:"flex",overflow:"auto",justifyContent:"flex-start",flexDirection:"column",textAlign:"left",p:2},r.a.createElement("div",null,"PID: ",e.pid),r.a.createElement("div",null,"WORDS: ",e.words.toLocaleString()),r.a.createElement("p",null),r.a.createElement(x.a,{textAlign:"center",style:{fontSize:n}},"MEM"),r.a.createElement("div",{style:{fontSize:o}},e.mem)))})))}function D(e){var t=e.caches,n="".concat(10-t.length/3,"px"),a="".concat(13-t.length/3,"px"),o="".concat(22-t.length/3,"px");return r.a.createElement(x.a,{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"flext-start",flexWrap:"wrap",mx:.5,mb:.5,bgcolor:y.a[700]},t.map((function(e){return r.a.createElement(x.a,{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",m:1,fontSize:a,bgcolor:y.a[600]},r.a.createElement(x.a,{display:"flex",overflow:"auto",justifyContent:"flex-start",flexDirection:"column",p:2,textAlign:"left"},r.a.createElement("div",null,"PID: ",e.pid),r.a.createElement("div",null,"COUNT: ",e.cacheCount),r.a.createElement("div",null,"CACHE HIT: ",e.cacheHit),r.a.createElement("p",null),r.a.createElement(x.a,{textAlign:"center",style:{fontSize:n}},"MEM"),r.a.createElement("div",{style:{fontSize:o}},e.mem)))})))}var M={SOCKET_NAMESPACE:"/",urls:{load:"/loadSong/useWorkers",clear:"/clearSong"}},I=n(14),O=n(70),z=n.n(O),A={get:function(e){return Object(s.a)(c.a.mark((function t(){var n,a;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,n=M.urls[e]){t.next=4;break}return t.abrupt("return",Promise.resolve({success:!1,msg:"not valid type : ".concat(e)}));case 4:return t.next=6,z.a.get(n);case 6:if(200!==(a=t.sent).status){t.next=10;break}return console.log(a.data),t.abrupt("return",a.data);case 10:t.next=15;break;case 12:t.prev=12,t.t0=t.catch(0),console.error(t.t0);case 15:case"end":return t.stop()}}),t,null,[[0,12]])})))()}},L=(n(134),Object(I.a)({root:{backgroundColor:y.a[800],"&:hover":{backgroundColor:y.a[500]},"&:active":{backgroundColor:y.a[300]}}})(v.a)),W=function(e){function t(){var e;return Object(f.a)(this,t),(e=Object(d.a)(this,Object(h.a)(t).call(this))).state={master:{},workers:[],cacheWorkers:[],currentLog:[]},e}return Object(p.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=M.SOCKET_NAMESPACE.endpoint,t=E()(e);t.on("connect",(function(){console.log("socket connected")})),t.on("masterMonitor",this.updateMasterMonitor.bind(this)),t.on("workerMonitor",this.updateWorkerMonitor.bind(this)),t.on("cacheWorkerMonitor",this.updateCacheWorkerMonitor.bind(this)),t.on("logMonitor",this.updateLogMonitor.bind(this)),t.on("error",this.resetState.bind(this)),t.on("disconnect",this.resetState.bind(this)),t.on("connect_error",this.resetState.bind(this))}},{key:"updateMasterMonitor",value:function(e){this.setState(Object(u.a)({},this.state,{master:e}))}},{key:"updateWorkerMonitor",value:function(e){this.setState(Object(u.a)({},this.state,{workers:e}))}},{key:"updateCacheWorkerMonitor",value:function(e){this.setState(Object(u.a)({},this.state,{cacheWorkers:e}))}},{key:"updateLogMonitor",value:function(e){console.log("update log:",e),this.setState(Object(u.a)({},this.state,{currentLog:e}))}},{key:"resetState",value:function(){this.setState({master:{},workers:[],currentLog:[]})}},{key:"onClickLoad",value:function(){var e=Object(s.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,A.get("load");case 2:t=e.sent,console.log(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"onClickClear",value:function(){var e=Object(s.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,A.get("clear");case 2:t=e.sent,console.log(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state,t=e.workers,n=e.master,a=e.currentLog,o=e.cacheWorkers;return r.a.createElement("div",{className:"App"},r.a.createElement(w,{text:"Status"}),r.a.createElement(x.a,{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"stretch",height:"80vh"},r.a.createElement(x.a,{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"stretch",flexGrow:"1",width:"45vw"},r.a.createElement(k,{title:"master"}),r.a.createElement(b,{master:n}),r.a.createElement(S,{currentLog:a})),r.a.createElement(x.a,{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"stretch",flexGrow:"1",width:"45vw"},r.a.createElement(k,{title:"worker"}),r.a.createElement(j,{workers:t}),r.a.createElement(k,{title:"cache"}),r.a.createElement(D,{caches:o}))),r.a.createElement(x.a,{height:"10vh",display:"flex",justifyContent:"space-around",flexDirection:"row",alignItems:"center",bgcolor:y.a[900]},r.a.createElement(L,{onClick:this.onClickLoad,variant:"contained",color:"primary",size:"medium"},"load"),r.a.createElement(L,{onClick:this.onClickClear,variant:"contained",color:"primary",size:"medium"},"clear")))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(W,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},76:function(e,t,n){e.exports=n(135)},81:function(e,t,n){}},[[76,1,2]]]);
//# sourceMappingURL=main.a799ca71.chunk.js.map