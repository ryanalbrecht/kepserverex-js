const test = require('ava');

const { IotGateway, TagBuilder } = require('..');
const SecretsLoader = require('../SecretsLoader');

// require('axios-debug-log')

const tagBuilder = new TagBuilder({ namespace: 'Tbrc1.Device1' });
const secretsLoader = new SecretsLoader({});
const secrets = secretsLoader.loadSecrets();
const iotGateway = new IotGateway({
  host: secrets.host,
  username: secrets.username,
  password: secrets.password
});

test.beforeEach((t) => {
  t.context.tb = new TagBuilder({ namespace: 'Tbrc1.Device1' });
});

test.serial('IotGateway - instance is intialized', (t) => {
  if (iotGateway !== 'undefined') {
    t.pass();
  } else {
    t.fail();
  }
});

test.serial('IotGateway - can read from iotgateway', (t) => {
  const tags = t.context.tb
    .read('Global.R.IT_Test2_Integer')
    .read('Global.R.IT_Test2_Real')
    .get();

  return iotGateway.read(tags).then((resp) => {
    t.pass();
  });
});

test.serial('IotGateway - can write to iotgateway', (t) => {
  const tags = t.context.tb
    .write('Global.R.IT_Test1_Integer', 2)
    .write('Global.R.IT_Test2_Real', 2)
    .get();

  return iotGateway.write(tags).then((resp) => {
    console.log(resp);
    t.pass();
  });
});
