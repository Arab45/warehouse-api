import request from 'supertest';
import { app } from '../src/app';
import { InventoryItem } from '../src/models/inventoryItem';

describe('InventoryItem model', () => {
  const item = new InventoryItem(99, 'WH-9999', 'Test Widget', 12, 5, 4.25, false);

  it('stockValue multiplies quantityOnHand by unitCost', () => {
    expect(item.stockValue).toBeCloseTo(51, 2);
  });

  it('formattedStockValue shows the value to two decimal places', () => {
    // Ignore the currency symbol and any separators so small format changes never break this test.
    expect(item.formattedStockValue.replace(/[^0-9.]/g, '')).toBe('51.00');
  });
});

describe('GET /api/inventory', () => {
  it('returns every item and the full stock value when no status is given', async () => {
    const res = await request(app).get('/api/inventory');
    expect(res.status).toBe(200);
    expect(res.body.count).toBe(8);
    expect(res.body.totalStockValue).toBeCloseTo(4109.5, 2);
  });

  it('status=active excludes discontinued items', async () => {
    const res = await request(app).get('/api/inventory?status=active');
    expect(res.status).toBe(200);
    expect(res.body.count).toBe(6);
    expect(res.body.totalStockValue).toBeCloseTo(4075.5, 2);
    expect(res.body.items.every((i: { discontinued: boolean }) => !i.discontinued)).toBe(true);
  });

  it('status=lowStock returns only active items at or below reorder level', async () => {
    const res = await request(app).get('/api/inventory?status=lowStock');
    expect(res.status).toBe(200);
    expect(res.body.count).toBe(3);
    expect(res.body.totalStockValue).toBeCloseTo(533.5, 2);
    const skus = res.body.items.map((i: { sku: string }) => i.sku).sort();
    expect(skus).toEqual(['WH-1002', 'WH-1003', 'WH-1005']);
  });

  it('rejects an unknown status with HTTP 400', async () => {
    const res = await request(app).get('/api/inventory?status=bogus');
    expect(res.status).toBe(400);
    expect(res.body.error.toLowerCase()).toContain('unknown status');
  });
});
