import { vi, describe, it, expect } from 'vitest';
vi.mock('@/services/mongoDB', () => ({ default: vi.fn().mockResolvedValue({}) }));

vi.mock('@/models/Category.jsx', () => {
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
import categoryDAO from './CategoryDAO.jsx';

describe('CategoryDAO', () => {
  it('should have all main methods', () => {
    expect(typeof categoryDAO.createCategory).toBe('function');
    expect(typeof categoryDAO.getCategories).toBe('function');
    expect(typeof categoryDAO.getCategoryById).toBe('function');
    expect(typeof categoryDAO.getCategoryByName).toBe('function');
  });

  it('should throw if createCategory called without arg', async () => {
    await expect(categoryDAO.createCategory()).rejects.toBeDefined();
  });

  it('should throw if getCategoryById called without arg', async () => {
    await expect(categoryDAO.getCategoryById()).rejects.toBeDefined();
  });

  it('should throw if getCategoryByName called without arg', async () => {
    await expect(categoryDAO.getCategoryByName()).rejects.toBeDefined();
  });
});
