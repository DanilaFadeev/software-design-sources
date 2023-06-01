class Radio implements Iterable<number> {

  private stations: number[] = [];

  public addStation(station: number): void {
    this.stations.push(station);
  }

  public getStation(index: number): number {
    return this.stations[index];
  }

  // built-in Symbol used internally by JS engine
  [Symbol.iterator](): RadioIterator {
    return new RadioIterator(this);
  }

}

class RadioIterator implements Iterator<number> {

  private index = 0;

  constructor(private radio: Radio) {}

  next(): IteratorResult<number, any> {
    const station = this.radio.getStation(this.index);
    const done = !this.radio.getStation(this.index++);

    return { done, value: station };
  }

}

const radio = new Radio();
radio.addStation(94.3);
radio.addStation(96.4);
radio.addStation(101.7);
radio.addStation(110.0);
radio.addStation(111.1);

for (const station of radio) {
  console.log(`Station ${station}`);
}
