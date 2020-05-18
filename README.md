# kepserverex-js

[![build status](https://img.shields.io/travis/com/ryanalbrecht/kepserverex-js.svg)](https://travis-ci.com/ryanalbrecht/kepserverex-js)
[![code coverage](https://img.shields.io/codecov/c/github/ryanalbrecht/kepserverex-js.svg)](https://codecov.io/gh/ryanalbrecht/kepserverex-js)
[![code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![made with lass](https://img.shields.io/badge/made_with-lass-95CC28.svg)](https://lass.js.org)
[![license](https://img.shields.io/github/license/ryanalbrecht/kepserverex-js.svg)](LICENSE)
[![npm downloads](https://img.shields.io/npm/dt/kepserverex-js.svg)](https://npm.im/kepserverex-js)

> A library to interact with KEPServerEX


## Table of Contents

* [Install](#install)
* [Usage](#usage)
* [Contributors](#contributors)
* [License](#license)


## Install

[npm][]:

```sh
npm install kepserverex-js
```

[yarn][]:

```sh
yarn add kepserverex-js
```


## Usage
The package is currently comprised of two modules.
- IotGateway: A class to read and write from the IoTGateway, REST agents that KEPServerEx provides.
- TagBuilder: A helper class to functionally create tag array to read and write using the IoTGateway class.

```js
const {TagBuilder, IotGateway} = require('kepserverex-js');

const tagBuilder = new TagBuilder({ namespace: 'Channel1.Device1' });
const iotGateway = new IotGateway({
  host: '192.168.0.1',
  username: 'administrator',
  password: 'superSecretPassowrd'
});

// Add read tags to tag builder
// ["Channel1.Device1.TankLevel","Channel1.Device1.TankLevel"]
const myTags = tagBuilder
    .read('TankLevel')
    .read('TankTemperature')
    .get();

//read tags from the iotgateway agent
iotGateway.read(myTags).then((data)=>{
    console.log(data);
});

//clean tags from tagsbuilder
tagBuilder.clean();

// Add write tags to builder.
// [ {id:"Channel1.Device1.ValveOpen","v":1}, {"id":"Channel1.Device1.PumpSpeed","v":80}]
const myTags = tagBuilder
    .write("ValveOpen",1)
    .write('PumpSpeed',80)
    .get();

iotGateway.write(myTags).then((data) => {
    console.log(data);
 });

```


## Contributors

| Name              |
| ----------------- |
| **Ryan Albrecht** |


## License

[MIT](LICENSE) © Ryan Albrecht


##

[npm]: https://www.npmjs.com/

[yarn]: https://yarnpkg.com/
