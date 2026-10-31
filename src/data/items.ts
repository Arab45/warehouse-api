import { InventoryItem } from '../models/inventoryItem';

export const inventoryItems: InventoryItem[] = [
  new InventoryItem(1, 'WH-1001', 'Pallet Wrap Roll', 120, 40, 8.5, false),
  new InventoryItem(2, 'WH-1002', 'Corrugated Box Large', 35, 50, 2.4, false),
  new InventoryItem(3, 'WH-1003', 'Thermal Label Roll', 18, 25, 12.75, false),
  new InventoryItem(4, 'WH-1004', 'Packing Tape Case', 60, 20, 31.2, false),
  new InventoryItem(5, 'WH-1005', 'Barcode Scanner Battery', 10, 10, 22.0, false),
  new InventoryItem(6, 'WH-1006', 'Foam Insert Sheet', 0, 15, 5.1, true),
  new InventoryItem(7, 'WH-1007', 'Safety Gloves Pair', 200, 80, 3.25, false),
  new InventoryItem(8, 'WH-1008', 'Stretch Film Mini', 5, 12, 6.8, true),
];
