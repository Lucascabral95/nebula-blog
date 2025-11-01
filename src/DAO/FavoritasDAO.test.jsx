import { vi, describe, it, expect } from 'vitest';
vi.mock('@/services/mongoDB', () => ({ default: vi.fn().mockResolvedValue({}) }));

vi.mock('@/models/Favoritas', () => {
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
import favoritasDAO from './FavoritasDAO.jsx';

describe('FavoritasDAO', () => {
  it('should have all main methods', () => {
    expect(typeof favoritasDAO.createFavorita).toBe('function');
    expect(typeof favoritasDAO.getFavoritasByUser).toBe('function');
    expect(typeof favoritasDAO.addPostToFavoritas).toBe('function');
    expect(typeof favoritasDAO.deletePostFromFavoritaByUserAndPostId).toBe('function');
  });

  it('should throw if createFavorita called without arg', async () => {
    await expect(favoritasDAO.createFavorita()).rejects.toBeDefined();
  });

  it('should throw if getFavoritasByUser called without arg', async () => {
    await expect(favoritasDAO.getFavoritasByUser()).rejects.toBeDefined();
  });

  it('should throw if addPostToFavoritas called without args', async () => {
    await expect(favoritasDAO.addPostToFavoritas()).rejects.toBeDefined();
  });

  it('should throw if deletePostFromFavoritaByUserAndPostId called without args', async () => {
    await expect(favoritasDAO.deletePostFromFavoritaByUserAndPostId()).rejects.toBeDefined();
  });
});
