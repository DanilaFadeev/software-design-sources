import BaseTextHandler, { TextRequest } from './BaseTextHandler';

export class TrimHandler extends BaseTextHandler {
  public handle(request: TextRequest): TextRequest {
    const processed = request.trim();
    return super.handle(processed);
  }
}

export class CapitalizeHandler extends BaseTextHandler {
  public handle(request: TextRequest): TextRequest {
    const processed = this.capitalize(request);
    return super.handle(processed);
  }

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
}

export class RepeatHeader extends BaseTextHandler {
  constructor(private times: number) {
    super();
  }

  public handle(request: TextRequest): TextRequest {
    const processed = request.repeat(this.times);
    return super.handle(processed);
  }
}
