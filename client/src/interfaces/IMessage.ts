export interface IMessage {
    body: string;
    authorId: number;
    groupId: number;
    sent_at: string;
    username?: string;
  }