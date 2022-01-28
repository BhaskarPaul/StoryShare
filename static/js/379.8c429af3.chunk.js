"use strict";(self.webpackChunktry_firebase=self.webpackChunktry_firebase||[]).push([[379],{6793:function(e,n,t){t(2791);var r=t(1762),a=t(3329),i=t(184);n.Z=function(e){var n=e.message,t=e.handleClose;return(0,i.jsx)("div",{style:{marginTop:"30px",borderRadius:"10px"},children:(0,i.jsxs)(r.bZ,{status:"error",children:[(0,i.jsx)(r.zM,{}),(0,i.jsx)(r.Cd,{mr:2,children:n}),(0,i.jsx)(a.P,{onClick:t,position:"absolute",right:"8px",top:"8px"})]})})}},1379:function(e,n,t){t.r(n),t.d(n,{default:function(){return Q}});var r=t(1413),a=t(885),i=t(2791),s=t(6831),c=t(9611),o=t(5223),l=t(1340),u=t(3757),d=t(9388),f=t(7982),h=t(1475);var m=t(131),v=t(9829),p=0;function k(){var e=p;return p++,e}var b=function(e){var n=e.children,t=e.initial,r=e.isPresent,a=e.onExitComplete,s=e.custom,c=e.presenceAffectsLayout,o=(0,v.h)(x),l=(0,v.h)(k),u=(0,i.useMemo)((function(){return{id:l,initial:t,isPresent:r,custom:s,onExitComplete:function(e){var n,t;o.set(e,!0);try{for(var r=(0,d.XA)(o.values()),i=r.next();!i.done;i=r.next()){if(!i.value)return}}catch(s){n={error:s}}finally{try{i&&!i.done&&(t=r.return)&&t.call(r)}finally{if(n)throw n.error}}null===a||void 0===a||a()},register:function(e){return o.set(e,!1),function(){return o.delete(e)}}}}),c?void 0:[r]);return(0,i.useMemo)((function(){o.forEach((function(e,n){return o.set(n,!1)}))}),[r]),i.useEffect((function(){!r&&!o.size&&(null===a||void 0===a||a())}),[r]),i.createElement(m.O.Provider,{value:u},n)};function x(){return new Map}var g=t(7497);function C(e){return e.key||""}var y=function(e){var n=e.children,t=e.custom,r=e.initial,a=void 0===r||r,s=e.onExitComplete,c=e.exitBeforeEnter,o=e.presenceAffectsLayout,l=void 0===o||o,u=(0,d.CR)(function(){var e=(0,i.useRef)(!1),n=(0,d.CR)((0,i.useState)(0),2),t=n[0],r=n[1];(0,h.z)((function(){return e.current=!0}));var a=(0,i.useCallback)((function(){!e.current&&r(t+1)}),[t]);return[(0,i.useCallback)((function(){return f.ZP.postRender(a)}),[a]),t]}(),1),m=u[0],v=(0,i.useContext)(g.p).forceRender;v&&(m=v);var p=(0,i.useRef)(!0),k=(0,i.useRef)(!0);(0,i.useEffect)((function(){return function(){k.current=!1}}),[]);var x=function(e){var n=[];return i.Children.forEach(e,(function(e){(0,i.isValidElement)(e)&&n.push(e)})),n}(n),y=(0,i.useRef)(x),E=(0,i.useRef)(new Map).current,I=(0,i.useRef)(new Set).current;if(function(e,n){e.forEach((function(e){var t=C(e);n.set(t,e)}))}(x,E),p.current)return p.current=!1,i.createElement(i.Fragment,null,x.map((function(e){return i.createElement(b,{key:C(e),isPresent:!0,initial:!!a&&void 0,presenceAffectsLayout:l},e)})));for(var j=(0,d.ev)([],(0,d.CR)(x),!1),w=y.current.map(C),P=x.map(C),B=w.length,N=0;N<B;N++){var R=w[N];-1===P.indexOf(R)?I.add(R):I.delete(R)}return c&&I.size&&(j=[]),I.forEach((function(e){if(-1===P.indexOf(e)){var n=E.get(e);if(n){var r=w.indexOf(e);j.splice(r,0,i.createElement(b,{key:C(n),isPresent:!1,onExitComplete:function(){E.delete(e),I.delete(e);var n=y.current.findIndex((function(n){return n.key===e}));if(y.current.splice(n,1),!I.size){if(y.current=x,!1===k.current)return;m(),s&&s()}},custom:t,presenceAffectsLayout:l},n))}}})),j=j.map((function(e){var n=e.key;return I.has(n)?e:i.createElement(b,{key:C(e),isPresent:!0,presenceAffectsLayout:l},e)})),y.current=j,i.createElement(i.Fragment,null,I.size?j:j.map((function(e){return(0,i.cloneElement)(e)})))},E=t(1212);function I(){return I=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},I.apply(this,arguments)}var j=(0,c.kr)({name:"CheckboxGroupContext",strict:!1}),w=(j[0],j[1]);function P(e,n){if(null==e)return{};var t,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}s.Ts;var B=["isIndeterminate","isChecked"],N="custom"in u.E?u.E.custom(l.m$.svg):(0,u.E)(l.m$.svg),R=function(e){return i.createElement(N,I({width:"1.2em",viewBox:"0 0 12 10",variants:{unchecked:{opacity:0,strokeDashoffset:16},checked:{opacity:1,strokeDashoffset:0,transition:{duration:.2}}},style:{fill:"none",strokeWidth:2,stroke:"currentColor",strokeDasharray:16}},e),i.createElement("polyline",{points:"1.5 6 4.5 9 10.5 1"}))},D=function(e){return i.createElement(N,I({width:"1.2em",viewBox:"0 0 24 24",variants:{unchecked:{scaleX:.65,opacity:0},checked:{scaleX:1,opacity:1,transition:{scaleX:{duration:0},opacity:{duration:.02}}}},style:{stroke:"currentColor",strokeWidth:4}},e),i.createElement("line",{x1:"21",x2:"3",y1:"12",y2:"12"}))},Z=function(e){var n=e.open,t=e.children;return i.createElement(y,{initial:!1},n&&i.createElement(u.E.div,{variants:{unchecked:{scale:.5},checked:{scale:1}},initial:"unchecked",animate:"checked",exit:"unchecked",style:{display:"flex",alignItems:"center",justifyContent:"center",height:"100%"}},t))},M=function(e){var n=e.isIndeterminate,t=e.isChecked,r=P(e,B),a=n?D:R;return i.createElement(Z,{open:t||n},i.createElement(a,r))},_=["defaultIsChecked","defaultChecked","isChecked","isFocusable","isDisabled","isReadOnly","isRequired","onChange","isIndeterminate","isInvalid","name","value","id","onBlur","onFocus","tabIndex","aria-label","aria-labelledby","aria-invalid","aria-describedby"];function F(e){e.preventDefault(),e.stopPropagation()}var S=["spacing","className","children","iconColor","iconSize","icon","isChecked","isDisabled","onChange"],T=(0,l.m$)("span",{baseStyle:{display:"inline-flex",alignItems:"center",justifyContent:"center",verticalAlign:"top",userSelect:"none",flexShrink:0}}),A=(0,l.m$)("label",{baseStyle:{cursor:"pointer",display:"inline-flex",alignItems:"center",verticalAlign:"top",position:"relative",_disabled:{cursor:"not-allowed"}}}),L=(0,l.Gp)((function(e,n){var t=w(),r=I({},t,e),a=(0,l.jC)("Checkbox",r),u=(0,l.Lr)(e),d=u.spacing,f=void 0===d?"0.5rem":d,h=u.className,m=u.children,v=u.iconColor,p=u.iconSize,k=u.icon,b=void 0===k?i.createElement(M,null):k,x=u.isChecked,g=u.isDisabled,C=void 0===g?null==t?void 0:t.isDisabled:g,y=u.onChange,j=P(u,S),B=x;null!=t&&t.value&&u.value&&(B=t.value.includes(u.value));var N=y;null!=t&&t.onChange&&u.value&&(N=(0,s.PP)(t.onChange,y));var R=function(e){void 0===e&&(e={});var n=e,t=n.defaultIsChecked,r=n.defaultChecked,a=void 0===r?t:r,l=n.isChecked,u=n.isFocusable,d=n.isDisabled,f=n.isReadOnly,h=n.isRequired,m=n.onChange,v=n.isIndeterminate,p=n.isInvalid,k=n.name,b=n.value,x=n.id,g=n.onBlur,C=n.onFocus,y=n.tabIndex,j=void 0===y?void 0:y,w=n["aria-label"],B=n["aria-labelledby"],N=n["aria-invalid"],R=n["aria-describedby"],D=P(n,_),Z=(0,o.W6)(m),M=(0,o.W6)(g),S=(0,o.W6)(C),T=(0,o.kt)(),A=T[0],L=T[1],z=(0,o.kt)(),O=z[0],X=z[1],U=(0,o.kt)(),q=U[0],K=U[1],J=(0,i.useRef)(null),G=(0,i.useState)(!0),V=G[0],W=G[1],$=(0,i.useState)(!!a),H=$[0],Y=$[1],Q=(0,o.pY)(l,H),ee=Q[0],ne=Q[1];(0,s.ZK)({condition:!!t,message:'The "defaultIsChecked" prop has been deprecated and will be removed in a future version. Please use the "defaultChecked" prop instead, which mirrors default React checkbox behavior.'});var te=(0,i.useCallback)((function(e){f||d?e.preventDefault():(ee||Y(ne?e.target.checked:!!v||e.target.checked),null==Z||Z(e))}),[f,d,ne,ee,v,Z]);(0,o.Gw)((function(){J.current&&(J.current.indeterminate=Boolean(v))}),[v]),(0,o.rf)((function(){d&&L.off()}),[d,L]);var re=d&&!u,ae=(0,i.useCallback)((function(e){" "===e.key&&K.on()}),[K]),ie=(0,i.useCallback)((function(e){" "===e.key&&K.off()}),[K]);(0,o.Gw)((function(){J.current&&J.current.checked!==ne&&Y(J.current.checked)}),[J.current]);var se=(0,i.useCallback)((function(e,n){return void 0===e&&(e={}),void 0===n&&(n=null),I({},e,{ref:n,"data-active":(0,s.PB)(q),"data-hover":(0,s.PB)(O),"data-checked":(0,s.PB)(ne),"data-focus":(0,s.PB)(A),"data-indeterminate":(0,s.PB)(v),"data-disabled":(0,s.PB)(d),"data-invalid":(0,s.PB)(p),"data-readonly":(0,s.PB)(f),"aria-hidden":!0,onMouseDown:(0,s.v0)(e.onMouseDown,(function(e){e.preventDefault(),K.on()})),onMouseUp:(0,s.v0)(e.onMouseUp,K.off),onMouseEnter:(0,s.v0)(e.onMouseEnter,X.on),onMouseLeave:(0,s.v0)(e.onMouseLeave,X.off)})}),[q,ne,d,A,O,v,p,f,K,X.off,X.on]),ce=(0,i.useCallback)((function(e,n){return void 0===e&&(e={}),void 0===n&&(n=null),I({},D,e,{ref:(0,c.lq)(n,(function(e){e&&W("LABEL"===e.tagName)})),onClick:(0,s.v0)(e.onClick,(function(){var e;V||(null==(e=J.current)||e.click(),(0,s.T_)(J.current,{nextTick:!0}))})),"data-disabled":(0,s.PB)(d),"data-checked":(0,s.PB)(ne),"data-invalid":(0,s.PB)(p)})}),[D,d,ne,p,V]),oe=(0,i.useCallback)((function(e,n){return void 0===e&&(e={}),void 0===n&&(n=null),I({},e,{ref:(0,c.lq)(J,n),type:"checkbox",name:k,value:b,id:x,tabIndex:j,onChange:(0,s.v0)(e.onChange,te),onBlur:(0,s.v0)(e.onBlur,M,L.off),onFocus:(0,s.v0)(e.onFocus,S,L.on),onKeyDown:(0,s.v0)(e.onKeyDown,ae),onKeyUp:(0,s.v0)(e.onKeyUp,ie),required:h,checked:ne,disabled:re,readOnly:f,"aria-label":w,"aria-labelledby":B,"aria-invalid":N?Boolean(N):p,"aria-describedby":R,"aria-disabled":d,style:E.NL})}),[k,b,x,te,L.off,L.on,M,S,ae,ie,h,ne,re,f,w,B,N,p,R,d,j]),le=(0,i.useCallback)((function(e,n){return void 0===e&&(e={}),void 0===n&&(n=null),I({},e,{ref:n,onMouseDown:(0,s.v0)(e.onMouseDown,F),onTouchStart:(0,s.v0)(e.onTouchStart,F),"data-disabled":(0,s.PB)(d),"data-checked":(0,s.PB)(ne),"data-invalid":(0,s.PB)(p)})}),[ne,d,p]);return{state:{isInvalid:p,isFocused:A,isChecked:ne,isActive:q,isHovered:O,isIndeterminate:v,isDisabled:d,isReadOnly:f,isRequired:h},getRootProps:ce,getCheckboxProps:se,getInputProps:oe,getLabelProps:le,htmlProps:D}}(I({},j,{isDisabled:C,isChecked:B,onChange:N})),D=R.state,Z=R.getInputProps,L=R.getCheckboxProps,z=R.getLabelProps,O=R.getRootProps,X=i.useMemo((function(){return I({opacity:D.isChecked||D.isIndeterminate?1:0,transform:D.isChecked||D.isIndeterminate?"scale(1)":"scale(0.95)",fontSize:p,color:v},a.icon)}),[v,p,D.isChecked,D.isIndeterminate,a.icon]),U=i.cloneElement(b,{__css:X,isIndeterminate:D.isIndeterminate,isChecked:D.isChecked});return i.createElement(A,I({__css:a.container,className:(0,s.cx)("chakra-checkbox",h)},O()),i.createElement("input",I({className:"chakra-checkbox__input"},Z({},n))),i.createElement(T,I({__css:a.control,className:"chakra-checkbox__control"},L()),U),m&&i.createElement(l.m$.span,I({className:"chakra-checkbox__label"},z(),{__css:I({marginStart:f},a.label)}),m))}));s.Ts&&(L.displayName="Checkbox");var z=t(855),O=t(8735),X=t(3393),U=t(5798),q=t(7805),K=t(807),J=t.n(K),G=t(6793),V=t(3504),W=t(6871),$=t(6910),H=t(292),Y=(t(3508),t(184)),Q=function(e){var n=e.formValue,t=e.setFormValue,s=(0,W.s0)(),c=(0,$.F_)(H.I8),o=(0,a.Z)(c,3),l=o[0],u=o[1],d=(o[2],(0,i.useState)(!1)),f=(0,a.Z)(d,2),h=f[0],m=f[1],v=(0,i.useState)({message:"",visible:!1}),p=(0,a.Z)(v,2),k=p[0],b=p[1],x=(0,z.ac)("(min-width: 1000px)"),g=(0,a.Z)(x,1)[0];(0,i.useEffect)((function(){""!==n.firstName&&""!==n.lastName&&""!==n.email&&""!==n.password&&!0===n.checkbox?m(!0):m(!1)}),[n]),(0,i.useEffect)((function(){l&&s("/home",{replace:!0})}),[u,l]);return u?(0,Y.jsx)(J(),{}):(0,Y.jsxs)("div",{className:"user-information",style:{width:g?"400px":"auto"},children:[k.visible&&(0,Y.jsx)(G.Z,{message:k.message,handleClose:function(){return b({visible:!1,message:""})}}),(0,Y.jsx)(O.X6,{className:"signup-heading",style:{marginBottom:"30px",marginTop:k.visible&&"30px"},children:"Registration form"}),(0,Y.jsx)(X.NI,{isRequired:!0,children:(0,Y.jsxs)(O.gC,{spacing:4,align:"stretch",children:[(0,Y.jsxs)("div",{children:[(0,Y.jsx)(X.lX,{htmlFor:"first-name",children:"First name"}),(0,Y.jsx)(U.II,{id:"first-name",placeholder:"First name",type:"text",value:n.firstName,onChange:function(e){return t((0,r.Z)((0,r.Z)({},n),{},{firstName:e.target.value}))}})]}),(0,Y.jsxs)("div",{children:[(0,Y.jsx)(X.lX,{htmlFor:"last-name",children:"Last name"}),(0,Y.jsx)(U.II,{id:"last-name",placeholder:"last name",type:"text",value:n.lastName,onChange:function(e){return t((0,r.Z)((0,r.Z)({},n),{},{lastName:e.target.value}))}})]}),(0,Y.jsxs)("div",{children:[(0,Y.jsx)(X.lX,{htmlFor:"email",children:"Email"}),(0,Y.jsxs)(U.BZ,{size:"md",children:[(0,Y.jsx)(U.II,{pr:"4.5rem",type:"email",placeholder:"Email",value:n.email,onChange:function(e){return t((0,r.Z)((0,r.Z)({},n),{},{email:e.target.value}))}}),(0,Y.jsx)(U.xH,{width:"4.5rem",children:(0,Y.jsx)(q.zx,{h:"1.75rem",size:"sm",colorScheme:"blue",children:"Verify"})})]})]}),(0,Y.jsxs)("div",{children:[(0,Y.jsx)(X.lX,{htmlFor:"password",children:"Password"}),(0,Y.jsx)(U.II,{id:"password",placeholder:"Password",type:"password",value:n.password,onChange:function(e){return t((0,r.Z)((0,r.Z)({},n),{},{password:e.target.value}))},password:!0})]}),(0,Y.jsxs)("div",{children:[(0,Y.jsx)(X.lX,{htmlFor:"checkbox",children:"Terms"}),(0,Y.jsx)(L,{id:"checkbox",value:n.checkbox,onChange:function(e){return t((0,r.Z)((0,r.Z)({},n),{},{checkbox:e.target.checked}))},children:"I am accepting all term and condition"})]}),(0,Y.jsx)("div",{children:(0,Y.jsx)(q.zx,{disabled:!h,colorScheme:"blue",onClick:function(){(0,H.Js)(n).then((function(e){return b({visible:!0,message:e})})),t({firstName:"",lastName:"",email:"",password:"",checkbox:!1})},children:"Register"})}),(0,Y.jsxs)("div",{children:["Have already an account?"," ",(0,Y.jsx)(V.rU,{to:"/login",style:{color:"blue",textDecoration:"underline"},children:"Login"})]})]})})]})}},8906:function(e,n,t){t.d(n,{l:function(){return r}});var r=(0,t(2426).ZF)({apiKey:"AIzaSyCApb_p7Vv_9bMAlMMa0-mcG4tK0TZlTps",authDomain:"test-12102.firebaseapp.com",projectId:"test-12102",storageBucket:"test-12102.appspot.com",messagingSenderId:"495225076133",appId:"1:495225076133:web:8de677969340b46d96504c"})},292:function(e,n,t){t.d(n,{I8:function(){return l},db:function(){return u},Js:function(){return d},H0:function(){return f}});var r=t(5861),a=t(7757),i=t.n(a),s=t(9946),c=t(9062),o=t(8906),l=(0,s.v0)(o.l),u=(0,c.ad)(o.l),d=function(){var e=(0,r.Z)(i().mark((function e(n){var t,r,a,o,d,f,h;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=n.firstName,r=n.lastName,a=n.email,o=n.password,d=n.checkbox,e.next=4,(0,s.Xb)(l,a,o);case 4:return f=e.sent,h=f.user,e.next=8,(0,c.ET)((0,c.hJ)(u,"users"),{_id:h.uid,name:t+" "+r,firstName:t,lastName:r,email:a,authType:"e&p",termsAcceptation:d});case 8:e.next=14;break;case 10:return e.prev=10,e.t0=e.catch(0),console.log("error",e.t0.message),e.abrupt("return",e.t0.message);case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(n){return e.apply(this,arguments)}}(),f=function(e){var n=new Date,t=n.getUTCMonth(),r=n.getUTCDate(),a=n.getUTCFullYear();return"".concat("c"===e?"created":"updated"," at ").concat(r," ").concat(["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][t],", ").concat(a)}}}]);
//# sourceMappingURL=379.8c429af3.chunk.js.map