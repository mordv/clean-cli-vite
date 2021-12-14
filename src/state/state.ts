import create, { State } from 'zustand';

export type ModeType = 'one' | 'two';

export interface GameStoreType extends State {
  mode: ModeType;
  switchMode: () => void;
}

export const useStore = create<GameStoreType>((set) => ({
  mode: `one`,
  switchMode: () => set(({ mode }) => ({ mode: mode === `one` ? `two` : `one` })),
}));
