(function(e){function n(n){for(var o,a,r=n[0],i=n[1],u=n[2],l=0,d=[];l<r.length;l++)a=r[l],s[a]&&d.push(s[a][0]),s[a]=0;for(o in i)Object.prototype.hasOwnProperty.call(i,o)&&(e[o]=i[o]);f&&f(n);while(d.length)d.shift()();return c.push.apply(c,u||[]),t()}function t(){for(var e,n=0;n<c.length;n++){for(var t=c[n],o=!0,a=1;a<t.length;a++){var r=t[a];0!==s[r]&&(o=!1)}o&&(c.splice(n--,1),e=i(i.s=t[0]))}return e}var o={},a={app:0},s={app:0},c=[];function r(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-d3cba04e":"7b3384a7","chunk-0a354926":"c65af1b4","chunk-10b1a320":"a8d1adbb","chunk-1d68ff0e":"5dc6d403","chunk-495f1631":"aae88bda","chunk-4e23879c":"f109ab75","chunk-51ec8c0f":"4fe45890","chunk-5bec5dae":"458eeef3","chunk-90abc680":"e0e5a58f","chunk-9d733928":"1df2428a","chunk-75676346":"aedc2940","chunk-85d51672":"af07b8ef","chunk-a5a908a2":"38686c41","chunk-b6cb00b8":"3de1be5d","chunk-d6e0eef8":"6e78d5ad"}[e]+".js"}function i(n){if(o[n])return o[n].exports;var t=o[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.e=function(e){var n=[],t={"chunk-0a354926":1,"chunk-10b1a320":1,"chunk-1d68ff0e":1,"chunk-495f1631":1,"chunk-4e23879c":1,"chunk-51ec8c0f":1,"chunk-5bec5dae":1,"chunk-90abc680":1,"chunk-75676346":1,"chunk-85d51672":1,"chunk-a5a908a2":1,"chunk-b6cb00b8":1,"chunk-d6e0eef8":1};a[e]?n.push(a[e]):0!==a[e]&&t[e]&&n.push(a[e]=new Promise(function(n,t){for(var o="css/"+({}[e]||e)+"."+{"chunk-d3cba04e":"31d6cfe0","chunk-0a354926":"51a66565","chunk-10b1a320":"df2ec11b","chunk-1d68ff0e":"c9c0e517","chunk-495f1631":"4892653a","chunk-4e23879c":"8afcf836","chunk-51ec8c0f":"441e0478","chunk-5bec5dae":"ed7defc7","chunk-90abc680":"98c11b66","chunk-9d733928":"31d6cfe0","chunk-75676346":"347a4bdd","chunk-85d51672":"eb944859","chunk-a5a908a2":"73969a70","chunk-b6cb00b8":"b0f0b4dc","chunk-d6e0eef8":"332de4d9"}[e]+".css",s=i.p+o,c=document.getElementsByTagName("link"),r=0;r<c.length;r++){var u=c[r],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===o||l===s))return n()}var d=document.getElementsByTagName("style");for(r=0;r<d.length;r++){u=d[r],l=u.getAttribute("data-href");if(l===o||l===s)return n()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=n,f.onerror=function(n){var o=n&&n.target&&n.target.src||s,c=new Error("Loading CSS chunk "+e+" failed.\n("+o+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=o,delete a[e],f.parentNode.removeChild(f),t(c)},f.href=s;var h=document.getElementsByTagName("head")[0];h.appendChild(f)}).then(function(){a[e]=0}));var o=s[e];if(0!==o)if(o)n.push(o[2]);else{var c=new Promise(function(n,t){o=s[e]=[n,t]});n.push(o[2]=c);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=r(e),u=function(n){l.onerror=l.onload=null,clearTimeout(d);var t=s[e];if(0!==t){if(t){var o=n&&("load"===n.type?"missing":n.type),a=n&&n.target&&n.target.src,c=new Error("Loading chunk "+e+" failed.\n("+o+": "+a+")");c.type=o,c.request=a,t[1](c)}s[e]=void 0}};var d=setTimeout(function(){u({type:"timeout",target:l})},12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(n)},i.m=e,i.c=o,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)i.d(t,o,function(n){return e[n]}.bind(null,o));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="/dist/",i.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=n,u=u.slice();for(var d=0;d<u.length;d++)n(u[d]);var f=l;c.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"0979":function(e,n,t){},"0a3d":function(e,n,t){"use strict";var o=t("ada8"),a=t.n(o);a.a},"1ae4":function(e,n,t){e.exports=t.p+"img/logo.ef0bcec3.svg"},"1d2a":function(e,n,t){},"56d7":function(e,n,t){"use strict";t.r(n);t("7f7f"),t("14c6"),t("08c1"),t("4842"),t("d9fc3");var o=t("8bbf"),a=t.n(o),s=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"app",attrs:{id:"app"}},[t("HeaderBar"),t("router-view"),t("BottomBar")],1)},c=[],r=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"header"},[t("div",{staticClass:"w1200"},[t("div",{staticClass:"header_logo fl"},[t("img",{staticClass:"logo click",attrs:{src:e.logoSvg},on:{click:e.toHome}})]),t("div",{staticClass:"menu fl"},[t("MenuBar")],1),t("div",{staticClass:"header_language fl"},["home"!==e.navActive&&"/"!==e.navActive?t("div",{staticClass:"top-search fl"},[e.topLong?e._e():t("div",{staticClass:"top_height fl"},[t("i",{staticClass:"iconfont icon-block fCN font20"}),t("label",{staticClass:"number-grow-warp"},[t("span",[e._v(e._s(e.count.height))])])]),t("el-input",{staticClass:"fr",attrs:{placeholder:e.$t("public.searchTip")},on:{focus:e.focusSearch,blur:e.blurSearch},nativeOn:{keyup:function(n){return"button"in n||!e._k(n.keyCode,"enter",13,n.key,"Enter")?e.clickSearch(n):null}},model:{value:e.searchValue,callback:function(n){e.searchValue=n},expression:"searchValue"}},[t("i",{staticClass:"el-icon-search el-input__icon click",attrs:{slot:"suffix"},on:{click:e.clickSearch},slot:"suffix"})])],1):e._e(),t("div",{staticClass:"language font14 fr",on:{click:function(n){e.selectLanguage(e.lang,!0)}}},[e._v(e._s("en"===e.lang?"简体中文":"English"))])]),t("div",{staticClass:"mobile_ico fr"},[t("i",{staticClass:"el-icon-menu",on:{click:function(n){e.showMobile=!e.showMobile}}})])]),t("el-collapse-transition",[t("div",{directives:[{name:"show",rawName:"v-show",value:e.showMobile,expression:"showMobile"}],staticClass:"mobile_header fr",on:{click:e.hideMobileMenu}},[t("div",{staticClass:"mobile_menu"},[t("MenuBar"),t("div",{staticClass:"cb"}),t("div",{staticClass:"language font14 fr",on:{click:function(n){e.selectLanguage(e.lang,!0)}}},[e._v(e._s("en"===e.lang?"简体中文":"English"))])],1)])]),t("div",{staticClass:"cb"})],1)},i=[],u=!1,l=!1,d=u?"http://192.168.1.192:18003/":"https://api.nuls.io/",f=u?"9000":"8000",h=t("1ae4"),m=t.n(h),p=t("a9ef"),b=t.n(p),k=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"nav"},[t("el-menu",{attrs:{"default-active":e.activedMenu(e.$route.path),mode:"horizontal","active-text-color":"#7db46d"},on:{select:e.handleSelect}},[t("el-menu-item",{staticClass:"font18 fw capitalize",attrs:{index:"home"}},[e._v(e._s(e.$t("nav.home")))]),t("el-menu-item",{staticClass:"font18 fw capitalize",attrs:{index:"block"}},[e._v(e._s(e.$t("nav.block")))]),t("el-menu-item",{staticClass:"font18 fw capitalize",attrs:{index:"address"}},[e._v(e._s(e.$t("nav.address")))]),t("el-menu-item",{staticClass:"font18 fw capitalize",attrs:{index:"transaction"}},[e._v(e._s(e.$t("nav.transaction")))]),t("el-menu-item",{staticClass:"font18 fw capitalize",attrs:{index:"consensus"}},[e._v(e._s(e.$t("nav.consensus")))]),t("el-menu-item",{staticClass:"font18 fw capitalize",attrs:{index:"contracts"}},[e._v(e._s(e.$t("nav.contracts")))])],1)],1)},g=[],I={data:function(){return{}},components:{},created:function(){},mounted:function(){if("/accountInfo"===this.$route.path){var e=this.$route.query.address;this.$router.push({name:"addressInfo",query:{address:e}})}},methods:{handleSelect:function(e){this.navActive=e,sessionStorage.setItem("navActive",e),this.$router.push({name:e})},activedMenu:function(e){return 0===e.indexOf("/block")?"block":0===e.indexOf("/address")?"address":0===e.indexOf("/transaction")?"transaction":0===e.indexOf("/consensus")||0===e.indexOf("/rotation")?"consensus":0===e.indexOf("/contracts")||0===e.indexOf("/token")?"contracts":"home"}},watch:{}},v=I,y=(t("a1e5"),t("2877")),C=Object(y["a"])(v,k,g,!1,null,null,null),w=C.exports,T={data:function(){return{logoSvg:l?m.a:b.a,navActive:sessionStorage.hasOwnProperty("navActive")?sessionStorage.getItem("navActive"):"home",count:{height:this.$store.state.height},searchValue:"",topLong:!1,lang:"en",showMobile:!1}},components:{MenuBar:w},created:function(){var e=navigator.language||navigator.userLanguage;sessionStorage.hasOwnProperty("lang")?this.lang=sessionStorage.getItem("lang"):"zh"===e.substr(0,2)?this.lang="cn":this.lang="en"},mounted:function(){var e=this;this.selectLanguage(this.lang,!1),setInterval(function(){e.count.height=e.$store.state.height,e.navActive=e.$route.path},100)},methods:{focusSearch:function(){this.topLong=!0},blurSearch:function(){this.topLong=!1},clickSearch:function(){var e=this;this.$post("/","search",[this.searchValue]).then(function(n){n.hasOwnProperty("result")?"block"===n.result.type?e.$router.push({name:"blockInfo",query:{height:n.result.data.txList[0].height}}):"tx"===n.result.type?e.$router.push({name:"transactionInfo",query:{hash:n.result.data.hash}}):"account"===n.result.type?e.$router.push({name:"addressInfo",query:{address:n.result.data.address}}):"contract"===n.result.type?e.$router.push({name:"contractsInfo",query:{contractAddress:n.result.data.contractAddress,tabName:"first"}}):e.$message({message:e.$t("codeInfo.codeInfo12"),type:"error",duration:1e3}):e.$message({message:e.$t("codeInfo.codeInfo12"),type:"error",duration:1e3}),e.searchValue=""}).catch(function(e){console.log(e)})},hideMobileMenu:function(){this.showMobile=!1},selectLanguage:function(e,n){n&&(this.lang="en"===this.lang?"cn":"en"),sessionStorage.setItem("lang",this.lang),this.$i18n.locale=this.lang},toHome:function(){this.navActive="home",sessionStorage.setItem("navActive","home"),this.$router.push({name:"home"})}},watch:{}},S=T,_=(t("0a3d"),Object(y["a"])(S,r,i,!1,null,null,null)),N=_.exports,P=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"bottom bg-gray"},[t("ul",{staticClass:"b_ul w1200"},[t("li",{staticClass:"b_li font14 fl capitalize"},[t("a",{attrs:{href:"https://nuls.io/home",target:"_blank"}},[e._v(e._s(e.$t("bottom.website")))])]),e._m(0),t("li",{staticClass:"b_li font14 fl capitalize"},[t("a",{attrs:{href:"https://wallet.nuls.io/",target:"_blank"}},[e._v(e._s(e.$t("bottom.webWallet")))])]),t("li",{staticClass:"b_li font14 fl capitalize"},[t("a",{attrs:{href:"https://nuls.community/",target:"_blank"}},[e._v(e._s(e.$t("bottom.community")))])]),t("li",{staticClass:"b_li font14 fl capitalize click",on:{click:e.toBugReport}},[e._v(e._s(e.$t("bottom.about")))]),t("li",{staticClass:"b_li font14 fr"},[e._v("Copyright @2019 NULS")])])])},L=[function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("li",{staticClass:"b_li font14 fl"},[t("a",{attrs:{href:"https://github.com/nuls-io",target:"_blank"}},[e._v("Github")])])}],A={created:function(){var e=this;this.getBestBlockHeader(),this.getNodeNumber(),this.getNULSNumber(),setInterval(function(){e.getBestBlockHeader(),e.getNodeNumber(),e.getNULSNumber()},1e4)},methods:{getBestBlockHeader:function(){var e=this;this.$post("/","getBestBlockHeader",[]).then(function(n){n.hasOwnProperty("result")&&e.$store.commit("SET_HEIGHT",n.result.height)})},getNodeNumber:function(){var e=this;this.$post("/","getConsensusNodeCount",[]).then(function(n){n.hasOwnProperty("result")&&e.$store.commit("SET_NODENUMBER",n.result)})},getNULSNumber:function(){var e=this;this.$post("/","getCoinInfo",[]).then(function(n){n.hasOwnProperty("result")&&e.$store.commit("SET_NULSNUMBER",n.result)})},toBugReport:function(){l?window.open("https://nuls.community/d/135-collect-the-bugs-of-the-mainnet-bugs","_blank"):window.open("https://nuls.community/d/134-collect-the-bugs-of-the-testnet-bugs/2","_blank")}}},x=A,$=(t("93f7"),Object(y["a"])(x,P,L,!1,null,null,null)),R=$.exports,B=t("bc3a"),O=t.n(B),M={components:{HeaderBar:N,BottomBar:R},created:function(){sessionStorage.hasOwnProperty("chainId")||this.getChains()},methods:{getChains:function(){var e={jsonrpc:"2.0",method:"getChainInfo",params:[],id:5898};O.a.post(d,e).then(function(e){e.hasOwnProperty("result")?sessionStorage.setItem("chainId",e.result.chainId):sessionStorage.setItem("chainId","2")}).catch(function(e){console.log(e),sessionStorage.setItem("chainId","2")})}}},E=M,U=(t("7c55"),Object(y["a"])(E,s,c,!1,null,null,null)),D=U.exports,H=t("2f62");a.a.use(H["a"]);var j=new H["a"].Store({state:{height:0,nodeNumber:[],NULSNumber:[]},mutations:{SET_HEIGHT:function(e,n){e.height=n,sessionStorage.setItem("height",n.height)},SET_NODENUMBER:function(e,n){e.nodeNumber=n},SET_NULSNUMBER:function(e,n){e.NULSNumber=n}},getters:{height:function(e){return e.height||(e.height=parseInt(sessionStorage.getItem("height"))),e.height},nodeNumber:function(e){return e.nodeNumber},NULSNumber:function(e){return e.NULSNumber}},actions:{}}),z=t("6389"),q=t.n(z);a.a.use(q.a);var V=new q.a({mode:"history",routes:[{path:"/",name:"home",component:function(e){return Promise.all([t.e("chunk-d3cba04e"),t.e("chunk-0a354926")]).then(function(){var n=[t("bb51")];e.apply(null,n)}.bind(this)).catch(t.oe)}},{path:"/block",name:"block",component:function(e){return Promise.all([t.e("chunk-d3cba04e"),t.e("chunk-90abc680")]).then(function(){var n=[t("75b4")];e.apply(null,n)}.bind(this)).catch(t.oe)}},{path:"/block/info",name:"blockInfo",component:function(e){return Promise.all([t.e("chunk-d3cba04e"),t.e("chunk-9d733928"),t.e("chunk-85d51672")]).then(function(){var n=[t("c9a5")];e.apply(null,n)}.bind(this)).catch(t.oe)}},{path:"/address/info",name:"addressInfo",component:function(e){return Promise.all([t.e("chunk-d3cba04e"),t.e("chunk-4e23879c")]).then(function(){var n=[t("897e")];e.apply(null,n)}.bind(this)).catch(t.oe)}},{path:"/addressInfo",name:"accountInfo",component:function(e){return Promise.all([t.e("chunk-d3cba04e"),t.e("chunk-4e23879c")]).then(function(){var n=[t("897e")];e.apply(null,n)}.bind(this)).catch(t.oe)}},{path:"/address",name:"address",component:function(e){return Promise.all([t.e("chunk-d3cba04e"),t.e("chunk-10b1a320")]).then(function(){var n=[t("d316")];e.apply(null,n)}.bind(this)).catch(t.oe)}},{path:"/transaction",name:"transaction",component:function(e){return Promise.all([t.e("chunk-d3cba04e"),t.e("chunk-5bec5dae")]).then(function(){var n=[t("aa55")];e.apply(null,n)}.bind(this)).catch(t.oe)}},{path:"/transaction/info",name:"transactionInfo",component:function(e){return Promise.all([t.e("chunk-d3cba04e"),t.e("chunk-9d733928"),t.e("chunk-75676346")]).then(function(){var n=[t("da4b")];e.apply(null,n)}.bind(this)).catch(t.oe)}},{path:"/transactionHash",name:"transactionHash",component:function(e){return Promise.all([t.e("chunk-d3cba04e"),t.e("chunk-9d733928"),t.e("chunk-75676346")]).then(function(){var n=[t("da4b")];e.apply(null,n)}.bind(this)).catch(t.oe)}},{path:"/consensus",name:"consensus",component:function(e){return Promise.all([t.e("chunk-d3cba04e"),t.e("chunk-9d733928"),t.e("chunk-b6cb00b8")]).then(function(){var n=[t("c5cc")];e.apply(null,n)}.bind(this)).catch(t.oe)}},{path:"/consensus/info",name:"consensusInfo",component:function(e){return Promise.all([t.e("chunk-d3cba04e"),t.e("chunk-51ec8c0f")]).then(function(){var n=[t("a475")];e.apply(null,n)}.bind(this)).catch(t.oe)}},{path:"/rotation/info",name:"rotationInfo",component:function(e){return Promise.all([t.e("chunk-d3cba04e"),t.e("chunk-495f1631")]).then(function(){var n=[t("1b7c")];e.apply(null,n)}.bind(this)).catch(t.oe)}},{path:"/contracts",name:"contracts",component:function(e){return Promise.all([t.e("chunk-d3cba04e"),t.e("chunk-1d68ff0e")]).then(function(){var n=[t("c36e")];e.apply(null,n)}.bind(this)).catch(t.oe)}},{path:"/contracts/info",name:"contractsInfo",component:function(e){return Promise.all([t.e("chunk-d3cba04e"),t.e("chunk-9d733928"),t.e("chunk-d6e0eef8")]).then(function(){var n=[t("d372")];e.apply(null,n)}.bind(this)).catch(t.oe)}},{path:"/token/info",name:"tokenInfo",component:function(e){return Promise.all([t.e("chunk-d3cba04e"),t.e("chunk-9d733928"),t.e("chunk-a5a908a2")]).then(function(){var n=[t("a600")];e.apply(null,n)}.bind(this)).catch(t.oe)}}]}),G=t("5c96");t("0fae");a.a.component(G["Menu"].name,G["Menu"]),a.a.component(G["MenuItem"].name,G["MenuItem"]),a.a.component(G["Input"].name,G["Input"]),a.a.component(G["Button"].name,G["Button"]),a.a.component(G["Tooltip"].name,G["Tooltip"]),a.a.component(G["Radio"].name,G["Radio"]),a.a.component(G["RadioGroup"].name,G["RadioGroup"]),a.a.component(G["Form"].name,G["Form"]),a.a.component(G["FormItem"].name,G["FormItem"]),a.a.component(G["Select"].name,G["Select"]),a.a.component(G["Option"].name,G["Option"]),a.a.component(G["Dialog"].name,G["Dialog"]),a.a.component(G["Switch"].name,G["Switch"]),a.a.component(G["Table"].name,G["Table"]),a.a.component(G["TableColumn"].name,G["TableColumn"]),a.a.use(G["Loading"].directive),a.a.prototype.$loading=G["Loading"].service,a.a.prototype.$message=G["Message"],a.a.component(G["Pagination"].name,G["Pagination"]),a.a.component(G["Tabs"].name,G["Tabs"]),a.a.component(G["TabPane"].name,G["TabPane"]),a.a.component(G["Row"].name,G["Row"]),a.a.component(G["Col"].name,G["Col"]),a.a.component(G["Tree"].name,G["Tree"]),a.a.component(G["CollapseTransition"].name,G["CollapseTransition"]);var F=t("4897"),W=t.n(F),J=t("a925"),Y=t("cebc"),K=t("b2d6"),Q=t.n(K),X=Object(Y["a"])({nav:{home:"Home",block:"Block",address:"Account",transaction:"Transaction",consensus:"Consensus",contracts:"Contracts"},public:{apr:"APR",txs:"TXS",stake:"Stake",entrust:"Stake",proportion:"Commission",creditValue:"Credit",allEntrust:"Total stake",bond:"Deposit",participants:"Participants",basicInfo:"Basic info",copySuccess:"Copied to clipboard",copyError:"Failed to copy to clipboard",developedTips:"More features are being developed...",txList:"Transaction history",transactionList:"Transaction list",tokenTrading:"Token transaction",address:"Account",locking:"locking",timeLocking:"Time locking",consensusLocking:"Locking",usablebalance:"Usable",usable:"Usable",balance:"Balance",total:"Total",alias:"Alias",block:"Block",seedNode:"Seed nodes",outNode:"Packing nodes",height:"Height",time:"Date",transactionNo:"Transaction amount",blockReward:"Block reward",consensusReward:"Consensus reward",size:"Bytes",createAddress:"Agent address",packAddress:"Packing address",outAddress:"Reward address",contractAddress:"Contract address",addressType:"Account type",round:"Round",number:"Number",fee:"Fee",type:"Type",amount:"Amount",serial:"Number",sender:"Sender",recipient:"Receiver",passCard:"Token",abbreviate:"Abbreviate",week:"Week",month:"Month",year:"Year",yellowCard:"Yellow card",redCard:"Red card",lostRate:"Lost rate",day:"Day",hour:"Hour",minute:"Minute",createTime:"Create time",reason:"Reason",join:"Join",quit:"Quit",remarks:"Remarks",status:"Status",input:"Input",output:"Output",searchTip:"address/height/txhash/...",copy:"Click copy",copysuccess:"Copy success"},type:{undefined:"",0:"All",1:"Consensus reward",2:"Transfer",3:"Aliased",4:"Register node",5:"Stake",51:"Change",6:"Cancel consensus",7:"Yellow card",8:"Red card",9:"Unregister node",10:"General Data",15:"Create contract",16:"Call contract",17:"Del contract",18:"Contract transfer",19:"Contract back"},addressType:{undefined:"",1:"General Account",2:"Contract account",3:"Multi account"},nodeType:{undefined:"",0:"General",1:"Credit",2:"Commission",3:"Staked amount",4:"Deposit"},history:{0:"All history",1:"Int history",2:"Out history"},nodeStatus:{undefined:"",0:"All nodes",1:"General nodes",2:"Developer nodes",3:"Ambassador nodes"},contractStatus:{undefined:"","-1":"Create failure",0:"Uncertificated",1:"Certificating",2:"Certificated",3:"Deleted"},home:{home0:"Height",home1:"Consensus nodes",home2:"Total stake",home3:"Total supply",home4:"Circulating Supply",home5:"Consensus annualized reward rate",home6:"Consenseus reward calculator",home7:"14 days NULS Transaction history",home8:"More"},cale:{cale0:"Consensus reward calculator",cale1:"stake",cale3:"Daily",cale4:"Weekly",cale5:"Monthly",cale6:"Annual",cale7:"Please enter stake amount",cale8:"Stake amount ranges from 2000 to 500,000",cale9:"Stake amount should be number",cale10:"Please enter commission rate",cale11:"Commission rate ranges from 10 to 100",cale12:"Commission rate should be number",cale13:"Please enter credit",cale14:"Credit ranges from 0 to 1",cale15:"Credit should be number",cale16:"Please enter total satke",cale17:"Commission rate ranges from 20,000 to 100,000,000",cale18:"Total stake should be number",cale19:"Please enter deposit",cale20:"Deposit ranges from 20,000 to 200,000",cale21:"Deposit should be number",cale22:"Please enter stake",cale23:"Deposit ranges from 2000 to 500,000",cale24:"Deposit should be number"},block:{block0:"Blocks",block1:"Hide consensus blocks",block2:"Hide consensus blocks"},blockList:{},address:{address0:"Address list"},addressList:{addressList0:"Assets info",addressList1:"Total income",addressList2:"Total expenditure",addressList3:"Token list"},transaction:{transaction0:"Transaction history",transaction1:"Total transactions"},transactionInfo:{transactionInfo0:"Total fee",transactionInfo1:"Txsize",transactionInfo2:"Refund",transactionInfo3:"Business data",transactionInfo4:"Agent node",transactionInfo5:"Punished account",transactionInfo6:"Round",transactionInfo7:"",transactionInfo8:"Price",transactionInfo9:"Function",transactionInfo10:"Unlock time",transactionInfo11:"Token Transfers"},consensus:{consensus0:"Total stake info",consensus1:"Consensus nodes",consensus2:"Node Info",consensus3:"Round info",consensus4:"Current node",consensus5:"Current packing node",consensus6:"Packing nodes of this round ",consensus7:"Current time interval",consensus8:"Round list",consensus9:"Time interval",consensus10:"Packing nodes amount",consensus11:"Normally packing nodes",search:"Please enter an alias/address/ID"},consensusInfo:{consensusInfo0:"Continuous running time",consensusInfo1:"Total blocks",consensusInfo2:"Packing time of this round",consensusInfo3:"Node version",consensusInfo4:"Deposit reward",consensusInfo5:"Commission reward",consensusInfo6:"Total reward",consensusInfo7:"Packing reward",consensusInfo8:"Block reward",consensusInfo9:"Punishment",consensusInfo10:"Current stake info",consensusInfo11:"Stake address",consensusInfo12:"Stake time",consensusInfo13:"Stake history",consensusInfo14:"Creator reward",consensusInfo15:"The node creator reward is equal to the sum of the deposit reward and the commission received from the staking",consensusInfo16:"Staking reward"},rotationInfo:{rotationInfo0:"Round",rotationInfo1:"Only show punishment",rotationInfo2:"Round No.",rotationInfo3:"Blocks"},contracts:{contracts0:"All contracts",contracts1:"Hide NRC-20 contracts",contracts2:"NRC-20 contracts",contracts3:"Total supply",contracts:""},contractsInfo:{contractsInfo0:"Code"},codeInfo:{codeInfo0:"Contract source code is certified",codeInfo1:"Compiler",codeInfo2:"The certification date",codeInfo3:"Contract code",codeInfo4:"Contract source code isn't certified",codeInfo5:"Sorry, source code certificate failed!",codeInfo6:"Upload source code for certification",codeInfo7:"Source code upload notes",codeInfo8:"1.Please compress the source code into a zip package for uploading",codeInfo9:"2.The file directory structure and code in the zip package need to be consistent with deployment code, or it will result in certificating failure",codeInfo10:"Sorry, the maximum upload file size is 5M",codeInfo11:"Request timeout please retry",codeInfo12:"Please enter the correct Address, Txhash, Block...",codeInfo13:"3.Zip packages should not contain non-Java files, otherwise upload authentication will fail"},tokenInfo:{tokenInfo0:"Decimal",tokenInfo1:"Holders",tokenInfo2:"Token transaction",tokenInfo3:"Token list",tokenInfo4:"Rank",tokenInfo5:"Amount",tokenInfo6:"Percentage"},bottom:{website:"Official Website",webWallet:"Light wallet",community:"Community",about:"Bug Report"}},Q.a),Z=X,ee=t("f0d9"),ne=t.n(ee),te=Object(Y["a"])({nav:{home:"首页",block:"区块",address:"账户",transaction:"交易",consensus:"共识",contracts:"合约"},public:{apr:"年奖励率",txs:"交易量",stake:"全网委托量",entrust:"委托量",proportion:"佣金比例",creditValue:"信用值",allEntrust:"总委托量",bond:"保证金",participants:"参与人数",basicInfo:"基本信息",copySuccess:"已复制到剪切板",copyError:"已复制到剪切板",developedTips:"更多功能正在研发中...",txList:"交易记录",transactionList:"交易列表",tokenTrading:"通证交易",address:"地址",locking:"锁定",timeLocking:"时间锁定",consensusLocking:"锁定",usablebalance:"可用",usable:"可用",balance:"余额",total:"总计",alias:"别名",block:"块",seedNode:"种子节点",outNode:"出块节点",height:"高度",time:"时间",transactionNo:"交易数量",blockReward:"块奖励",consensusReward:"共识奖励",size:"大小",createAddress:"创建地址",packAddress:"打包地址",outAddress:"奖励地址",contractAddress:"合约地址",addressType:"地址类型",round:"轮次",number:"编号",fee:"手续费",type:"类型",amount:"金额",serial:"序号",sender:"发送者",recipient:"接收者",passCard:"通证",abbreviate:"缩写",week:"周",month:"月",year:"年",yellowCard:"黄牌",redCard:"红牌",lostRate:"丢块率",day:"天",hour:"时",minute:"分",createTime:"创建时间",reason:"原因",join:"加入",quit:"退出",remarks:"备注",status:"状态",input:"输入",output:"输出",searchTip:"地址/高度/txhash/...",copy:"点击复制",copysuccess:"复制成功"},type:{undefined:"",0:"全部交易",1:"共识奖励",2:"转账交易",3:"设置别名",4:"创建节点",5:"加入共识",51:"零钱换整",6:"退出共识",7:"黄牌惩罚",8:"红牌惩罚",9:"注销节点",10:"通用数据",15:"创建合约",16:"调用合约",17:"删除合约",18:"合约转账",19:"合约返回"},addressType:{undefined:"",1:"普通地址",2:"合约地址",3:"多签地址"},nodeType:{undefined:"",0:"综合排序",1:"信用值",2:"佣金",3:"委托量",4:"保证金"},history:{0:"所有历史",1:"加入历史",2:"退出历史"},nodeStatus:{undefined:"",0:"全部节点",1:"普通节点",2:"开发者节点",3:"大使节点"},contractStatus:{undefined:"","-1":"创建失败",0:"未认证",1:"认证中",2:"认证通过",3:"已删除"},home:{home0:"当前高度",home1:"共识节点",home2:"全网委托量",home3:"总发行量",home4:"总流通量",home5:"共识年化奖励率",home6:"共识奖励计算",home7:"14天NULS交易历史",home8:"更多"},cale:{cale0:"共识奖励计算器",cale1:"参与委托",cale3:"日奖励",cale4:"周奖励",cale5:"月奖励",cale6:"年奖励",cale7:"请输入委托量",cale8:"委托量范围为 2000 到 500000",cale9:"委托量必须为数字",cale10:"请输入节点佣金比例",cale11:"佣金比例范围为 10 到 100",cale12:"佣金比例必须为数字",cale13:"请输入节点信用值",cale14:"信用值在 0 到 1",cale15:"信用值必须为数字",cale16:"请输入全网委托量",cale17:"全网委托量范围为 200000 到 100000000",cale18:"全网委托量必须为数字",cale19:"请输入节点保证金",cale20:"保证金范围为 20000 到 200000",cale21:"保证金必须为数字",cale22:"请输入委托量",cale23:"委托量范围为 200000 到 500000",cale24:"委托量必须为数字"},block:{block0:"区块列表",block1:"隐藏共识奖励",block2:"隐藏共识奖励区块"},blockList:{},address:{address0:"地址列表"},addressList:{addressList0:"资产信息",addressList1:"总收入",addressList2:"总支出",addressList3:"通证列表"},transaction:{transaction0:"交易历史",transaction1:"交易总量"},transactionInfo:{transactionInfo0:"总费用",transactionInfo1:"交易打包",transactionInfo2:"返还",transactionInfo3:"业务数据",transactionInfo4:"委托节点",transactionInfo5:"惩罚地址",transactionInfo6:"第",transactionInfo7:"轮",transactionInfo8:"价格",transactionInfo9:"方法",transactionInfo10:"解锁时间",transactionInfo11:"代币转账"},consensus:{consensus0:"全网委托信息",consensus1:"共识中节点",consensus2:"节点信息",consensus3:"轮次信息",consensus4:"当前轮次",consensus5:"当前出块节点",consensus6:"本轮出块节点数",consensus7:"本轮时间区间",consensus8:"共识轮次列表",consensus9:"时间区间",consensus10:"出块节点数",consensus11:"正常出块节点数",search:"请输入别名/地址/ID"},consensusInfo:{consensusInfo0:"持续运行时间",consensusInfo1:"总出块数",consensusInfo2:"本轮出块时间",consensusInfo3:"节点版本",consensusInfo4:"保证金奖励",consensusInfo5:"佣金奖励",consensusInfo6:"总奖励",consensusInfo7:"出块列表",consensusInfo8:"块收益",consensusInfo9:"红黄牌",consensusInfo10:"当前委托信息",consensusInfo11:"委托地址",consensusInfo12:"委托时间",consensusInfo13:"历史委托信息",consensusInfo14:"创建者奖励",consensusInfo15:"节点创建者奖励等于保证金奖励和收取委托人佣金的总和",consensusInfo16:"委托者总奖励"},rotationInfo:{rotationInfo0:"轮",rotationInfo1:"只显示红黄牌",rotationInfo2:"本轮编号",rotationInfo3:"区块列表"},contracts:{contracts0:"所有合约",contracts1:"隐藏NRC-20合约",contracts2:"NRC-20 合约",contracts3:"总发行量",contracts:""},contractsInfo:{contractsInfo0:"代码"},codeInfo:{codeInfo0:"合约源代码已认证",codeInfo1:"编译器",codeInfo2:"认证时间",codeInfo3:"合约代码",codeInfo4:"合约源代码未认证",codeInfo5:"对不起，源代码认证失败!",codeInfo6:"上传源码进行认证",codeInfo7:"源码上传注意事项",codeInfo8:"1.请将源码压缩为一个zip包再进行上传",codeInfo9:"2.压缩包中的文件目录结构和代码需和部署时保持已一致，否则将导致认证不通过",codeInfo10:"对不起，上传的文件不超过5M",codeInfo11:"请求超时请重试",codeInfo12:"请输入正确的Address、Txhash、Block",codeInfo13:"3.zip包中不可包含非Java文件，否则将导致上传认证失败"},tokenInfo:{tokenInfo0:"精度",tokenInfo1:"持有地址数",tokenInfo2:"通证交易",tokenInfo3:"持有地址",tokenInfo4:"排名",tokenInfo5:"数量",tokenInfo6:"百分比"},bottom:{website:"官网",webWallet:"网页钱包",community:"社区",about:"问题反馈"}},ne.a),oe=te,ae={en:Z,cn:oe};a.a.use(J["a"]);var se=new J["a"]({locale:localStorage.lang||"cn",messages:ae});W.a.i18n(function(e,n){return se.t(e,n)});var ce=se;t("c5f6");function re(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return new Promise(function(o,a){t.unshift(Number(sessionStorage.getItem("chainId")));var s={jsonrpc:"2.0",method:n,params:t,id:5898};O.a.post(e,s).then(function(e){o(e.data)},function(e){a(e)})})}O.a.defaults.timeout=f,O.a.defaults.baseURL=d,O.a.defaults.headers.post["Content-Type"]="application/json";var ie=t("c3da"),ue=t.n(ie),le=t("40ea"),de=t.n(le);t("aabe");a.a.component(ue.a.name,ue.a),a.a.component(de.a.name,de.a),a.a.config.productionTip=!1,a.a.prototype.$post=re,new a.a({store:j,router:V,i18n:ce,render:function(e){return e(D)}}).$mount("#app")},"5c48":function(e,n,t){},6389:function(e,n){e.exports=VueRouter},"7c55":function(e,n,t){"use strict";var o=t("5c48"),a=t.n(o);a.a},"8bbf":function(e,n){e.exports=Vue},"93f7":function(e,n,t){"use strict";var o=t("1d2a"),a=t.n(o);a.a},a1e5:function(e,n,t){"use strict";var o=t("0979"),a=t.n(o);a.a},a9ef:function(e,n,t){e.exports=t.p+"img/logo-test-black.d60fbd9d.svg"},ada8:function(e,n,t){},c32d:function(e,n){e.exports=moment}});