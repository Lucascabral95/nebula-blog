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
vi.mock('@/models/User', () => ({ default: makeModelMock() }));

let userDAO;
let originalMongoUri;

describe('UserDAO', () => {
  beforeAll(async () => {
    originalMongoUri = process.env.MONGODB_URI;
    if (!process.env.MONGODB_URI) {
      process.env.MONGODB_URI = 'mongodb://localhost/test';
    }

    userDAO = (await import('./UserDAO.jsx')).default;
  });

  afterAll(() => {
    if (originalMongoUri === undefined) {
      delete process.env.MONGODB_URI;
    } else {
      process.env.MONGODB_URI = originalMongoUri;
    }
  });

  it('should have all main methods', () => {
    expect(typeof userDAO.createUser).toBe('function');
    expect(typeof userDAO.findUserByEmail).toBe('function');
    expect(typeof userDAO.getUserById).toBe('function');
    expect(typeof userDAO.validatePassword).toBe('function');
  });

  it('should throw if createUser called without user', async () => {
    await expect(userDAO.createUser()).rejects.toBeDefined();
  });

  it('should throw if findUserByEmail called without email', async () => {
    await expect(userDAO.findUserByEmail()).rejects.toBeDefined();
  });

  it('should throw if getUserById called without id', async () => {
    await expect(userDAO.getUserById()).rejects.toBeDefined();
  });

  it('should throw if validatePassword called without args', async () => {
    await expect(userDAO.validatePassword()).rejects.toBeDefined();
  });

  it('should initialize db only once', async () => {
    userDAO.dbInitialized = false;
    const spy = vi.spyOn(userDAO, 'initializeDB');
    await userDAO.ensureConnection();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
