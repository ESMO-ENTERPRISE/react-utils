"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[4412],{3905:(e,n,t)=>{t.d(n,{Zo:()=>p,kt:()=>d});var r=t(7294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var l=r.createContext({}),u=function(e){var n=r.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},p=function(e){var n=u(e.components);return r.createElement(l.Provider,{value:n},e.children)},c="mdxType",f={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,i=e.mdxType,a=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),c=u(t),m=i,d=c["".concat(l,".").concat(m)]||c[m]||f[m]||a;return t?r.createElement(d,o(o({ref:n},p),{},{components:t})):r.createElement(d,o({ref:n},p))}));function d(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var a=t.length,o=new Array(a);o[0]=m;var s={};for(var l in n)hasOwnProperty.call(n,l)&&(s[l]=n[l]);s.originalType=e,s[c]="string"==typeof e?e:i,o[1]=s;for(var u=2;u<a;u++)o[u]=t[u];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},5029:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>o,default:()=>f,frontMatter:()=>a,metadata:()=>s,toc:()=>u});var r=t(7462),i=(t(7294),t(3905));const a={sidebar_position:4},o="Experimental infinite query",s={unversionedId:"state/experimental-infinite-query",id:"state/experimental-infinite-query",title:"Experimental infinite query",description:"A Hook that can be used to fetch data infinitely. Like useInfiniteQuery Hook, will not synchronize data across multiple Hooks with the same queryKey. This Hook was built on top of useInfiniteQuery. As the name implies, this Hook is just for experimenting. It's not stable yet.",source:"@site/docs/state/experimental-infinite-query.md",sourceDirName:"state",slug:"/state/experimental-infinite-query",permalink:"/react-utils/docs/state/experimental-infinite-query",draft:!1,editUrl:"https://github.com/ESMO-ENTERPRISE/react-utils/tree/main/docs/state/experimental-infinite-query.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Infinite Query",permalink:"/react-utils/docs/state/infinite-query"},next:{title:"Query Magic",permalink:"/react-utils/docs/state/query-magic"}},l={},u=[{value:"Usage",id:"usage",level:2}],p={toc:u},c="wrapper";function f(e){let{components:n,...t}=e;return(0,i.kt)(c,(0,r.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"experimental-infinite-query"},"Experimental infinite query"),(0,i.kt)("p",null,"A Hook that can be used to fetch data infinitely. Like ",(0,i.kt)("inlineCode",{parentName:"p"},"useInfiniteQuery")," Hook, will not synchronize data across multiple Hooks with the same ",(0,i.kt)("inlineCode",{parentName:"p"},"queryKey"),". This Hook was built on top of ",(0,i.kt)("inlineCode",{parentName:"p"},"useInfiniteQuery"),". As the name implies, this Hook is just for experimenting. It's not stable yet."),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"This Hook will invoke ",(0,i.kt)("inlineCode",{parentName:"p"},"fetchNextPage")," function automatically when the scroll position reaches the bottom.")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx"},"useExperimentalInfiniteScrollQuery(\n  queryKey,\n  fetcher,\n  containerRef,\n  options\n);\n")),(0,i.kt)("h2",{id:"usage"},"Usage"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx"},'const fetchUsers = ({ param }) => {\n  return fetch(`http://.../users?_limit=5&_page=${param.pageParam}`).then(\n    (res) => res.json()\n  );\n};\n\nconst options = {\n  offsetBottom: 0,\n  getNextPageParam(_lastPage, pages) {\n    if (pages.length < 5) {\n      return pages.length + 1;\n    }\n    return undefined;\n  },\n  onReset: (fetchPage) => {\n    fetchPage(1);\n  },\n};\n\nexport default function InfiniteScrollQuery() {\n  const containerRef = useRef(null);\n  const {\n    data: usersPages,\n    isFetchingNextPage,\n    isFetching,\n    reset,\n  } = useExperimentalInfiniteQuery(\n    ["users"],\n    fetchUsers,\n    containerRef,\n    options\n  );\n\n  return (\n    <div style={{ position: "relative" }}>\n      {(isFetchingNextPage || isFetching) && (\n        <p style={{ width: "100px", position: "absolute", top: 0, right: 0 }}>\n          Fetching...\n        </p>\n      )}\n      <div\n        ref={containerRef}\n        style={{\n          height: "600px",\n          overflowY: "auto",\n          padding: "10px 20px",\n          background: "rgba(0, 0, 0, 0.2)",\n          border: "2px solid red",\n        }}\n      >\n        {usersPages?.map((usersPage, i) => (\n          <Fragment key={i}>\n            {usersPage.map((user) => (\n              <div\n                key={user.id}\n                style={{\n                  minHeight: "200px",\n                  display: "flex",\n                  flexDirection: "column",\n                  alignContent: "space-around",\n                  border: "1px solid yellow",\n                  background: "rgba(255, 255, 255, 0.9)",\n                  padding: "10px 15px",\n                  marginBottom: "10px",\n                }}\n              >\n                <h2>\n                  {user.id}. {user.name}\n                </h2>\n                <p>{user.alterEgo}</p>\n              </div>\n            ))}\n          </Fragment>\n        ))}\n      </div>\n    </div>\n  );\n}\n')))}f.isMDXComponent=!0}}]);