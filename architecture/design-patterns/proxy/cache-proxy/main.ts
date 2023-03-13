import HttpRequest from './HttpRequest';
import HttpRequestProxy from './HttpRequestProxy';

const logTime = async (label: string, fn: () => Promise<any>) => {
  console.time(label);
  await fn();
  console.timeEnd(label);
};

(async () => {
  const httpRequest = new HttpRequest();
  const httpRequestProxy = new HttpRequestProxy(httpRequest);

  const url1 = 'https://pokeapi.co/api/v2/pokemon/ditto';
  await logTime('Request /api/v2/pokemon/ditto', () => httpRequestProxy.get(url1));
  await logTime('Request /api/v2/pokemon/ditto', () => httpRequestProxy.get(url1));
  await logTime('Request /api/v2/pokemon/ditto', () => httpRequestProxy.get(url1));

  const url2 = 'https://pokeapi.co/api/v2/pokemon/charizard';
  await logTime('Request /api/v2/pokemon/charizard', () => httpRequestProxy.get(url2));
  await logTime('Request /api/v2/pokemon/charizard', () => httpRequestProxy.get(url2));
  await logTime('Request /api/v2/pokemon/charizard', () => httpRequestProxy.get(url2));
})();
