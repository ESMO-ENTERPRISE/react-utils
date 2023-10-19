"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[3828],{3905:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>m});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),u=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},s=function(e){var t=u(e.components);return n.createElement(l.Provider,{value:t},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),d=u(r),f=a,m=d["".concat(l,".").concat(f)]||d[f]||p[f]||o;return r?n.createElement(m,i(i({ref:t},s),{},{components:r})):n.createElement(m,i({ref:t},s))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=f;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c[d]="string"==typeof e?e:a,i[1]=c;for(var u=2;u<o;u++)i[u]=r[u];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},9117:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>p,frontMatter:()=>o,metadata:()=>c,toc:()=>u});var n=r(7462),a=(r(7294),r(3905));const o={sidebar_position:4},i="Match data",c={unversionedId:"router/match-data",id:"router/match-data",title:"Match data",description:"The useRoute and useRouteMatch hooks return the following data.",source:"@site/docs/router/match-data.md",sourceDirName:"router",slug:"/router/match-data",permalink:"/react-utils/docs/router/match-data",draft:!1,editUrl:"https://github.com/ESMO-ENTERPRISE/react-utils/tree/main/docs/router/match-data.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Path parameters",permalink:"/react-utils/docs/router/path-parameter"},next:{title:"Exclusive routes",permalink:"/react-utils/docs/router/exclusive-routes"}},l={},u=[],s={toc:u},d="wrapper";function p(e){let{components:t,...r}=e;return(0,a.kt)(d,(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"match-data"},"Match data"),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"useRoute")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"useRouteMatch")," hooks return the following data."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},"type RouteMatch = {\n  /** True if the matched pattern contained path parameters. */\n  readonly isParameterized: boolean;\n  /** True if the matched pattern ended with a wildcard. */\n  readonly isPrefix: boolean;\n  /** Matched pattern, including a wildcard. */\n  readonly pattern: string;\n  /** Matched pattern, excluding a wildcard. */\n  readonly patternPrefix: string;\n  /** Matched full path, including a wildcard part. */\n  readonly path: `/${string}`;\n  /** Matched prefix path, excluding a wildcard part. */\n  readonly pathPrefix: `/${string}`;\n  /** Path parameter value map. */\n  readonly params: Readonly<Record<string, string | undefined>>;\n  /** Search (query) string including `?` prefix if non-empty. */\n  readonly search: '' | `?${string}`;\n  /** Hash string including `#` prefix if non-empty. */\n  readonly hash: '' | `#${string}`;\n  /** History state data (JSON serializable). */\n  readonly state: {} | null;\n};\n")))}p.isMDXComponent=!0}}]);