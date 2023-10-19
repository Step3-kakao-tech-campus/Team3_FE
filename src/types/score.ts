export interface Score {
  // from server data
  id: number;
  scoreNum: number;
  scoreImage: string | null;
}

export interface ScoreData extends Omit<Score, "scoreImage"> {
  // Score for ScoreInput, ScoreEditForm
  scoreImage: string | null | File;
  isNew?: boolean;
  isModified?: boolean;
}
