import { act } from '@testing-library/react';
import { create } from 'zustand';
import { describe, it, expect, beforeEach } from 'vitest';

const useTestStore = (set) => ({
  isOpenSearchFull: false,
  setIsOpenSearchFull: (isOpen) => set({ isOpenSearchFull: isOpen }),
  toggleSearchFull: () => set((state) => ({ isOpenSearchFull: !state.isOpenSearchFull })),
  arrayDePosteos: [],
  setArrayDePosteos: (array) => set({ arrayDePosteos: array }),
  search: '',
  setSearch: (search) => set({ search }),
});

describe('Zustand Store', () => {
  let store;

  beforeEach(() => {
    store = create(useTestStore);
  });

  describe('Search Functionality', () => {
    it('should initialize with search closed', () => {
      expect(store.getState().isOpenSearchFull).toBe(false);
    });

    it('should open search', () => {
      act(() => {
        store.getState().setIsOpenSearchFull(true);
      });
      expect(store.getState().isOpenSearchFull).toBe(true);
    });

    it('should toggle search state', () => {
      expect(store.getState().isOpenSearchFull).toBe(false);
      
      act(() => {
        store.getState().toggleSearchFull();
      });
      expect(store.getState().isOpenSearchFull).toBe(true);
      
      act(() => {
        store.getState().toggleSearchFull();
      });
      expect(store.getState().isOpenSearchFull).toBe(false);
    });
  });

  describe('Posts Array Management', () => {
    const mockPosts = [
      { id: 1, title: 'Post 1' },
      { id: 2, title: 'Post 2' },
    ];

    it('should initialize with empty posts array', () => {
      expect(store.getState().arrayDePosteos).toEqual([]);
    });

    it('should set posts array', () => {
      act(() => {
        store.getState().setArrayDePosteos(mockPosts);
      });
      
      const { arrayDePosteos } = store.getState();
      expect(arrayDePosteos).toHaveLength(2);
      expect(arrayDePosteos[0].title).toBe('Post 1');
      expect(arrayDePosteos[1].title).toBe('Post 2');
    });
  });

  describe('Search Text', () => {
    it('should initialize with empty search text', () => {
      expect(store.getState().search).toBe('');
    });

    it('should update search text', () => {
      const testSearch = 'test search';
      
      act(() => {
        store.getState().setSearch(testSearch);
      });
      
      expect(store.getState().search).toBe(testSearch);
    });
  });

  describe('State Isolation', () => {
    it('should maintain separate state instances', () => {
      const store1 = create(useTestStore);
      const store2 = create(useTestStore);

      act(() => {
        store1.getState().setSearch('store1');
        store2.getState().setSearch('store2');
      });

      expect(store1.getState().search).toBe('store1');
      expect(store2.getState().search).toBe('store2');
    });
  });
});
