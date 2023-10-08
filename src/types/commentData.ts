export interface CommentData {
  id: number;
  userId: number;
  userName: string;
  profileImage: string | null;
  content: string;
  createdAt: Date;
  editedAt: Date;
}
