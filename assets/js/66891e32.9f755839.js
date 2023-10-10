"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[4041],{3905:(e,t,n)=>{n.d(t,{Zo:()=>l,kt:()=>d});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),u=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},l=function(e){var t=u(e.components);return r.createElement(s.Provider,{value:t},e.children)},p="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},y=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),p=u(n),y=a,d=p["".concat(s,".").concat(y)]||p[y]||f[y]||o;return n?r.createElement(d,i(i({ref:t},l),{},{components:n})):r.createElement(d,i({ref:t},l))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=y;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c[p]="string"==typeof e?e:a,i[1]=c;for(var u=2;u<o;u++)i[u]=n[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}y.displayName="MDXCreateElement"},3701:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>f,frontMatter:()=>o,metadata:()=>c,toc:()=>u});var r=n(7462),a=(n(7294),n(3905));const o={sidebar_position:8},i="React Native",c={unversionedId:"react-native",id:"react-native",title:"React Native",description:"We can use React-utils in React Native too.",source:"@site/docs/react-native.md",sourceDirName:".",slug:"/react-native",permalink:"/react-utils/docs/react-native",draft:!1,editUrl:"https://github.com/ESMO-ENTERPRISE/react-utils/tree/main/docs/react-native.md",tags:[],version:"current",sidebarPosition:8,frontMatter:{sidebar_position:8},sidebar:"tutorialSidebar",previous:{title:"Default value",permalink:"/react-utils/docs/forms/default-value"},next:{title:"API",permalink:"/react-utils/docs/api"}},s={},u=[{value:"Set Globally",id:"set-globally",level:2}],l={toc:u},p="wrapper";function f(e){let{components:t,...n}=e;return(0,a.kt)(p,(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"react-native"},"React Native"),(0,a.kt)("p",null,'We can use React-utils in React Native too.\nCurrently, the only thing needs to be handled is the focus refetching mechanism.\nIn React Native, there is no such "window" focus event.\nThrefore, we need to disable the ',(0,a.kt)("inlineCode",{parentName:"p"},"fetchOnWindowFocus"),".\nTo trigger refetch when a screen is focused, we can use ",(0,a.kt)("inlineCode",{parentName:"p"},"useFocusEffect")," hook."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx"},"import { useFocusEffect } from '@react-navigation/native';\n\nconst useProductsQuery = createQuery(getProducts, {\n  fetchOnWindowFocus: false,\n});\nconst refetchProductQuery = useProductsQuery.get().fetch;\n\nfunction Profile({ userId }) {\n  useFocusEffect(\n    refetchProductQuery\n  );\n\n  ...\n}\n")),(0,a.kt)("h2",{id:"set-globally"},"Set Globally"),(0,a.kt)("p",null,"If we want to modify the default ",(0,a.kt)("inlineCode",{parentName:"p"},"fetchOnWindowFocus")," option, we can just create our own ",(0,a.kt)("inlineCode",{parentName:"p"},"createQuery")," function like this:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx"},"import { createQuery as createQueryOriginal } from '@esmo/react-utils';\n\nexport const createQuery = (queryFn, options = {}) => {\n  return createQueryOriginal(queryFn, {\n    ...options,\n    fetchOnWindowFocus: false,\n  });\n};\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},"import {\n  CreateQueryOptions,\n  QueryState,\n  StoreKey,\n  createQuery as createQueryOriginal,\n} from '@esmo/react-utils';\n\nexport const createQuery = <\n  TKey extends StoreKey = StoreKey,\n  TResponse = any,\n  TData = TResponse,\n  TError = unknown,\n>(\n  queryFn: (key: TKey, state: QueryState<TKey, TResponse, TData, TError>) => Promise<TResponse>,\n  options: Omit<CreateQueryOptions<TKey, TResponse, TData, TError>, 'fetchOnWindowFocus'> = {},\n) => {\n  return createQueryOriginal(queryFn, {\n    ...options,\n    fetchOnWindowFocus: false,\n  });\n};\n")))}f.isMDXComponent=!0}}]);