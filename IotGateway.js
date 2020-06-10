const axios = require('axios');

class IotGateway {
  constructor(config) {
    config = Object.assign({}, config);
    this._host = config.host || '172.17.2.33';
    this._port = config.port || 80;
    this._username = config.username || 'administrator';
    this._password = config.password || '';
    this._ssl = config.ssl || false;

    if (this.port !== '' || this.port !== 'undefined') {
      this._sPort = this._port;
    } else {
      this._sPort = this._ssl ? 443 : 80;
    }

    // todo, test this
    this._baseUrl = `${this._ssl ? 'https' : 'http'}://${this._host}:${
      this._sPort
    }/iotgateway`;

    this._auth = {
      username: this._username,
      password: this._password
    };
  }

  /**
   * Write the current values to the IotGateway using the given array of tags.
   *
   * @param {*} tags An array of tag ids. Eg. ['Channel1.Device1.Global.R.TankLevel', ..]
   * @return A Promise that should resolve with an array of tag objects to be written. eg. [{id:xxx, v:xxx}, ..]
   * @memberof IotGateway
   */
  read(tags) {
    const headers = {
      'Content-Type': 'application/json'
    };

    return axios({
      method: 'post',
      url: `${this._baseUrl}/read`,
      auth: this._auth,
      headers,
      data: JSON.stringify(tags)
    }).then((resp) => resp.data.readResults);
  }

  /**
   * write the current values to the IotGateway using the given array of tag objects.
   *
   * @param {*} tags An array of tag ids. Eg. 'Channel1.Device1.Global.R.TankLevel
   * @return A Promise that should resolve with an array of tag objects to be written. eg. [{id:xxx, v:xxx}, ..]
   * @memberof IotGateway
   */
  write(tags) {
    const headers = {
      'Content-Type': 'application/json'
    };

    return axios({
      method: 'post',
      url: `${this._baseUrl}/write`,
      auth: this._auth,
      headers,
      data: JSON.stringify(tags)
    }).then((resp) => resp.data.writeResults);
  }
}

module.exports = IotGateway;
