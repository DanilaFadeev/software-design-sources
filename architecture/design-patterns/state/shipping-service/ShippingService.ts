import type { IShippingState, ShipmentStatus } from './types';
import { ShipmentCreated } from './ShipmentState';

export class ShippingService {
  private shippingState: IShippingState;
  private address: string;

  constructor() {
    this.shippingState = new ShipmentCreated(this);
  }

  public setState(state: IShippingState) {
    this.shippingState = state;
    console.log('Shipment moved to another status');
  }

  public setAddress(address: string) {
    this.address = address;
    console.log('Delivery address set:', address);
  }

  public getAddress(): string {
    return this.address;
  }

  public getStatus(): ShipmentStatus {
    return this.shippingState.getStatus();
  }

  public changeAddress(address: string) {
    this.shippingState.setAddress(address);
  }

  public proceed() {
    this.shippingState.proceed();
  }
}
