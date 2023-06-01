export enum ShipmentStatus {
  Created = 'Created',
  Dispatched = 'Dispatched',
  Delivered = 'Delivered'
}

export interface IShippingState {
  getStatus(): ShipmentStatus;
  setAddress(address: string): void;
  proceed(): void;
}
