import { vi, describe, it, expect } from 'vitest';
vi.mock('@/services/mongoDB', () => ({ default: vi.fn().mockResolvedValue({}) }));

vi.mock('@/models/Direccion', () => {
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
import direccionDAO from './DireccionDAO.jsx';

describe('DireccionDAO', () => {
  it('should have all main methods', () => {
    expect(typeof direccionDAO.createDireccion).toBe('function');
    expect(typeof direccionDAO.getDireccionById).toBe('function');
    expect(typeof direccionDAO.updateDireccionById).toBe('function');
    expect(typeof direccionDAO.deleteDireccionById).toBe('function');
  });

  it('should throw if createDireccion called without arg', async () => {
    await expect(direccionDAO.createDireccion()).rejects.toBeDefined();
  });

  it('should throw if getDireccionById called without arg', async () => {
    await expect(direccionDAO.getDireccionById()).rejects.toBeDefined();
  });

  it('should throw if updateDireccionById called without args', async () => {
    await expect(direccionDAO.updateDireccionById()).rejects.toBeDefined();
  });

  it('should throw if deleteDireccionById called without arg', async () => {
    await expect(direccionDAO.deleteDireccionById()).rejects.toBeDefined();
  });
});
