import { vi, describe, it, expect, beforeAll, afterAll } from 'vitest';

function makeModelMock() {
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
  return m;
}

const mockMongooseConnection = { readyState: 1 };
vi.mock('mongoose', () => ({
  default: {
    connection: mockMongooseConnection,
    connect: vi.fn().mockResolvedValue(mockMongooseConnection),
  },
}));

vi.mock('@/services/mongoDB', () => ({ default: vi.fn().mockResolvedValue({}) }));
vi.mock('@/models/Post', () => ({ default: makeModelMock() }));
vi.mock('@/models/User', () => ({ default: makeModelMock() }));

let PostDAO;
let originalMongoUri;

describe('PostDAO', () => {
  beforeAll(async () => {
    originalMongoUri = process.env.MONGODB_URI;
    if (!process.env.MONGODB_URI) {
      process.env.MONGODB_URI = 'mongodb://localhost/test';
    }

    PostDAO = (await import('./PostDAO.jsx')).default;
  });

  afterAll(() => {
    if (originalMongoUri === undefined) {
      delete process.env.MONGODB_URI;
    } else {
      process.env.MONGODB_URI = originalMongoUri;
    }
  });

  it('should have all main methods', () => {
    expect(typeof PostDAO.getPosts).toBe('function');
    expect(typeof PostDAO.getPostsWithoutPopulate).toBe('function');
    expect(typeof PostDAO.createPost).toBe('function');
    expect(typeof PostDAO.getPostById).toBe('function');
    expect(typeof PostDAO.getPostByIdWithDataAndWithoutPopulate).toBe('function');
    expect(typeof PostDAO.getPostByIdWithoutPopulate).toBe('function');
    expect(typeof PostDAO.getPostByUserIdWithoutPopulate).toBe('function');
    expect(typeof PostDAO.getPostBySlug).toBe('function');
    expect(typeof PostDAO.deletePostBySlug).toBe('function');
    expect(typeof PostDAO.deletePostById).toBe('function');
    expect(typeof PostDAO.updatePostById).toBe('function');
  });

  it('should throw if createPost called without arg', async () => {
    await expect(PostDAO.createPost()).rejects.toBeDefined();
  });

  it('should return null if getPostById called without arg', async () => {
    const result = await PostDAO.getPostById();
    expect(result).toBeNull();
  });

  it('should return null if getPostByIdWithDataAndWithoutPopulate called without arg', async () => {
    const result = await PostDAO.getPostByIdWithDataAndWithoutPopulate();
    expect(result).toBeNull();
  });

  it('should return null if getPostByIdWithoutPopulate called without arg', async () => {
    const result = await PostDAO.getPostByIdWithoutPopulate();
    expect(result).toBeNull();
  });

  it('should return empty posts and null user if getPostByUserIdWithoutPopulate called without arg', async () => {
    const result = await PostDAO.getPostByUserIdWithoutPopulate();
    expect(result).toEqual({ posts: [], user: null });
  });

  it('should return null if getPostBySlug called without arg', async () => {
    const result = await PostDAO.getPostBySlug();
    expect(result).toBeNull();
  });

  it('should throw if deletePostBySlug called without arg', async () => {
    await expect(PostDAO.deletePostBySlug()).rejects.toBeDefined();
  });

  it('should throw if deletePostById called without arg', async () => {
    await expect(PostDAO.deletePostById()).rejects.toBeDefined();
  });

  it('should throw if updatePostById called without arg', async () => {
    await expect(PostDAO.updatePostById()).rejects.toBeDefined();
  });
});
