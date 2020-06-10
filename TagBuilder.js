class TagBuilder {
  /**
   * Creates an instance of TagBuilder.
   * @param {*} config
   * @memberof TagBuilder
   */
  constructor(config) {
    config = Object.assign({}, config);
    this._namespace = config.namespace || '';
    //add trailing fullstop if not empty
    this._namespace += !!this._namespace ? '.' : '';
    this._readTags = [];
    this._writeTags = [];
  }

  /**
   * Add a read tag to the tag builder
   *
   * @param {*} id The id of the tag to read
   * @returns The tag builder instance
   * @memberof TagBuilder
   */
  read(id) {
    if (this._writeTags.length > 0) {
      throw 'cannot add read tags if you have allready added write tags.';
    }

    this._readTags.push(`${this._namespace}${id}`);

    return this;
  }

  /**
   * Adds a write tag to the tag builder
   *
   * @param {*} id The Id of the tag to write
   * @param {*} value The value of the tag to write
   * @returns The tag builder instance
   * @memberof TagBuilder
   */
  write(id, value) {
    if (this._readTags.length > 0) {
      throw 'cannot add write tags if you have allready added read tags.';
    }

    if (value === 'undefined') {
      throw 'Value is required';
    }

    this._writeTags.push({
      id: `${this._namespace}${id}`,
      v: value
    });

    return this;
  }

  /**
   * Removes a tag from the read tags that have been added
   *
   * @param {*} id This id of the tag to remove
   * @return  the tag builder instance
   * @memberof TagBuilder
   */
  removeRead(id) {
    this._readTags = this._readTags.filter((arrayId) => {
      arrayId !== id;
    });
    return this;
  }

  /**
   * Removes a tag from the write tags that have been added
   *
   * @param {*} id The id of the tag to remove
   * @returns the tag builder instance
   * @memberof TagBuilder
   */
  removeWrite(id) {
    this.writeTags = this._writeTags.filter((arrayId) => {
      arrayId !== id;
    });
    return this;
  }

  /**
   * Remove all tags from tag builder
   *
   * @return  the tag builder instance
   * @memberof TagBuilder
   */
  clean() {
    this._readTags = [];
    this._writeTags = [];
    return this;
  }

  /**
   * Gets an array of read/write tags in the KepServerEx format
   *
   * @returns The read or write tag object
   * @memberof TagBuilder
   */
  get() {
    if (this._readTags.length > 0) {
      return this._readTags;
    }

    if (this._writeTags.length > 0) {
      return this._writeTags;
    }

    throw 'No tags have been added. Please call read() or write() before calling get';
  }



  /**
   * Returns the number of tags currently added to the builder
   *
   * @returns The number of tags that have been added
   * @memberof TagBuilder
   */
  length() {
    return Math.max(this._readTags.length, this._writeTags.length);
  }



  /**
   * Sets the name space for the tag builder
   *
   * @param {*} namespace the namespace to set. Eg 'Channel1.Device1'
   * @memberof TagBuilder
   */
  setNamespace(namespace) {
    this._namespace = namespace;
    //add trailing fullstop if not empty
    this._namespace += !!this._namespace ? '.' : '';
    return this;
  }

}

module.exports = TagBuilder;
