const crypto = require('node:crypto');

// encodes plain JSON object with Base64 format
const jsonToBase64Url = obj => Buffer.from(JSON.stringify(obj)).toString('base64url');

// signs a string with HMAC SHA256 algorithm
const signString = (string, secret) => {
  const hmac = crypto.createHmac('sha256', secret);
  return hmac.update(string).digest('base64url');
};

// generate JWT signature based on header and payload
const sign = (data, secret) => {
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload = { ...data, iat: Date.now() };

  const signingString = `${jsonToBase64Url(header)}.${jsonToBase64Url(payload)}`;
  const signature = signString(signingString, secret);

  return `${signingString}.${signature}`;
};

// verify token's signature and decode the payload
const verify = (token, secret) => {
  const [headerBase64, payloadBase64, signature] = token.split('.');
  const signatureVerify = signString(`${headerBase64}.${payloadBase64}`, secret);

  // produce constant-time comparison
  const isSignatureValid = crypto.timingSafeEqual(
    Buffer.from(signature, 'utf-8'),
    Buffer.from(signatureVerify, 'utf-8')
  );
  if (!isSignatureValid) {
    return false;
  }

  const payloadDecoded = Buffer.from(payloadBase64, 'base64url').toString();
  return JSON.parse(payloadDecoded);
};

module.exports = { sign, verify };
