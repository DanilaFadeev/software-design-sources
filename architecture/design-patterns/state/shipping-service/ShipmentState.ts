import { IShippingState, ShipmentStatus } from './types';
import type { ShippingService } from './ShippingService';

abstract class ShipmentState implements IShippingState {
  constructor(
    protected status: ShipmentStatus,
    protected shipmentService: ShippingService
  ) {}

  public getStatus(): ShipmentStatus {
    return this.status;
  }

  public setAddress(address: string): void {
    this.shipmentService.setAddress(address);
  }

  public abstract proceed(): void;
}

export class ShipmentCreated extends ShipmentState {
  constructor(shipmentService: ShippingService) {
    super(ShipmentStatus.Created, shipmentService);
  }

  public proceed(): void {
    const dispatchedState = new ShipmentDispatched(this.shipmentService);
    this.shipmentService.setState(dispatchedState);
  }
}

export class ShipmentDispatched extends ShipmentState {
  constructor(protected shipmentService: ShippingService) {
    super(ShipmentStatus.Dispatched, shipmentService);
  }

  public setAddress(_address: string): void {
    console.error('ERR: Can\'t change the address of a dispatched shipment!');
  }

  public proceed(): void {
    const dispatchedState = new ShipmentDelivered(this.shipmentService);
    this.shipmentService.setState(dispatchedState);
  }
}

export class ShipmentDelivered extends ShipmentState {
  constructor(protected shipmentService: ShippingService) {
    super(ShipmentStatus.Delivered, shipmentService);
  }

  public setAddress(_address: string): void {
    console.error('ERR: Can\'t change the address of a delivered shipment!');
  }

  public proceed(): void {
    console.error('ERR: The shipment is already delivered');
  }
}
