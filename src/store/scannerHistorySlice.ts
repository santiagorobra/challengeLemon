import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type HistoryItem = {
  address: string;
  favorite: boolean;
  ts: number;
};

type State = { items: HistoryItem[] };
const initialState: State = { items: [] };

const slice = createSlice({
  name: 'scannerHistory',
  initialState,
  reducers: {
    addOrUpdate(state, action: PayloadAction<HistoryItem>) {
      const item = action.payload;
      const idx = state.items.findIndex(i => i.address === item.address);
      if (idx >= 0) {
        state.items[idx] = { ...state.items[idx], ...item, ts: Date.now() };
      } else {
        state.items.unshift({ ...item, ts: Date.now() });
      }
    },
    toggleFavorite(state, action: PayloadAction<string>) {
      const idx = state.items.findIndex(i => i.address === action.payload);
      if (idx >= 0) state.items[idx].favorite = !state.items[idx].favorite;
    },
    deleteItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(i => i.address !== action.payload);
    },
    clearHistory(state) {
      state.items = [];
    },
  },
});

export const { addOrUpdate, toggleFavorite, deleteItem, clearHistory } = slice.actions;

export default slice.reducer;
