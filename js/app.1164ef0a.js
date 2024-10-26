(function(){"use strict";var e={6596:function(e,t,o){var n=o(5130),l=o(6768),a={__name:"App",setup(e){return(e,t)=>{const o=(0,l.g2)("router-view");return(0,l.uX)(),(0,l.Wv)(o)}}};const s=a;var r=s,i=o(1387),u=(o(4114),o(144)),c=o(4232),d=o(4373);const p=d.A.create({baseURL:"http://localhost:5000"});p.interceptors.request.use((e=>{const t=localStorage.getItem("token");return t&&(e.headers["Authorization"]=`Bearer ${t}`),e}),(e=>Promise.reject(e))),p.interceptors.response.use((e=>e),(e=>(e.response&&401===e.response.status&&console.error("Unauthorized access - redirecting to login..."),Promise.reject(e))));var m=p;const k=(0,u.KR)(!1),v=(0,u.KR)(""),g=(0,u.KR)(""),h=(e,t)=>{v.value=e,g.value=t,k.value=!0},L=()=>{k.value=!1};function R(){return{showModal:k,modalTitle:v,modalMessage:g,openErrorModal:h,closeModal:L}}let f;const b=()=>{if(!f){const e=(0,u.KR)(""),t=(0,u.KR)(""),o=(0,u.KR)(null),n=(0,i.rd)(),{openErrorModal:l}=R(),a=async()=>{try{const o=await m.post("/api/auth/register",{username:e.value,password:t.value});console.log("Registration successful:",o.data),await r()}catch(o){l(`Registration failed: ${o}`),console.error("Registration failed:",o)}},s=async()=>{try{const o=await m.post("/api/auth/register",{username:e.value,password:t.value});return console.log("Registration successful:",o.data),!0}catch(o){l(`Registration failed: ${o}`),console.error("Registration failed:",o)}},r=async()=>{try{const l=await m.post("/api/auth/login",{username:e.value,password:t.value});o.value=l.data.token,localStorage.setItem("token",o.value),n.push("/todos")}catch(a){l(`Login failed: ${a}`),console.error("Login failed:",a)}},c=()=>{o.value=null,localStorage.removeItem("token"),n.push("/login")},d=()=>!!localStorage.getItem("token");f={register:a,registerOtherUser:s,login:r,logout:c,isAuthenticated:d,username:e,password:t,token:o}}return f};var y=b;const C=(0,u.KR)(!1),w=()=>{C.value=!0},E=()=>{C.value=!1};function U(){return{showLoadingModal:C,openLoadingModal:w,closeLoadingModal:E}}let M;function T(){if(!M){const{isAuthenticated:e}=y(),{openErrorModal:t}=R(),{openLoadingModal:o,closeLoadingModal:n}=U(),a=(0,u.KR)([]),s=(0,u.KR)(!1),r=(0,u.KR)(""),i=async()=>{if(!e())return t("Authentication Error","You must be logged in to view todo items."),void n();let l;try{l=setTimeout((()=>{o()}),500);const e=await m.get("/api/TodoItems");a.value=e.data}catch(s){t("Fetch Error","Failed to load todo items. Please try again later.")}finally{l&&clearTimeout(l),n()}},c=async()=>{if(r.value.trim())try{const e={title:r.value,isCompleted:!1};await m.post("/api/TodoItems",e),r.value="",await i()}catch(e){t("Add Error","Failed to add the new task. Please try again later.")}else t("Validation Error","Please enter a task title.")},d=async e=>{const o={...e,isCompleted:!e.isCompleted};try{await m.put(`/api/TodoItems/${e.id}`,o),await i()}catch(n){t("Update Error","Failed to update the task. Please try again later.")}},p=async e=>{try{await m.delete(`/api/TodoItems/${e}`),await i()}catch(o){t("Delete Error","Failed to delete the task. Please try again later.")}},k=(0,l.EW)((()=>a.value.slice().sort(((e,t)=>s.value?e.isCompleted===t.isCompleted?0:e.isCompleted?-1:1:e.isCompleted===t.isCompleted?0:e.isCompleted?1:-1))));M={todoItems:a,orderByCompleted:s,newTodoTitle:r,fetchTodoItems:i,addTodoItem:c,toggleComplete:d,deleteTodoItem:p,orderedTodoItems:k}}return M}const _={key:0,class:"modal"},K={class:"modal-content"},F={class:"modal-title"},I={class:"modal-message"};var A={__name:"ShowErrorModal",setup(e){const{showModal:t,modalTitle:o,modalMessage:n,closeModal:a}=R();return(e,s)=>(0,u.R1)(t)?((0,l.uX)(),(0,l.CE)("div",_,[(0,l.Lk)("div",K,[(0,l.Lk)("span",{class:"modal-close",onClick:s[0]||(s[0]=(...e)=>(0,u.R1)(a)&&(0,u.R1)(a)(...e))},"×"),(0,l.Lk)("h2",F,(0,c.v_)((0,u.R1)(o)),1),(0,l.Lk)("p",I,(0,c.v_)((0,u.R1)(n)),1),(0,l.Lk)("button",{class:"modal-btn",onClick:s[1]||(s[1]=(...e)=>(0,u.R1)(a)&&(0,u.R1)(a)(...e))},"OK")])])):(0,l.Q3)("",!0)}};const X=A;var j=X;const O={key:0,class:"modal"};var P={__name:"ShowLoadingModal",setup(e){const{showLoadingModal:t}=U();return(e,o)=>(0,u.R1)(t)?((0,l.uX)(),(0,l.CE)("div",O,o[0]||(o[0]=[(0,l.Lk)("div",{class:"modal-content"},[(0,l.Lk)("div",{class:"loading-spinner"}),(0,l.Lk)("p",null,"Loading...")],-1)]))):(0,l.Q3)("",!0)}};const S=P;var V=S;const $={id:"app"},q={class:"input-container"},J={class:"switch"},x={key:0,class:"table-container"},D=["onClick"],Q=["onClick"],N=["onClick"],B={key:1};var W={__name:"ToDoList",setup(e){const{fetchTodoItems:t,addTodoItem:o,toggleComplete:a,deleteTodoItem:s,newTodoTitle:r,orderedTodoItems:i,orderByCompleted:d}=T(),{logout:p}=y();return(0,l.sV)((()=>{t()})),(e,t)=>((0,l.uX)(),(0,l.CE)("div",$,[(0,l.Lk)("button",{class:"admin-button",onClick:t[0]||(t[0]=()=>e.$router.push("/admin"))},"Admin"),(0,l.Lk)("button",{class:"logout-button",onClick:t[1]||(t[1]=(...e)=>(0,u.R1)(p)&&(0,u.R1)(p)(...e))},"Logout"),t[9]||(t[9]=(0,l.Lk)("h1",null,"Todo List",-1)),(0,l.Lk)("div",q,[(0,l.Lk)("label",J,[(0,l.bo)((0,l.Lk)("input",{type:"checkbox","onUpdate:modelValue":t[2]||(t[2]=e=>(0,u.i9)(d)?d.value=e:null)},null,512),[[n.lH,(0,u.R1)(d)]]),t[6]||(t[6]=(0,l.Lk)("span",{class:"slider round"},null,-1))]),(0,l.bo)((0,l.Lk)("input",{"onUpdate:modelValue":t[3]||(t[3]=e=>(0,u.i9)(r)?r.value=e:null),class:"custom-input",placeholder:"New task",onKeyup:t[4]||(t[4]=(0,n.jR)(((...e)=>(0,u.R1)(o)&&(0,u.R1)(o)(...e)),["enter"]))},null,544),[[n.Jo,(0,u.R1)(r)]]),(0,l.Lk)("button",{onClick:t[5]||(t[5]=(...e)=>(0,u.R1)(o)&&(0,u.R1)(o)(...e))},"Add Task")]),(0,u.R1)(i).length>0?((0,l.uX)(),(0,l.CE)("div",x,[(0,l.Lk)("table",null,[t[7]||(t[7]=(0,l.Lk)("thead",null,[(0,l.Lk)("tr",null,[(0,l.Lk)("th",null,"Title"),(0,l.Lk)("th",null,"Actions")])],-1)),(0,l.Lk)("tbody",null,[((0,l.uX)(!0),(0,l.CE)(l.FK,null,(0,l.pI)((0,u.R1)(i),(e=>((0,l.uX)(),(0,l.CE)("tr",{key:e.id},[(0,l.Lk)("td",null,[(0,l.Lk)("span",{class:(0,c.C4)({completed:e.isCompleted})},(0,c.v_)(e.title),3)]),(0,l.Lk)("td",null,[e.isCompleted?(0,l.Q3)("",!0):((0,l.uX)(),(0,l.CE)("button",{key:0,onClick:t=>(0,u.R1)(a)(e)},"Complete",8,D)),e.isCompleted?((0,l.uX)(),(0,l.CE)("button",{key:1,onClick:t=>(0,u.R1)(a)(e)},"Uncomplete",8,Q)):(0,l.Q3)("",!0),(0,l.Lk)("button",{onClick:t=>(0,u.R1)(s)(e.id)},"Delete",8,N)])])))),128))])])])):((0,l.uX)(),(0,l.CE)("div",B,t[8]||(t[8]=[(0,l.Lk)("p",null,"No tasks available.",-1)]))),(0,l.bF)(V),(0,l.bF)(j)]))}};const z=W;var Y=z;const H={class:"login-inputs"};var G={__name:"UserLogin",setup(e){const{login:t,username:o,password:a}=y(),s=(0,u.KR)(null);return(0,l.sV)((()=>{s.value.focus()})),(e,r)=>{const i=(0,l.g2)("router-link");return(0,l.uX)(),(0,l.CE)(l.FK,null,[(0,l.Lk)("div",null,[r[6]||(r[6]=(0,l.Lk)("h2",null,"Login",-1)),(0,l.Lk)("div",H,[(0,l.bo)((0,l.Lk)("input",{ref_key:"inputRef",ref:s,"onUpdate:modelValue":r[0]||(r[0]=e=>(0,u.i9)(o)?o.value=e:null),class:"custom-input",placeholder:"Username",required:"",onKeyup:r[1]||(r[1]=(0,n.jR)(((...e)=>(0,u.R1)(t)&&(0,u.R1)(t)(...e)),["enter"]))},null,544),[[n.Jo,(0,u.R1)(o)]]),(0,l.bo)((0,l.Lk)("input",{"onUpdate:modelValue":r[2]||(r[2]=e=>(0,u.i9)(a)?a.value=e:null),type:"password",class:"custom-input",placeholder:"Password",required:"",onKeyup:r[3]||(r[3]=(0,n.jR)(((...e)=>(0,u.R1)(t)&&(0,u.R1)(t)(...e)),["enter"]))},null,544),[[n.Jo,(0,u.R1)(a)]]),(0,l.Lk)("button",{onClick:r[4]||(r[4]=(...e)=>(0,u.R1)(t)&&(0,u.R1)(t)(...e))},"Login")]),(0,l.bF)(i,{to:"/register"},{default:(0,l.k6)((()=>r[5]||(r[5]=[(0,l.eW)("Don't have an account? Register here.")]))),_:1})]),(0,l.bF)(j)],64)}}};const Z=G;var ee=Z;const te={class:"register-inputs"};var oe={__name:"UserRegister",setup(e){const{username:t,password:o,register:a}=y();return(e,s)=>((0,l.uX)(),(0,l.CE)("div",null,[s[5]||(s[5]=(0,l.Lk)("h2",null,"Register",-1)),(0,l.Lk)("div",te,[(0,l.bo)((0,l.Lk)("input",{"onUpdate:modelValue":s[0]||(s[0]=e=>(0,u.i9)(t)?t.value=e:null),class:"custom-input",placeholder:"Username",required:"",onKeyup:s[1]||(s[1]=(0,n.jR)(((...e)=>(0,u.R1)(a)&&(0,u.R1)(a)(...e)),["enter"]))},null,544),[[n.Jo,(0,u.R1)(t)]]),(0,l.bo)((0,l.Lk)("input",{"onUpdate:modelValue":s[2]||(s[2]=e=>(0,u.i9)(o)?o.value=e:null),class:"custom-input",type:"password",placeholder:"Password",required:"",onKeyup:s[3]||(s[3]=(0,n.jR)(((...e)=>(0,u.R1)(a)&&(0,u.R1)(a)(...e)),["enter"]))},null,544),[[n.Jo,(0,u.R1)(o)]]),(0,l.Lk)("button",{onClick:s[4]||(s[4]=(...e)=>(0,u.R1)(a)&&(0,u.R1)(a)(...e))},"Register")])]))}};const ne=oe;var le=ne;let ae;function se(){if(!ae){const{isAuthenticated:e}=y(),{openErrorModal:t}=R(),{openLoadingModal:o,closeLoadingModal:n}=U(),{openCreateUserModal:l}=R(),a=(0,u.KR)([]),s=async()=>{if(!e())return t("Authentication Error","You must be logged in to view the user list."),void n();let l;try{l=setTimeout((()=>{o()}),500);const e=await m.get("/api/Admin");a.value=e.data}catch(s){console.error("Fetch users error:",s),t(`Failed to fetch users: ${s}`)}finally{l&&clearTimeout(l),n()}},r=async e=>{try{await m.delete(`/api/Admin/${e}`),await s()}catch(o){t(`Failed to delete user: ${o}`)}},i=async()=>{l()};ae={users:a,fetchUsers:s,deleteUser:r,createUser:i}}return ae}const re=(0,u.KR)(!1),{registerOtherUser:ie,password:ue,username:ce}=y(),de=()=>{re.value=!0},pe=()=>{re.value=!1},me=()=>{ie(ce,ue)&&pe()};function ke(){return{showLoadingModal:re,openCreateUserModal:de,closeCreateUserModal:pe,createUser:me}}const ve={key:0,class:"modal"},ge={class:"modal-content"},he={class:"modal-title"},Le={class:"modal-message"},Re={class:"register-inputs"};var fe={__name:"ShowCreateUserModal",setup(e){const{showModal:t,modalTitle:o,modalMessage:a,closeModal:s,createUser:r}=ke(),{username:i,password:d}=y();return(e,p)=>(0,u.R1)(t)?((0,l.uX)(),(0,l.CE)("div",ve,[(0,l.Lk)("div",ge,[(0,l.Lk)("span",{class:"modal-close",onClick:p[0]||(p[0]=(...e)=>(0,u.R1)(s)&&(0,u.R1)(s)(...e))},"×"),(0,l.Lk)("h2",he,(0,c.v_)((0,u.R1)(o)),1),(0,l.Lk)("p",Le,(0,c.v_)((0,u.R1)(a)),1),(0,l.Lk)("div",Re,[(0,l.bo)((0,l.Lk)("input",{"onUpdate:modelValue":p[1]||(p[1]=e=>(0,u.i9)(i)?i.value=e:null),class:"custom-input",placeholder:"Username",required:"",onKeyup:p[2]||(p[2]=(0,n.jR)(((...t)=>e.register&&e.register(...t)),["enter"]))},null,544),[[n.Jo,(0,u.R1)(i)]]),(0,l.bo)((0,l.Lk)("input",{"onUpdate:modelValue":p[3]||(p[3]=e=>(0,u.i9)(d)?d.value=e:null),class:"custom-input",type:"password",placeholder:"Password",required:"",onKeyup:p[4]||(p[4]=(0,n.jR)(((...t)=>e.register&&e.register(...t)),["enter"]))},null,544),[[n.Jo,(0,u.R1)(d)]]),(0,l.Lk)("button",{onClick:p[5]||(p[5]=(...e)=>(0,u.R1)(r)&&(0,u.R1)(r)(...e))},"Create"),(0,l.Lk)("button",{class:"modal-btn",onClick:p[6]||(p[6]=(...e)=>(0,u.R1)(s)&&(0,u.R1)(s)(...e))},"Cancel")])])])):(0,l.Q3)("",!0)}};const be=fe;var ye=be;const Ce={key:0,class:"table-container"},we=["onClick"],Ee={key:1};var Ue={__name:"AdminPanel",setup(e){const{fetchUsers:t,users:o,deleteUser:n}=se();return(0,l.sV)((()=>{t()})),(e,t)=>((0,l.uX)(),(0,l.CE)("div",null,[(0,l.Lk)("button",{class:"admin-button",onClick:t[0]||(t[0]=()=>e.$router.push("/todos"))},"Todos"),(0,l.Lk)("button",{class:"logout-button",onClick:t[1]||(t[1]=(...t)=>e.logout&&e.logout(...t))},"Logout"),t[4]||(t[4]=(0,l.Lk)("h1",null,"User List",-1)),(0,l.Lk)("button",{class:"create-user-button",onClick:t[2]||(t[2]=t=>e.showCreateUserModal=!0)},"Create User"),(0,u.R1)(o).length>0?((0,l.uX)(),(0,l.CE)("div",Ce,[(0,l.Lk)("table",null,[t[3]||(t[3]=(0,l.Lk)("thead",null,[(0,l.Lk)("tr",null,[(0,l.Lk)("th",null,"Name"),(0,l.Lk)("th",null,"Actions")])],-1)),(0,l.Lk)("tbody",null,[((0,l.uX)(!0),(0,l.CE)(l.FK,null,(0,l.pI)((0,u.R1)(o),(e=>((0,l.uX)(),(0,l.CE)("tr",{key:e.id},[(0,l.Lk)("td",null,(0,c.v_)(e),1),(0,l.Lk)("td",null,[(0,l.Lk)("button",{onClick:t=>(0,u.R1)(n)(e.id)},"Delete",8,we)])])))),128))])])])):((0,l.uX)(),(0,l.CE)("p",Ee,"No users available to display.")),(0,l.bF)(V),(0,l.bF)(j),(0,l.bF)(ye)]))}};const Me=Ue;var Te=Me;const _e=(e,t,o)=>{const n=y();n.isAuthenticated()?o():o("/login")},Ke=[{path:"/",redirect:"/login"},{path:"/login",component:ee},{path:"/register",component:le},{path:"/todos",component:Y,beforeEnter:_e},{path:"/admin",component:Te,beforeEnter:_e}],Fe=(0,i.aE)({history:(0,i.LA)(),routes:Ke});var Ie=Fe;const Ae=(0,n.Ef)(r);Ae.use(Ie),Ae.mount("#app")}},t={};function o(n){var l=t[n];if(void 0!==l)return l.exports;var a=t[n]={exports:{}};return e[n].call(a.exports,a,a.exports,o),a.exports}o.m=e,function(){var e=[];o.O=function(t,n,l,a){if(!n){var s=1/0;for(c=0;c<e.length;c++){n=e[c][0],l=e[c][1],a=e[c][2];for(var r=!0,i=0;i<n.length;i++)(!1&a||s>=a)&&Object.keys(o.O).every((function(e){return o.O[e](n[i])}))?n.splice(i--,1):(r=!1,a<s&&(s=a));if(r){e.splice(c--,1);var u=l();void 0!==u&&(t=u)}}return t}a=a||0;for(var c=e.length;c>0&&e[c-1][2]>a;c--)e[c]=e[c-1];e[c]=[n,l,a]}}(),function(){o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,{a:t}),t}}(),function(){o.d=function(e,t){for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={524:0};o.O.j=function(t){return 0===e[t]};var t=function(t,n){var l,a,s=n[0],r=n[1],i=n[2],u=0;if(s.some((function(t){return 0!==e[t]}))){for(l in r)o.o(r,l)&&(o.m[l]=r[l]);if(i)var c=i(o)}for(t&&t(n);u<s.length;u++)a=s[u],o.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return o.O(c)},n=self["webpackChunktodolist_vue"]=self["webpackChunktodolist_vue"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=o.O(void 0,[504],(function(){return o(6596)}));n=o.O(n)})();
//# sourceMappingURL=app.1164ef0a.js.map