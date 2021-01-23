export interface Message {
  sender: String;
  receiver: String;
  subject: String;
  message: String;
  creationDate: string;
  msgId?: number;
}
