(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{29:function(e,t,a){},42:function(e,t,a){},5336:function(e,t,a){e.exports=a(5527)},5354:function(e,t,a){},5521:function(e,t,a){},5527:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(22),c=a.n(r),i=a(16),s=a(17),l=a(19),u=a(18),m=a(20),d=a(5529),p=a(5530),h=(a(29),a(39)),b=a(118),v=a.n(b),f=a(119),E=a.n(f),y=(a(5354),function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).handleMessageReceived=function(e){var t=JSON.parse(e.message).url;a.setState({url:""}),a.setState({url:t})},a.handleError=function(e){"PNUnknownCategory"===e.category&&console.log(e.errorData.message)},a.pubnub=new v.a({subscribeKey:"sub-c-634d2abe-28df-11e9-991a-bee2ac9fced0"}),a.pubnub.init(Object(h.a)(Object(h.a)(a))),a.state={url:""},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentWillMount",value:function(){this.pubnub.subscribe({channels:["default"],withPresence:!0}),this.pubnub.addListener({status:this.handleError,message:this.handleMessageReceived})}},{key:"componentWillUnmount",value:function(){this.pubnub.unsubscribe({channels:["default"]})}},{key:"render",value:function(){return o.a.createElement("div",{className:"container"},o.a.createElement("div",{className:"hero"}),o.a.createElement("div",{className:"speechOut"}),o.a.createElement(E.a,{src:this.state.url,autoPlay:!0}))}}]),t}(n.Component)),O=a(40),g=a.n(O),j=a(69),k=a.n(j),N=a(50),S=a.n(N),w=a(31),x=a.n(w),C=a(25),B=a(120),M=a.n(B),T=(a(42),a(49)),W=a.n(T),D=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).getText=function(){return a.state.text},a.handleChanged=function(e){a.setState({text:e.target.value})},a.state={text:""},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return o.a.createElement(W.a,{onChange:this.handleChanged,label:"text"})}}]),t}(n.Component),F=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).getText=function(){for(var e="",t=a.props.data,n=0;n<t.length;n++){var o=t[n];if("%input%"===o)e+=a.refs[String(n)].getText();else e+=o;e+=" "}return e},a.handleClick=function(){var e=a.getText();a.props.onSend(e)},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"viewsForData",value:function(e){for(var t=[],a=0;a<e.length;a++){var n=e[a];"%input%"===n?t.push(o.a.createElement("div",{className:"input",key:a},o.a.createElement(D,{ref:String(a)}))):t.push(o.a.createElement("h4",{id:String(a),key:a},n))}return t}},{key:"render",value:function(){return o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"section"},this.viewsForData(this.props.data)),null==this.props.onSend?null:o.a.createElement("div",{className:"buttons"},o.a.createElement(x.a,{className:"iconButton",color:"primary",variant:"contained",onClick:this.handleClick},o.a.createElement(C.c,null))))}}]),t}(n.Component),A=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).addField=function(){var e=a.state.protoSections;e.push("text"),a.setState({protoSections:e})},a.addLabel=function(){var e=a.state.protoSections;e.push("%input%"),a.setState({protoSections:e})},a.state={protoSections:["text"]},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"viewsForData",value:function(){for(var e=[],t=0;t<this.state.protoSections.length;t++){"text"===this.state.protoSections[t]?e.push(o.a.createElement("div",{className:"input",key:t},o.a.createElement(D,{ref:String(t)}))):e.push(o.a.createElement(W.a,{disabled:!0,key:t,label:"wildcard",variant:"outlined",margin:"normal"}))}return e}},{key:"getSections",value:function(){for(var e=[],t=0;t<this.state.protoSections.length;t++){var a=this.state.protoSections[t];"text"===a?e.push(this.refs[String(t)].getText()):e.push(a)}return e}},{key:"render",value:function(){return o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"section"},this.viewsForData()),o.a.createElement("div",{className:"buttons"},o.a.createElement(x.a,{onClick:this.addField,className:"iconButton",variant:"contained",color:"primary"},o.a.createElement(C.g,null)),o.a.createElement(x.a,{onClick:this.addLabel,className:"iconButton",variant:"contained",color:"primary"},o.a.createElement(C.a,null))))}}]),t}(n.Component),J=[["Hi","%input%","how's your day so far?"],["What would you like to talk about in particular?"],["What's in your orbit?"]],L="https://puppet-230708.appspot.com",P=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).sendText=function(e){M.a.post(L+"/broadcast",{text:e,voice:a.state.voice}).then(function(e){console.log(e)}).catch(function(e){console.log(e)})},a.openModal=function(){a.setState({modalOpen:!0})},a.closeModal=function(){a.setState({modalOpen:!1})},a.saveSection=function(){var e=a.state.sections,t=a.builder.getSections();e.push(t),a.setState({sections:e}),a.closeModal()},a.state={sections:J,modalOpen:!1,voice:"en-US-Wavenet-D"},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"import",value:function(){}},{key:"export",value:function(){}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"container"},o.a.createElement(k.a,{className:"modal-container",open:this.state.modalOpen},o.a.createElement(S.a,{className:"paper-modal"},o.a.createElement("div",{className:"header"},o.a.createElement(x.a,{onClick:this.closeModal,className:"iconButton",variant:"contained",color:"primary"},o.a.createElement(C.b,null))),o.a.createElement(A,{ref:function(t){e.builder=t}}),o.a.createElement("div",{className:"modal-footer"},o.a.createElement(g.a,{onClick:this.saveSection,className:"footer-button",variant:"contained",color:"primary"},"Save")))),o.a.createElement(S.a,{className:"paper-container"},this.state.sections.map(function(t,a){return o.a.createElement(F,{data:t,key:a,onSend:e.sendText})}),o.a.createElement(F,{data:["%input%"],onSend:this.sendText}),o.a.createElement("div",{className:"footer"},o.a.createElement(g.a,{disabled:!0,onClick:this.import,className:"footer-button",variant:"contained",color:"primary"},"Import"),o.a.createElement(g.a,{disabled:!0,onClick:this.export,className:"footer-button",variant:"contained",color:"primary"},"Export"),o.a.createElement(g.a,{onClick:this.openModal,className:"footer-button",variant:"contained",color:"primary"},"Add New..."))))}}]),t}(n.Component),U=a(5528),H=a(52),I=a.n(H),R=(a(5521),function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"container"},o.a.createElement("h1",null,"Hi Alice, what is your mood?"),o.a.createElement(I.a,{className:"startButton",component:U.a,to:"/client",color:"primary"},o.a.createElement(C.e,null)),o.a.createElement(I.a,{className:"startButton",component:U.a,to:"/client",color:"primary"},o.a.createElement(C.d,null)),o.a.createElement(I.a,{className:"startButton",component:U.a,to:"/client",color:"primary"},o.a.createElement(C.f,null)))}}]),t}(n.Component)),K=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return o.a.createElement(d.a,null,o.a.createElement("div",null,o.a.createElement(p.a,{exact:!0,path:"/",component:R}),o.a.createElement(p.a,{path:"/dashboard",component:P}),o.a.createElement(p.a,{path:"/client",component:y})))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(5525);c.a.render(o.a.createElement(K,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[5336,2,1]]]);
//# sourceMappingURL=main.6d4a161d.chunk.js.map