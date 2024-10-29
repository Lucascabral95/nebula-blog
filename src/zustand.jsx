import { create } from "zustand";

const useStore = create((set) => ({
    isOpenSearchFull: false,
    setIsOpenSearchFull: (isOpen) => set({ isOpenSearchFull: isOpen }),
    toggleSearchFull: () => set((state) => ({ isOpenSearchFull: !state.isOpenSearchFull })),

    arrayDePosteos: [],
    setArrayDePosteos: (array) => set({ arrayDePosteos: array }),

    search: "",
    setSearch: (search) => set({ search: search }),
}));

export default useStore;