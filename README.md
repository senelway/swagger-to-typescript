<img src="https://user-images.githubusercontent.com/9702154/70851497-088c3700-1ea7-11ea-98ec-92c0a4dd0630.png" width="460"  />
<br /><br />

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
