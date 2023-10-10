"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[2785],{3905:(t,e,n)=>{n.d(e,{Zo:()=>l,kt:()=>f});var r=n(7294);function o(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function i(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function a(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach((function(e){o(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function u(t,e){if(null==t)return{};var n,r,o=function(t,e){if(null==t)return{};var n,r,o={},i=Object.keys(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||(o[n]=t[n]);return o}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(o[n]=t[n])}return o}var c=r.createContext({}),s=function(t){var e=r.useContext(c),n=e;return t&&(n="function"==typeof t?t(e):a(a({},e),t)),n},l=function(t){var e=s(t.components);return r.createElement(c.Provider,{value:e},t.children)},d="mdxType",p={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},m=r.forwardRef((function(t,e){var n=t.components,o=t.mdxType,i=t.originalType,c=t.parentName,l=u(t,["components","mdxType","originalType","parentName"]),d=s(n),m=o,f=d["".concat(c,".").concat(m)]||d[m]||p[m]||i;return n?r.createElement(f,a(a({ref:e},l),{},{components:n})):r.createElement(f,a({ref:e},l))}));function f(t,e){var n=arguments,o=e&&e.mdxType;if("string"==typeof t||o){var i=n.length,a=new Array(i);a[0]=m;var u={};for(var c in e)hasOwnProperty.call(e,c)&&(u[c]=e[c]);u.originalType=t,u[d]="string"==typeof t?t:o,a[1]=u;for(var s=2;s<i;s++)a[s]=n[s];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},7967:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>c,contentTitle:()=>a,default:()=>p,frontMatter:()=>i,metadata:()=>u,toc:()=>s});var r=n(7462),o=(n(7294),n(3905));const i={sidebar_position:2},a="Invalidation From Mutation",u={unversionedId:"mutation/invalidation-from-mutation",id:"mutation/invalidation-from-mutation",title:"Invalidation From Mutation",description:"",source:"@site/docs/mutation/invalidation-from-mutation.md",sourceDirName:"mutation",slug:"/mutation/invalidation-from-mutation",permalink:"/react-utils/docs/mutation/invalidation-from-mutation",draft:!1,editUrl:"https://github.com/ESMO-ENTERPRISE/react-utils/tree/main/docs/mutation/invalidation-from-mutation.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Introduction",permalink:"/react-utils/docs/mutation/introduction"},next:{title:"Update From Mutation Response",permalink:"/react-utils/docs/mutation/update-from-mutation"}},c={},s=[],l={toc:s},d="wrapper";function p(t){let{components:e,...n}=t;return(0,o.kt)(d,(0,r.Z)({},l,n,{components:e,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"invalidation-from-mutation"},"Invalidation From Mutation"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"{16-17}","{16-17}":!0},"const useEditProductMutation = createMutation(editProduct);\n\nfunction SaveProduct() {\n  const { mutate, isWaiting } = useEditProductMutation();\n  const { getValues } = useFormContext();\n\n  return (\n    <button\n      disabled={isWaiting}\n      onClick={() => {\n        const payload = getValues();\n        const productId = payload.id;\n\n        mutate(payload).then(({ response, error }) => {\n          if (response) {\n            useProductListInfiniteQuery.invalidate();\n            useProductDetailQuery.invalidateSpecificKey({ id: productId });\n          }\n        });\n      }}\n    >\n      Save\n    </button>\n  );\n}\n")))}p.isMDXComponent=!0}}]);