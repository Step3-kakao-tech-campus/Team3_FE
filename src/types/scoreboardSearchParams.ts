export interface ScoreboardSearchParams {
  condition?: "all" | "created" | "participated";
  status?: "all" | "open" | "closed";
  cityId?: number;
  start?: string;
  end?: string;
  key?: number;
  size?: number;
}
