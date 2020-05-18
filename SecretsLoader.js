// this is a helper class to load secrets during development so I dont expose my super dooper secret senstive data to you savages

class SecretsLoader {
  constructor(config) {
    config = { ...config };
    this._name = config.name || 'SecretsLoader';
  }

  loadSecrets() {
    const secrets = require('./secrets.json');
    return secrets;
  }
}

module.exports = SecretsLoader;
