export type PickerItem = {
  id: string;
  symbol: string;
  name: string;
  image?: string;
  price?: number;
  change24h?: number;
};

export type SearchableItem = {
  id: string;
  symbol: string;
  name: string;
};
