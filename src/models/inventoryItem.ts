/**
 * A single stock-keeping unit tracked in the warehouse.
 */
export class InventoryItem {
  constructor(
    public readonly id: number,
    public readonly sku: string,
    public readonly name: string,
    public readonly quantityOnHand: number,
    public readonly reorderLevel: number,
    public readonly unitCost: number,
    public readonly discontinued: boolean,
  ) {}

  /** True when an active item has dropped to or below its reorder level. */
  get isLowStock(): boolean {
    return !this.discontinued && this.quantityOnHand <= this.reorderLevel;
  }

  // TODO
}
