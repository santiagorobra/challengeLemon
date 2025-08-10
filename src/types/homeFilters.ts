export type SortDir = 'asc' | 'desc';
export type VariationFilter = 'all' | 'positive' | 'negative';

export type HomeFilters = {
  query: string;
  sortDir: SortDir;
  minPrice?: number;
  maxPrice?: number;
  variation: VariationFilter;
};
