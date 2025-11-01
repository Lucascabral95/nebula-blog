
import { vi, describe, it, expect } from 'vitest';
vi.mock('@/services/mongoDB', () => ({ default: vi.fn().mockResolvedValue({}) }));

vi.mock('@/models/Bio', () => {
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
vi.mock('./PostDAO', () => ({ default: { getPostById: vi.fn().mockResolvedValue({ author: 'mockAuthor' }) } }));
import bioDAO from './BioDAO.jsx';

describe('BioDAO', () => {
  it('should have all main methods', () => {
    expect(typeof bioDAO.createBio).toBe('function');
    expect(typeof bioDAO.getBioById).toBe('functionn');
    expect(typeof bioDAO.updateBioById).toBe('function');
    expect(typeof bioDAO.deleteBioById).toBe('function');
    expect(typeof bioDAO.getBioFromPostAuthor).toBe('function');
  });

  it('should throw if createBio called without arg', async () => {
    await expect(bioDAO.createBio()).rejects.toBeDefined();
  });

  it('should throw if getBioById called without arg', async () => {
    await expect(bioDAO.getBioById()).rejects.toBeDefined();
  });

  it('should throw if updateBioById called without args', async () => {
    await expect(bioDAO.updateBioById()).rejects.toBeDefined();
  });

  it('should throw if deleteBioById called without arg', async () => {
    await expect(bioDAO.deleteBioById()).rejects.toBeDefined();
  });
});
