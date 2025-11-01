import { vi, describe, it, expect } from 'vitest';
vi.mock('@/services/mongoDB', () => ({ default: vi.fn().mockResolvedValue({}) }));

vi.mock('@/models/Detalles', () => {
  const m = function (data) { this.data = data; };
  m.prototype.save = vi.fn(function () {
    if (!this.data) return Promise.reject(new Error('no data'));
    return Promise.resolve({ ...this.data, _id: 'mockid' });
  });
  m.create = vi.fn((data) => {
    if (!data) return Promise.reject(new Error('no data'));
    return Promise.resolve({ ...data, _id: 'mockid' });
  });
  m.find = vi.fn((q) => {
    if (q && Object.values(q).some((v) => v === undefined)) return Promise.reject(new Error('missing arg'));
    return Promise.resolve([]);
  });
  m.findOne = vi.fn((q) => {
    if (q && Object.values(q).some((v) => v === undefined)) return Promise.reject(new Error('missing arg'));
    return Promise.resolve(null);
  });
  m.findById = vi.fn((id) => {
    if (id === undefined) return Promise.reject(new Error('missing id'));
    return Promise.resolve(null);
  });
  m.updateOne = vi.fn((q) => {
    if (q && Object.values(q).some((v) => v === undefined)) return Promise.reject(new Error('missing arg'));
    return Promise.resolve({});
  });
  m.deleteOne = vi.fn((q) => {
    if (q && Object.values(q).some((v) => v === undefined)) return Promise.reject(new Error('missing arg'));
    return Promise.resolve({});
  });
  return { default: m };
});
import detallesDAO from './DetallesDAO.jsx';

describe('DetallesDAO', () => {
  it('should have all main methods', () => {
    expect(typeof detallesDAO.createDetalles).toBe('function');
    expect(typeof detallesDAO.getDetallesById).toBe('function');
    expect(typeof detallesDAO.updateDetallesById).toBe('function');
    expect(typeof detallesDAO.deleteDetallesById).toBe('function');
  });

  it('should throw if createDetalles called without arg', async () => {
    await expect(detallesDAO.createDetalles()).rejects.toBeDefined();
  });

  it('should throw if getDetallesById called without arg', async () => {
    await expect(detallesDAO.getDetallesById()).rejects.toBeDefined();
  });

  it('should throw if updateDetallesById called without args', async () => {
    await expect(detallesDAO.updateDetallesById()).rejects.toBeDefined();
  });

  it('should throw if deleteDetallesById called without arg', async () => {
    await expect(detallesDAO.deleteDetallesById()).rejects.toBeDefined();
  });
});
