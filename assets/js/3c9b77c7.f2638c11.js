"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[9456],{3905:(e,t,n)=>{n.d(t,{Zo:()=>l,kt:()=>m});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var u=r.createContext({}),c=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},l=function(e){var t=c(e.components);return r.createElement(u.Provider,{value:t},e.children)},p="mdxType",y={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,s=e.originalType,u=e.parentName,l=a(e,["components","mdxType","originalType","parentName"]),p=c(n),d=o,m=p["".concat(u,".").concat(d)]||p[d]||y[d]||s;return n?r.createElement(m,i(i({ref:t},l),{},{components:n})):r.createElement(m,i({ref:t},l))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var s=n.length,i=new Array(s);i[0]=d;var a={};for(var u in t)hasOwnProperty.call(t,u)&&(a[u]=t[u]);a.originalType=e,a[p]="string"==typeof e?e:o,i[1]=a;for(var c=2;c<s;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9397:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>i,default:()=>y,frontMatter:()=>s,metadata:()=>a,toc:()=>c});var r=n(7462),o=(n(7294),n(3905));const s={sidebar_position:2},i="Single Query",a={unversionedId:"query/single-query",id:"query/single-query",title:"Single Query",description:"Creating the Store/Hook",source:"@site/docs/query/single-query.md",sourceDirName:"query",slug:"/query/single-query",permalink:"/react-utils/docs/query/single-query",draft:!1,editUrl:"https://github.com/ESMO-ENTERPRISE/react-utils/tree/main/docs/query/single-query.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Introduction",permalink:"/react-utils/docs/query/introduction"},next:{title:"Single Query with Params",permalink:"/react-utils/docs/query/single-query-with-params"}},u={},c=[{value:"Creating the Store/Hook",id:"creating-the-storehook",level:2},{value:"Using Query Hook Inside a Component",id:"using-query-hook-inside-a-component",level:2},{value:"Options",id:"options",level:2},{value:"Actions",id:"actions",level:2}],l={toc:c},p="wrapper";function y(e){let{components:t,...n}=e;return(0,o.kt)(p,(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"single-query"},"Single Query"),(0,o.kt)("h2",{id:"creating-the-storehook"},"Creating the Store/Hook"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"import { createQuery } from '@esmo/react-utils';\n\nconst useGitHubQuery = createQuery(\n  async () => {\n    const res = await fetch('https://api.github.com/repos/ESMO-ENTERPRISE/react-utils');\n    const resJson = await res.json();\n    if (res.ok) return resJson;\n    throw resJson;\n  }\n);\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"import { createQuery } from '@esmo/react-utils';\n\ntype RepoDetailResponse = {\n  id: number;\n  name: string;\n  full_name: string;\n  description: string;\n  html_url: string;\n};\nconst useGitHubQuery = createQuery<undefined, RepoDetailResponse>(\n  //                               ^store key\n  async () => {\n    const res = await fetch('https://api.github.com/repos/ESMO-ENTERPRISE/react-utils');\n    const resJson = await res.json();\n    if (res.ok) return resJson;\n    throw resJson;\n  }\n);\n")),(0,o.kt)("h2",{id:"using-query-hook-inside-a-component"},"Using Query Hook Inside a Component"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"function SingleQuery() {\n  const { isLoading, data } = useGitHubQuery();\n\n  if (isLoading) return <div>Loading...</div>;\n\n  return (\n    <div>\n      <h1>{data.name}</h1>\n      <p>{data.description}</p>\n      <strong>\u2b50\ufe0f {data.stargazers_count}</strong>\n      <strong>\ud83c\udf74 {data.forks_count}</strong>\n    </div>\n  );\n}\n")),(0,o.kt)("h2",{id:"options"},"Options"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"const useGitHubQuery = createQuery(\n  async () => {\n    const res = await fetch('https://api.github.com/repos/ESMO-ENTERPRISE/react-utils');\n    const resJson = await res.json();\n    if (res.ok) return resJson;\n    throw resJson;\n  },\n  {\n    fetchOnMount: false,\n    enabled: () => !!useUserQuery.get().data?.user,\n    select: (response) => response.name,\n    staleTime: Infinity, // Never stale\n    retry: 0, // No retry\n    onSuccess: (response) => {},\n    onError: (error) => {},\n    onSettled: () => {},\n\n    // ... same as createStores options\n  },\n);\n")),(0,o.kt)("p",null,"\ud83d\udca1\nSee full options on ",(0,o.kt)("a",{parentName:"p",href:"/docs/api#createQuery"},"/docs/api#createQuery")),(0,o.kt)("h2",{id:"actions"},"Actions"),(0,o.kt)("p",null,"Normally, we don't need reactivity for the actions.\nTherefore, using ",(0,o.kt)("inlineCode",{parentName:"p"},"get")," method will be better, since it will not re-render the component when a query state changed."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx",metastring:"{2}","{2}":!0},"function Actions() {\n  const { fetch, forceFetch, reset } = useGitHubQuery.get();\n\n  // Or like this if we need reactivity:\n  // const { isLoading, data, error, fetch, forceFetch, reset } = useGitHubQuery();\n\n  return (\n    <>\n      <button onClick={fetch}>Call query if the query data is stale</button>\n      <button onClick={forceFetch}>Call query</button>\n      <button onClick={reset}>Reset query</button>\n    </>\n  );\n}\n")))}y.isMDXComponent=!0}}]);