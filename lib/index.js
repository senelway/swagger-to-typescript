"use strict";
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */function __rest(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]])}return n}function __spreadArrays(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var r=Array(e),i=0;for(t=0;t<n;t++)for(var o=arguments[t],a=0,c=o.length;a<c;a++,i++)r[i]=o[a];return r}var fs=require("fs"),gitDiff=require("git-diff"),http=require("http"),index=function(e){var t=e.API,n=e.regexpMethods,r=e.modificators,i=e.filePath,o=function(e){return e.charAt(0).toUpperCase()+e.slice(1)},a=function(e){return e&&console.log(e)},c=function(e){var t=e.description;return t?"// "+t:"// NO DESCRIPTION"},f=function(e){return r.typeReplace[e]||e},u=function(e,t){if(!n.excludeDTO.test(e)&&t)return"export interface "+function(e){if(n.nameInterface.test(e)){var t=e.match(n.nameInterface);return t?t[1]:t}return e.split("[")[0]}(e)+" {"+t+"}"};http.get(t,(function(e){if(200===e.statusCode){e.setEncoding("utf8");var t="";e.on("data",(function(e){t+=e})),e.on("end",(function(){try{var e=JSON.parse(t).definitions,s=[],p=[],l=Object.keys(e).map((function(t){var i=e[t].properties,a=Object.keys(i).map((function(e){var t,a=i[e],u=(a.pagination,__rest(a,["pagination"]));return"enum"in u?(p.includes(e)||s.push((t=u,"export enum Enum"+o(e)+" {\n  "+t.enum.map((function(e){return e+" = '"+e+"', "+c(t)})).join("\n  ")+",\n}")),p.push(e),function(e){return"\n  "+e+": Enum"+o(e)+";\n"}(e)):function(e,t){var i,o=function(n){return"\n  "+e+": "+(r.interfaceReplace[n]||n)+"; "+c(t)+"\n"};return"array"===t.type?t.items.$ref?o(i=t.items.$ref.match(n.matchInterfaceName)[1]+"[]"):o(f(t.items.type)+"[]"):o("$ref"in t?(i=t.$ref.match(n.matchInterfaceName))?i[1]:i:f(t.type))}(e,u)})).join("");return u(t,a)})),m=__spreadArrays(s,l).join("\n").replace(n.replaceSpace,"");m&&fs.readFile(i,"utf8",(function(e,t){t&&console.log(gitDiff(t,m,{color:!0,wordDiff:!0,noHeaders:!0})||"no changes"),fs.writeFile(i,m,a)}))}catch(e){console.error(e.message)}}))}}))};module.exports=index;
//# sourceMappingURL=index.js.map
