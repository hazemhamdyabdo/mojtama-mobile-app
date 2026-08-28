import AiTextBubble from "@/features/chat/components/AiTextBubble";
import ChatDateSeparator from "@/features/chat/components/ChatDateSeparator";
import ServiceAddedCard from "@/features/chat/components/ServiceAddedCard";
import UserAttachmentBubble from "@/features/chat/components/UserAttachmentBubble";
import UserTextBubble from "@/features/chat/components/UserTextBubble";
import { WELCOME_MESSAGE } from "@/features/chat/constants/suggestions";
import type { ChatMessage } from "@/features/chat/types";

export function formatChatTime(date = new Date()) {
  return date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function createInitialChatMessages(): ChatMessage[] {
  return [
    { id: "date-today", type: "date", label: "Today" },
    {
      id: "welcome",
      type: "ai-text",
      text: WELCOME_MESSAGE,
      time: "9:24 AM",
    },
  ];
}

export function renderChatMessage(message: ChatMessage) {
  switch (message.type) {
    case "date":
      return <ChatDateSeparator key={message.id} label={message.label} />;
    case "ai-text":
      return (
        <AiTextBubble
          key={message.id}
          text={message.text}
          time={message.time}
        />
      );
    case "user-text":
      return (
        <UserTextBubble
          key={message.id}
          text={message.text}
          time={message.time}
        />
      );
    case "user-attachment":
      return (
        <UserAttachmentBubble
          key={message.id}
          uri={message.uri}
          fileName={message.fileName}
          time={message.time}
        />
      );
    case "service-added":
      return (
        <ServiceAddedCard
          key={message.id}
          serviceName={message.serviceName}
          time={message.time}
        />
      );
    default: {
      const exhaustive: never = message;
      return exhaustive;
    }
  }
}
