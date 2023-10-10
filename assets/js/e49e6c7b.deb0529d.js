"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[6970],{3905:(t,e,n)=>{n.d(e,{Zo:()=>s,kt:()=>f});var r=n(7294);function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function o(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function a(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?o(Object(n),!0).forEach((function(e){i(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function c(t,e){if(null==t)return{};var n,r,i=function(t,e){if(null==t)return{};var n,r,i={},o=Object.keys(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||(i[n]=t[n]);return i}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(i[n]=t[n])}return i}var u=r.createContext({}),p=function(t){var e=r.useContext(u),n=e;return t&&(n="function"==typeof t?t(e):a(a({},e),t)),n},s=function(t){var e=p(t.components);return r.createElement(u.Provider,{value:e},t.children)},l="mdxType",m={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},d=r.forwardRef((function(t,e){var n=t.components,i=t.mdxType,o=t.originalType,u=t.parentName,s=c(t,["components","mdxType","originalType","parentName"]),l=p(n),d=i,f=l["".concat(u,".").concat(d)]||l[d]||m[d]||o;return n?r.createElement(f,a(a({ref:e},s),{},{components:n})):r.createElement(f,a({ref:e},s))}));function f(t,e){var n=arguments,i=e&&e.mdxType;if("string"==typeof t||i){var o=n.length,a=new Array(o);a[0]=d;var c={};for(var u in e)hasOwnProperty.call(e,u)&&(c[u]=e[u]);c.originalType=t,c[l]="string"==typeof t?t:i,a[1]=c;for(var p=2;p<o;p++)a[p]=n[p];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},8750:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>u,contentTitle:()=>a,default:()=>m,frontMatter:()=>o,metadata:()=>c,toc:()=>p});var r=n(7462),i=(n(7294),n(3905));const o={sidebar_position:4},a="Optimistic Update",c={unversionedId:"mutation/optimistic-update",id:"mutation/optimistic-update",title:"Optimistic Update",description:"",source:"@site/docs/mutation/optimistic-update.md",sourceDirName:"mutation",slug:"/mutation/optimistic-update",permalink:"/react-utils/docs/mutation/optimistic-update",draft:!1,editUrl:"https://github.com/ESMO-ENTERPRISE/react-utils/tree/main/docs/mutation/optimistic-update.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Update From Mutation Response",permalink:"/react-utils/docs/mutation/update-from-mutation"},next:{title:"Offline Mutation",permalink:"/react-utils/docs/mutation/offline-mutation"}},u={},p=[],s={toc:p},l="wrapper";function m(t){let{components:e,...n}=t;return(0,i.kt)(l,(0,r.Z)({},s,n,{components:e,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"optimistic-update"},"Optimistic Update"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"{11-14}","{11-14}":!0},"function SaveProduct() {\n  const { mutate, isWaiting } = useEditProductMutation();\n  const { getValues } = useFormContext();\n\n  return (\n    <button\n      disabled={isWaiting}\n      onClick={() => {\n        const payload = getValues();\n\n        const { revert, invalidate } = useProductQuery.optimisticUpdate({\n          key: { id: payload.id },\n          response: payload,\n        });\n\n        mutate(payload).then(({ response, error }) => {\n          if (error) {\n            revert();\n          }\n          invalidate();\n        });\n      }}\n    >\n      Save\n    </button>\n  );\n}\n")))}m.isMDXComponent=!0}}]);