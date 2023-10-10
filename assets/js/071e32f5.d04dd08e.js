"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[390],{3905:(e,n,t)=>{t.d(n,{Zo:()=>u,kt:()=>f});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=r.createContext({}),c=function(e){var n=r.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},u=function(e){var n=c(e.components);return r.createElement(l.Provider,{value:n},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),p=c(t),d=a,f=p["".concat(l,".").concat(d)]||p[d]||m[d]||o;return t?r.createElement(f,s(s({ref:n},u),{},{components:t})):r.createElement(f,s({ref:n},u))}));function f(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,s=new Array(o);s[0]=d;var i={};for(var l in n)hasOwnProperty.call(n,l)&&(i[l]=n[l]);i.originalType=e,i[p]="string"==typeof e?e:a,s[1]=i;for(var c=2;c<o;c++)s[c]=t[c];return r.createElement.apply(null,s)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},7742:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>s,default:()=>m,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var r=t(7462),a=(t(7294),t(3905));const o={sidebar_position:1},s="Introduction",i={unversionedId:"forms/introduction",id:"forms/introduction",title:"Introduction",description:"",source:"@site/docs/forms/introduction.md",sourceDirName:"forms",slug:"/forms/introduction",permalink:"/react-utils/docs/forms/introduction",draft:!1,editUrl:"https://github.com/ESMO-ENTERPRISE/react-utils/tree/main/docs/forms/introduction.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Forms",permalink:"/react-utils/docs/category/forms"},next:{title:"Validation",permalink:"/react-utils/docs/forms/validations"}},l={},c=[],u={toc:c},p="wrapper";function m(e){let{components:n,...t}=e;return(0,a.kt)(p,(0,r.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"introduction"},"Introduction"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},'type FormInputs = {\n  name: string,\n  password: string,\n};\n\nexport default function App() {\n  const { inputs, handleSubmit, errors, handleChange } = useForm({\n    defaultValues: { name: "", password: "" },\n    validation: {\n      name: {\n        required: true,\n      },\n      password: {\n        hasMoreThan6Chars: (val) =>\n          val.length >= 6 || "Please enter 6 or more characters",\n        hasCapsChars: (val) =>\n          /[A-Z]/.test(val) || "Please enter at least one capital letter",\n        hasLowercaseChars: (val) =>\n          /[a-z]/.test(val) || "Please enter at least one lowercase letter",\n        hasNumChars: (val) =>\n          /[0-9]/.test(val) || "Please enter at least one number",\n        hasSpecialChars: (val) =>\n          /[!@#$%^&*()_+\\-=[\\]{};\':"\\\\|,.<>/?]/.test(val) ||\n          "Please enter at least one special character",\n      },\n    },\n  });\n  const onSubmit = (data: FormInputs) => console.log(data);\n\n  return (\n    <form onSubmit={handleSubmit(onSubmit)}>\n      <input\n        defaultValue="test"\n        value={inputs.name}\n        name="name"\n        onChange={handleChange}\n      />\n      {errors.name && <span>{errors.name}</span>}\n    \n      <input value={inputs.password} name="password" onChange={handleChange} />\n      {errors.password && <span>{errors.password}</span>}\n\n      <input type="submit" />\n    </form>\n  );\n}\n')))}m.isMDXComponent=!0}}]);