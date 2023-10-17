export interface Score {
  id: number;
  scoreNum: number;
  scoreImage: string | null;
}

export interface ScoreData extends Omit<Score, "scoreImage"> {
  scoreImage: string | null | File;
  isValid: boolean;
}
