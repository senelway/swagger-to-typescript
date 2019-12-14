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
***************************************************************************** */function __rest(e,n){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&n.indexOf(r)<0&&(t[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(r=Object.getOwnPropertySymbols(e);i<r.length;i++)n.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(t[r[i]]=e[r[i]])}return t}function __spreadArrays(){for(var e=0,n=0,t=arguments.length;n<t;n++)e+=arguments[n].length;var r=Array(e),i=0;for(n=0;n<t;n++)for(var o=arguments[n],a=0,c=o.length;a<c;a++,i++)r[i]=o[a];return r}var fs=require("fs"),gitDiff=require("git-diff"),http=require("http"),index=function(e){var n=e.API,t=e.regexpMethods,r=e.modificators,i=e.filePath,o=function(e){return e.charAt(0).toUpperCase()+e.slice(1)},a=function(e){return e&&console.log(e)},c=function(e){var n=e.description;return n?"// "+n:"// NO DESCRIPTION"},f=function(e){return r.typeReplace[e]||e},u=function(e,n){if(!t.excludeDTO.test(e)&&n)return"export interface "+function(e){if(t.nameInterface.test(e)&&t.nameInterface){var n=e.match(t.nameInterface);return n?n[1]:n}return e.split("[")[0]}(e)+" {"+n+"}"};http.get(n,(function(e){if(200===e.statusCode){e.setEncoding("utf8");var n="";e.on("data",(function(e){n+=e})),e.on("end",(function(){try{var e=JSON.parse(n).definitions,s=[],p=[],l=Object.keys(e).map((function(n){var i=e[n].properties,a=Object.keys(i).map((function(e){var n,a=i[e],u=(a.pagination,__rest(a,["pagination"]));return"enum"in u?(p.includes(e)||s.push((n=u,"export enum Enum"+o(e)+" {\n  "+n.enum.map((function(e){return e+" = '"+e+"', "+c(n)})).join("\n  ")+",\n}")),p.push(e),function(e){return"\n  "+e+": Enum"+o(e)+";\n"}(e)):function(e,n){var i,o=function(t){return"\n  "+e+": "+(r.interfaceReplace[t]||t)+"; "+c(n)+"\n"};return"array"===n.type?n.items.$ref?o(i=n.items.$ref.match(t.matchInterfaceName)[1]+"[]"):o(f(n.items.type)+"[]"):o("$ref"in n?(i=n.$ref.match(t.matchInterfaceName))?i[1]:i:f(n.type))}(e,u)})).join("");return u(n,a)})),m=__spreadArrays(s,l).join("\n").replace(t.replaceSpace,"");m&&fs.readFile(i,"utf8",(function(e,n){n&&console.log(gitDiff(n,m,{color:!0,wordDiff:!0,noHeaders:!0})||"no changes"),fs.writeFile(i,m,a)}))}catch(e){console.error(e.message)}}))}}))};module.exports=index;
//# sourceMappingURL=index.js.map
