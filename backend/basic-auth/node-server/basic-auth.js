// Returns Response Basic Auth validator function
const BasicAuth = ({ username, password }) => {
  return request => {
    const { authorization } = request?.headers || {};

    // check Authorization token and its schema
    if (typeof authorization !== 'string' || !authorization.startsWith('Basic ')) {
      return null;
    }

    // extract Basic Auth token and decode it
    const [, base64Credentials] = authorization.trim().split(' ');
    const credentials = Buffer.from(base64Credentials, 'base64').toString();

    console.debug({ header: authorization, base64Credentials, credentials });

    // extract username and password from the decoded string
    const [login, pass] = credentials.split(':');
    if (login === username && pass === password) {
      return { username };
    }

    return null;
  }
}

module.exports = { BasicAuth };
