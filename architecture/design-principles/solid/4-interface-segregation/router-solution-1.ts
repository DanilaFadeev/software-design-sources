interface IRouter {
  parseUrl(url: string): URL;
  navigate(route: string): void;
  getQueryParams(url: string): [string, string][];
}

interface IClientRouter extends IRouter {
  addEventListener(event: string, handler: () => void): void;
}

class ClientRouter implements IClientRouter {
  parseUrl(url: string): URL {
    return new URL(url);
  }
  navigate(route: string): void {
    location.replace(route);
  }
  getQueryParams(url: string): [string, string][] {
    return [...this.parseUrl(url).searchParams.entries()]
  }
  addEventListener(event: string, handler: () => void): void {
    window.addEventListener(event, handler);
  }
}

class ServerRouter implements IRouter {
  parseUrl(url: string): URL {
    return new URL(url);
  }
  navigate(route: string): void {
    fetch(route);
  }
  getQueryParams(url: string): [string, string][] {
    const sort = this.parseUrl(url).searchParams.get('sort') || '';
    return [['sort', sort]];
  }
}
