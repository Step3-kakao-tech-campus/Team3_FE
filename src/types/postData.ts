export interface PostData {
  id: number;
  title: string;
  dueTime: Date;
  startTime: Date;
  districtName: string;
  userName: string;
  profileImage: string | null;
  isClose: boolean;
  currentNumber: number;
}
