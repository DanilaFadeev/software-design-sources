const { Agent, request } = require('node:https');

// Prints the SSL certificates keychain recursively
const printKeychain = certificate => {
  let cert;
  let indent = '';

  do {
    cert = cert?.issuerCertificate || certificate;
    console.debug([
      'Issued To',
      `  Common Name (CN): ${cert.subject.CN}`,
      `  Organisation (O): ${cert.subject.O}`,
      `  Organisational Unit (OU)): ${cert.subject.UO}`,
      `Issued By`,
      `  Common Name (CN): ${cert.issuer.CN}`,
      `  Organisation (O): ${cert.issuer.O}`,
      `  Organisational Unit (OU)): ${cert.issuer.UO}`,
      `Validity Period`,
      `  Issued On: ${cert.valid_from}`,
      `  Expires On: ${cert.valid_to}`,
      `Fingerprints`,
      `  SHA-1 fingerprint: ${cert.fingerprint}`,
      `  SHA-256 fingerprint: ${cert.fingerprint256}`
    ].map(line => `${indent}${line}\n`).join(''));

    indent += '\t';
  } while (cert !== cert.issuerCertificate);
}

const options = {
  hostname: 'software-design.netlify.app',
  port: 443,
  method: 'GET',
  path: '/',
  checkServerIdentity: (hostname, certificate) => {
    console.debug(`Server: ${hostname}\n`);
    printKeychain(certificate);
  }
};

options.agent = new Agent(options);

request(options).end();
