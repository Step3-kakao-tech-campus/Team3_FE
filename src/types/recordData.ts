export interface RecordData {
  id: number;
  applicantId: number;
  title: string;
  dueTime: Date;
  districtName: string;
  startTime: Date;
  currentNumber: number;
  isClose: boolean;
  scores: {
    id: number;
    score: number;
    scoreImage: string | null;
  }[];
  members: {
    id: number;
    name: string;
    profileImage: string | null;
    isRated: boolean;
  }[];
}
