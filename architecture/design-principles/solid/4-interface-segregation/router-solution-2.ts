interface IRouterNavigator {
  parseUrl(url: string): URL;
  navigate(route: string): void;
  getQueryParams(url: string): [string, string][];
}

interface IRouterListener {
  addEventListener(event: string, handler: () => void): void;
}

class ClientRouter implements IRouterNavigator, IRouterListener {
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

class ServerRouter implements IRouterNavigator {
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
  addEventListener(_event: string, _handler: () => void): void {
    throw new Error("Method is not supported.");
  }
}