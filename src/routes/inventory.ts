import { Router } from 'express';
import { inventoryItems } from '../data/items';
import { InventoryItem } from '../models/inventoryItem';

const STATUSES = ['all', 'active', 'lowStock'] as const;
type Status = (typeof STATUSES)[number];

function isStatus(value: unknown): value is Status {
  return typeof value === 'string' && (STATUSES as readonly string[]).includes(value);
}

export function filterItems(items: InventoryItem[], status: Status): InventoryItem[] {
  if (status === 'active') {
    return items.filter((i) => !i.discontinued);
  }
  // TODO
  if (status === 'lowStock') { return items.filter((i) => i.isLowStock); }
  return items;
}

function toDto(item: InventoryItem) {
  return {
    id: item.id,
    sku: item.sku,
    name: item.name,
    quantityOnHand: item.quantityOnHand,
    reorderLevel: item.reorderLevel,
    unitCost: item.unitCost,
    discontinued: item.discontinued,
    isLowStock: item.isLowStock,
    stockValue: item.stockValue,
    formattedStockValue: item.formattedStockValue,
  };
}

const router = Router();

router.get('/', (req, res) => {
  const status = req.query.status ?? 'all';
  if (!isStatus(status)) {
    res.status(400).json({ error: `Unknown status "${String(status)}". Use all, active or lowStock.` });
    return;
  }
  const filtered = filterItems(inventoryItems, status);
  res.json({
    filter: status,
    count: filtered.length,
    totalStockValue: Number(filtered.reduce((sum, i) => sum + i.stockValue, 0).toFixed(2)),
    // TODO
    items: filtered.map(toDto),
  });
});

export default router;
