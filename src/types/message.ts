export interface MessageType {
  id: number;
  content: string;
  time: Date;
  isRead: boolean;
  isReceive: boolean;
}

export interface MessageCardType {
  opponentUserId: number;
  countNew: number;
  opponentUserName: string;
  opponentUserProfileImage: string;
  recentMessage: string;
}
