import Console from './system/Console';
import TextColor, { Color } from './system/TextColor';
import Text from './system/Text';

export { Color } from './system/TextColor';

/**
 * ConsoleFacade encapsulates the usage of internal Console System components
 * and provides a simple and declarative interface for the required operation.
 */
export default class ConsoleFacade {
  
  private console = new Console();

  // TextColor instances will be cached and reused
  private textColors: Map<Color, TextColor> = new Map();

  public printLine(line: string, color: Color): void {
    this.addTextLine(line, color);

    this.console.print();
    this.console.reset();
  }

  // creates Text instance from a string and adds it to Console
  private addTextLine(line: string, color: Color): void {
    const textColor = this.getTextColor(color);
    const text = new Text(line, textColor);

    this.console.addText(text);
  }

  // returns TextColor instance from cache (or creates one)
  private getTextColor(color: Color): TextColor {
    if (!this.textColors.has(color)) {
      const textColor = new TextColor(color);
      this.textColors.set(color, textColor);
    }

    return this.textColors.get(color);
  }

} 
