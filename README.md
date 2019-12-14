# swatts

[![npm](https://img.shields.io/npm/v/swatts.svg)](https://www.npmjs.com/package/swatts)
[![dependencies Status](https://david-dm.org/stk-dmitry/swatts/status.svg)](https://david-dm.org/stk-dmitry/swatts)
[![devDependencies Status](https://david-dm.org/stk-dmitry/swatts/dev-status.svg)](https://david-dm.org/stk-dmitry/swatts?type=dev)

```sh
npm i swatts
# or
yarn add swatts
```
## Usage
```js
import swatts from 'swatts';

swatts({
  API: 'http://YOUR-DOMAIN.wtf/swagger/v1/swagger.json',
  regexpMethods: {
    nameInterface: /(Container|ExtensionTotal)\[(.*)/,
    matchInterfaceName: /definitions\/(\w+)/,
    excludeDTO: /(RequestDto|ExtensionEmpty)/,
    replaceSpace: /^\s*[\r\n]/gm,
  },
  modificators: {
    interfaceReplace: { StatedContainerDto: 'any', 'StatedContainerDto[]': 'any[]' },
    typeReplace: { 'integer': 'number' }
  },
  filePath: __dirname + '/types.ts'
})
```
