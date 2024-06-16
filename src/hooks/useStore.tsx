import { create } from "zustand";

export type StoreState = {};

export const useStore = create<StoreState>((set) => ({}));
