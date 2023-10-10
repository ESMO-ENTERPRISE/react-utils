"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[4782],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var c=r.createContext({}),s=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=s(e.components);return r.createElement(c.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,c=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),p=s(n),f=i,m=p["".concat(c,".").concat(f)]||p[f]||d[f]||a;return n?r.createElement(m,l(l({ref:t},u),{},{components:n})):r.createElement(m,l({ref:t},u))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,l=new Array(a);l[0]=f;var o={};for(var c in t)hasOwnProperty.call(t,c)&&(o[c]=t[c]);o.originalType=e,o[p]="string"==typeof e?e:i,l[1]=o;for(var s=2;s<a;s++)l[s]=n[s];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},6163:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>d,frontMatter:()=>a,metadata:()=>o,toc:()=>s});var r=n(7462),i=(n(7294),n(3905));const a={sidebar_position:15},l="Auto Refetching / Polling",o={unversionedId:"query/polling",id:"query/polling",title:"Auto Refetching / Polling",description:"In many cases, data changes because of multiple devices, multiple users, or multiple tabs.",source:"@site/docs/query/polling.md",sourceDirName:"query",slug:"/query/polling",permalink:"/react-utils/docs/query/polling",draft:!1,editUrl:"https://github.com/ESMO-ENTERPRISE/react-utils/tree/main/docs/query/polling.md",tags:[],version:"current",sidebarPosition:15,frontMatter:{sidebar_position:15},sidebar:"tutorialSidebar",previous:{title:"Window Focus Refetching",permalink:"/react-utils/docs/query/windows-focus-refetching"},next:{title:"Suspense",permalink:"/react-utils/docs/query/suspense"}},c={},s=[],u={toc:s},p="wrapper";function d(e){let{components:t,...n}=e;return(0,i.kt)(p,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"auto-refetching--polling"},"Auto Refetching / Polling"),(0,i.kt)("p",null,"In many cases, data changes because of multiple devices, multiple users, or multiple tabs.\nIf we want to make sure the data on the screen is revalidated for every specific interval, we can utilize ",(0,i.kt)("inlineCode",{parentName:"p"},"refetchInterval")," option."),(0,i.kt)("p",null,"Refetching will only happened if:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"A query is enabled"),(0,i.kt)("li",{parentName:"ul"},"A query has subscriber"),(0,i.kt)("li",{parentName:"ul"},"Last data fetching is succeed",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"If last data fetching is failed, the polling interval will be disabled, and it will use ",(0,i.kt)("inlineCode",{parentName:"li"},"retry")," mechanism instead. (",(0,i.kt)("a",{parentName:"li",href:"/docs/query/error-retries"},"More information"),")")))),(0,i.kt)("p",null,"It ",(0,i.kt)("strong",{parentName:"p"},"will not")," check if:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"A window is in focus state"),(0,i.kt)("li",{parentName:"ul"},"No internet connection")),(0,i.kt)("p",null,"Therefore, to prevent API calls while the window is minimized, we can utilize ",(0,i.kt)("inlineCode",{parentName:"p"},"enabled")," option."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx"},"const useFeedQuery = createQuery(\n  fetchFeed,\n  {\n    refetchInterval: 3000, // Refetch every 3s\n    enabled: (key) => {\n      const { isSuccess } = useFeedQuery.get(key);\n      if (isSuccess && document.visibilityState === 'hidden') {\n        return false; // To prevent refetching while the window is minimized or unfocused\n      }\n      return true;\n    },\n  }\n)\n")))}d.isMDXComponent=!0}}]);