<img src="https://user-images.githubusercontent.com/9702154/70851497-088c3700-1ea7-11ea-98ec-92c0a4dd0630.png" width="460"  />
<br />

[![npm](https://img.shields.io/npm/v/swatts.svg)](https://www.npmjs.com/package/swatts)

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
    nameInterface?: /(Container|ExtensionTotal)\[(.*)/, // swagger v2
    matchInterfaceName?: /definitions\/(\w+)/, // swagger v2
    excludeDTO: /(RequestDto|ExtensionEmpty)/, 
    replaceSpace: /^\s*[\r\n]/gm,
  },
  modificators: {
    interfaceReplace?: { StatedContainerDto: 'any', 'StatedContainerDto[]': 'any[]' },
    typeReplace: { 'integer': 'number' }
  },
  filePath: __dirname + '/types.ts'
})
```

### Example file
```ts
export enum EnumUserRole {
  administrator = 'administrator', // admin
  organizationOwner = 'organizationOwner', // org
}
export interface ProfileDto {
  profileID: number; // ProfileID
  timeZone: string; // TimeZone
  firstName: string; // First name
  lastName: string; // Last name
  email: string; // Email
  userRole: EnumUserRole;
}
```
