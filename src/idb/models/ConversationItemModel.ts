import { encodeMessage, decodeMessage } from '@/shared/helpers.tsx';
import type { IConversationItem } from '@/types/conversation-item.ts'

export class ConversationItemModel {
  sender: string;
  text: string;

  constructor(data: IConversationItem) {
    this.sender = data.sender;
    this.text = data.text;
  }

  encode(): IConversationItem {
    return {
      sender: this.sender,
      text: encodeMessage(this.text),
    };
  }

  static decode(data: IConversationItem): IConversationItem {
    return {
      sender: data.sender,
      text: decodeMessage(data.text),
    };
  }
}
