import { vi, describe, it, expect } from 'vitest';
vi.mock('@/services/mongoDB', () => ({ default: vi.fn().mockResolvedValue({}) }));

vi.mock('@/models/Comment', () => {
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
import commentDAO from './CommentDAO.jsx';

describe('CommentDAO', () => {
  it('should have all main methods', () => {
    expect(typeof commentDAO.getCommentsByPostID).toBe('function');
    expect(typeof commentDAO.createComment).toBe('function');
    expect(typeof commentDAO.deleteCommentById).toBe('function');
    expect(typeof commentDAO.updateCommentById).toBe('function');
  });

  it('should throw if getCommentsByPostID called without arg', async () => {
    await expect(commentDAO.getCommentsByPostID()).rejects.toBeDefined();
  });

  it('should throw if createComment called without arg', async () => {
    await expect(commentDAO.createComment()).rejects.toBeDefined();
  });

  it('should throw if deleteCommentById called without arg', async () => {
    await expect(commentDAO.deleteCommentById()).rejects.toBeDefined();
  });

  it('should throw if updateCommentById called without arg', async () => {
    await expect(commentDAO.updateCommentById()).rejects.toBeDefined();
  });
});
