export interface IMessage {
    messageBody: string;
    authorId: number;
    groupId: number;
    sentAt: string;
    username?: string;
  }