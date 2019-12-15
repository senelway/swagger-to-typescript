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
***************************************************************************** */
var e=require("fs"),n=require("git-diff"),t=require("http");export default function(r){var o=r.API,a=r.regexpMethods,i=r.modificators,c=r.filePath,f=function(e){return e.charAt(0).toUpperCase()+e.slice(1)},u=function(e){return e&&console.log(e)},p=function(e){var n=e.description;return n?"// "+n:"// NO DESCRIPTION"},s=function(e){return i.typeReplace[e]||e},l=function(e,n){if(!a.excludeDTO.test(e)&&n)return"export interface "+function(e){if(a.nameInterface.test(e)){var n=e.match(a.nameInterface);return n?n[1]:n}return e.split("[")[0]}(e)+" {"+n+"}"};t.get(o,(function(t){if(200===t.statusCode){t.setEncoding("utf8");var r="";t.on("data",(function(e){r+=e})),t.on("end",(function(){try{var t=JSON.parse(r).definitions,o=[],m=[],h=Object.keys(t).map((function(e){var n=t[e].properties,r=Object.keys(n).map((function(e){var t,r=n[e],c=(r.pagination,function(e,n){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&n.indexOf(r)<0&&(t[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)n.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(t[r[o]]=e[r[o]])}return t}(r,["pagination"]));return"enum"in c?(m.includes(e)||o.push((t=c,"export enum Enum"+f(e)+" {\n  "+t.enum.map((function(e){return e+" = '"+e+"', "+p(t)})).join("\n  ")+",\n}")),m.push(e),function(e){return"\n  "+e+": Enum"+f(e)+";\n"}(e)):function(e,n){var t,r=function(t){return"\n  "+e+": "+(i.interfaceReplace[t]||t)+"; "+p(n)+"\n"};return"array"===n.type?n.items.$ref?r(t=n.items.$ref.match(a.matchInterfaceName)[1]+"[]"):r(s(n.items.type)+"[]"):r("$ref"in n?(t=n.$ref.match(a.matchInterfaceName))?t[1]:t:s(n.type))}(e,c)})).join("");return l(e,r)})),y=function(){for(var e=0,n=0,t=arguments.length;n<t;n++)e+=arguments[n].length;var r=Array(e),o=0;for(n=0;n<t;n++)for(var a=arguments[n],i=0,c=a.length;i<c;i++,o++)r[o]=a[i];return r}(o,h).join("\n").replace(a.replaceSpace,"");y&&e.readFile(c,"utf8",(function(t,r){r&&console.log(n(r,y,{color:!0,wordDiff:!0,noHeaders:!0})||"no changes"),e.writeFile(c,y,u)}))}catch(e){console.error(e.message)}}))}}))}
//# sourceMappingURL=index.esm.js.map
