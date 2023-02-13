const crypto = require('node:crypto');

class ApiKeyService {
  constructor() {
    this.keysStorage = new Map();
  }

  createKey(description) {
    const key = this.#generateKey();
    const keyMeta = {
      description,
      calledCount: 0,
      lastUsed: null,
      createdAt: new Date().toISOString()
    };

    this.keysStorage.set(key, keyMeta);

    return { key, ...keyMeta };
  }

  useKey(key) {
    if (!this.keysStorage.has(key)) {
      return false;
    }

    const keyMeta = this.keysStorage.get(key);
    this.keysStorage.set(key, {
      ...keyMeta,
      calledCount: keyMeta.calledCount + 1,
      lastUsed: new Date().toISOString()
    });

    return true;
  }

  getKeys() {
    return Array
      .from(this.keysStorage.entries())
      .map(([key, meta]) => ({ key, ...meta }));
  }

  #generateKey() {
    return crypto.randomBytes(16).toString('hex');
  }
}

module.exports = ApiKeyService;
