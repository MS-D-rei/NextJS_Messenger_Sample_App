import { Conversation, Message, User } from "@prisma/client"

export type FullMessageType = Message & {
  sender: User,
  seen_by: User[],
}

export type FullConversationType = Conversation & {
  users: User[],
  messages: FullMessageType[],
}
