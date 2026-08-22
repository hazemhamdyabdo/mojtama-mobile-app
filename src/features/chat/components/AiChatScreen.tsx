import {
  AI_SUGGESTIONS,
  SERVICE_ADDED_DETAILS,
  WELCOME_MESSAGE,
} from "@/features/chat/constants/suggestions";
import type { ChatMessage, SuggestionAction } from "@/features/chat/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { styled } from "nativewind";
import { useCallback, useRef, useState } from "react";
import {
  FlatList,
  I18nManager,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView as SafeAreaViewType } from "react-native-safe-area-context";

const SafeAreaView = styled(SafeAreaViewType);

const aiAvatar = require("@/assets/images/auth/mojtama-logo.png");

function formatTime(date = new Date()) {
  return date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

function createInitialMessages(): ChatMessage[] {
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

type AiAvatarProps = {
  size?: number;
};

function AiAvatar({ size = 36 }: AiAvatarProps) {
  return (
    <View
      className="items-center justify-center rounded-full bg-[#F0EDFF]"
      style={{ width: size, height: size }}
    >
      <Image
        source={aiAvatar}
        contentFit="contain"
        style={{
          width: size * 0.55,
          height: size * 0.55,
          tintColor: "#7B61FF",
        }}
      />
    </View>
  );
}

type DateSeparatorProps = {
  label: string;
};

function DateSeparator({ label }: DateSeparatorProps) {
  return (
    <View className="my-4 items-center">
      <View className="rounded-full bg-[#F1F5F9] px-4 py-1">
        <Text className="text-xs font-medium text-[#64748B]">{label}</Text>
      </View>
    </View>
  );
}

type AiTextBubbleProps = {
  text: string;
  time: string;
};

function AiTextBubble({ text, time }: AiTextBubbleProps) {
  return (
    <View className="mb-4 max-w-[88%] flex-row items-start gap-2 self-start">
      <AiAvatar size={32} />
      <View className="flex-1 rounded-2xl rounded-bl-md border border-[#E4E4E7] bg-white px-4 py-3">
        <Text className="text-sm leading-5 text-[#1F1F1F]">{text}</Text>
        <Text className="mt-2 self-end text-xs text-[#90A1B9]">{time}</Text>
      </View>
    </View>
  );
}

type UserTextBubbleProps = {
  text: string;
  time: string;
};

function UserTextBubble({ text, time }: UserTextBubbleProps) {
  return (
    <View className="mb-4 max-w-[88%] self-end rounded-2xl rounded-br-md bg-[#F0EDFF] px-4 py-3">
      <Text className="text-sm leading-5 text-[#1F1F1F]">{text}</Text>
      <View className="mt-2 flex-row items-center justify-end gap-1">
        <Text className="text-xs text-[#90A1B9]">{time}</Text>
        <MaterialDesignIcons name="check-all" color="#7B61FF" size={14} />
      </View>
    </View>
  );
}

type UserAttachmentBubbleProps = {
  uri: string;
  fileName?: string;
  time: string;
};

function UserAttachmentBubble({
  uri,
  fileName,
  time,
}: UserAttachmentBubbleProps) {
  return (
    <View className="mb-4 max-w-[72%] self-end overflow-hidden rounded-2xl rounded-br-md bg-[#F0EDFF]">
      <Image
        source={{ uri }}
        contentFit="cover"
        style={{ width: "auto", height: 180 }}
      />
      {fileName ? (
        <Text numberOfLines={1} className="px-3 py-2 text-xs text-[#64748B]">
          {fileName}
        </Text>
      ) : null}
      <View className="flex-row items-center justify-end gap-1 px-3 pb-2">
        <Text className="text-xs text-[#90A1B9]">{time}</Text>
        <MaterialDesignIcons name="check-all" color="#7B61FF" size={14} />
      </View>
    </View>
  );
}

type ServiceAddedCardProps = {
  serviceName: string;
  time: string;
};

function ServiceAddedCard({ serviceName, time }: ServiceAddedCardProps) {
  return (
    <View className="mb-4 max-w-[92%] flex-row items-start gap-2 self-start">
      <AiAvatar size={32} />
      <View className="flex-1 rounded-2xl rounded-bl-md border border-[#E4E4E7] bg-white px-4 py-3">
        <View className="flex-row items-center gap-2">
          <Text className="flex-1 text-sm font-semibold text-[#1F1F1F]">
            Service Added Successfully
          </Text>
          <View className="size-6 items-center justify-center rounded-full bg-[#7B61FF]">
            <MaterialDesignIcons name="check-bold" color="#FFFFFF" size={14} />
          </View>
        </View>

        <Text className="mt-2 text-sm leading-5 text-[#64748B]">
          {serviceName} has been add to your service.
        </Text>

        <View className="my-3 h-px bg-[#E4E4E7]" />

        <View className="gap-1.5">
          <Text className="text-sm text-[#64748B]">
            Price: {SERVICE_ADDED_DETAILS.price}
          </Text>
          <Text className="text-sm text-[#64748B]">
            Duration: {SERVICE_ADDED_DETAILS.duration}
          </Text>
          <Text className="text-sm text-[#64748B]">
            Added on: {SERVICE_ADDED_DETAILS.addedOn}
          </Text>
        </View>

        <Text className="mt-2 self-end text-xs text-[#90A1B9]">{time}</Text>
      </View>
    </View>
  );
}

type SuggestionsSectionProps = {
  onSelect: (suggestion: SuggestionAction) => void;
};

function SuggestionsSection({ onSelect }: SuggestionsSectionProps) {
  return (
    <View className="mt-2">
      <View className="mb-4 flex-row items-center gap-3">
        <View className="h-px flex-1 bg-[#E4E4E7]" />
        <View className="flex-row items-center gap-1.5">
          <MaterialDesignIcons name="creation" color="#7B61FF" size={16} />
          <Text className="text-xs text-[#90A1B9]">
            Here are some things i can help you with
          </Text>
        </View>
        <View className="h-px flex-1 bg-[#E4E4E7]" />
      </View>

      <View className="gap-3">
        {AI_SUGGESTIONS.map((suggestion) => (
          <Pressable
            key={suggestion.id}
            onPress={() => onSelect(suggestion)}
            accessibilityRole="button"
            className="flex-row items-center gap-3 rounded-2xl border border-[#E4E4E7] bg-white px-4 py-3.5 active:opacity-[0.92]"
          >
            <View className="size-10 items-center justify-center rounded-full bg-[#F0EDFF]">
              <MaterialDesignIcons
                name={suggestion.icon}
                color="#7B61FF"
                size={20}
              />
            </View>
            <Text className="flex-1 text-sm font-medium text-[#1F1F1F]">
              {suggestion.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

type ChatInputBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  onAttach: () => void;
};

function ChatInputBar({
  value,
  onChangeText,
  onSend,
  onAttach,
}: ChatInputBarProps) {
  const textAlign = I18nManager.isRTL ? "right" : "left";
  const canSend = value.trim().length > 0;

  return (
    <View className=" bg-white px-4 py-3">
      <View className="flex-row items-center gap-2">
        <View className="flex-1 flex-row items-center rounded-full border border-[#E4E4E7] bg-white px-4">
          <Pressable
            onPress={onAttach}
            accessibilityRole="button"
            accessibilityLabel="Attach file"
            hitSlop={8}
            className="active:opacity-[0.92]"
          >
            <MaterialDesignIcons name="paperclip" color="#90A1B9" size={20} />
          </Pressable>
          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder="Type a message..."
            placeholderTextColor="#90A1B9"
            returnKeyType="send"
            onSubmitEditing={onSend}
            style={{
              flex: 1,
              textAlign,
              minHeight: 44,
              paddingVertical: 10,
              paddingHorizontal: 10,
              fontSize: 15,
              color: "#1F1F1F",
            }}
          />
        </View>

        <Pressable
          onPress={onSend}
          disabled={!canSend}
          accessibilityRole="button"
          accessibilityLabel="Send message"
          className="size-11 items-center justify-center rounded-full bg-[#7B61FF] active:opacity-[0.92] disabled:opacity-50"
        >
          <MaterialDesignIcons name="send" color="#FFFFFF" size={20} />
        </Pressable>
      </View>
    </View>
  );
}

function renderMessage(message: ChatMessage) {
  switch (message.type) {
    case "date":
      return <DateSeparator key={message.id} label={message.label} />;
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
      const _exhaustive: never = message;
      return _exhaustive;
    }
  }
}

export default function AiChatScreen() {
  const router = useRouter();
  const listRef = useRef<FlatList<ChatMessage>>(null);
  const messageIdRef = useRef(0);
  const [messages, setMessages] = useState<ChatMessage[]>(
    createInitialMessages,
  );
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);

  const nextMessageId = useCallback((prefix: string) => {
    messageIdRef.current += 1;
    return `${prefix}-${messageIdRef.current}`;
  }, []);

  const scrollToEnd = useCallback(() => {
    requestAnimationFrame(() => {
      listRef.current?.scrollToEnd({ animated: true });
    });
  }, []);

  const appendAssistantReply = useCallback(
    (suggestion: SuggestionAction, userText: string) => {
      const time = formatTime();
      const userMessage: ChatMessage = {
        id: nextMessageId("user"),
        type: "user-text",
        text: userText,
        time,
      };

      const replyMessages: ChatMessage[] = [userMessage];

      if (suggestion.responseType === "service-added") {
        replyMessages.push({
          id: nextMessageId("service"),
          type: "service-added",
          serviceName: "Personal training",
          time,
          details: { ...SERVICE_ADDED_DETAILS },
        });
      } else if (suggestion.responseText) {
        replyMessages.push({
          id: nextMessageId("ai"),
          type: "ai-text",
          text: suggestion.responseText,
          time,
        });
      }

      setMessages((current) => [...current, ...replyMessages]);
      setShowSuggestions(false);
      scrollToEnd();
    },
    [nextMessageId, scrollToEnd],
  );

  const handleSuggestionPress = useCallback(
    (suggestion: SuggestionAction) => {
      appendAssistantReply(suggestion, suggestion.label);
    },
    [appendAssistantReply],
  );

  const handleSend = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) {
      return;
    }

    const matchedSuggestion = AI_SUGGESTIONS.find(
      (suggestion) => suggestion.label.toLowerCase() === trimmed.toLowerCase(),
    );

    if (matchedSuggestion) {
      appendAssistantReply(matchedSuggestion, trimmed);
      setInput("");
      return;
    }

    const time = formatTime();
    setMessages((current) => [
      ...current,
      {
        id: nextMessageId("user"),
        type: "user-text",
        text: trimmed,
        time,
      },
      {
        id: nextMessageId("ai"),
        type: "ai-text",
        text: "Thanks for your message. I'm here to help with services, announcements, polls, and meetings.",
        time,
      },
    ]);
    setShowSuggestions(false);
    setInput("");
    scrollToEnd();
  }, [appendAssistantReply, input, nextMessageId, scrollToEnd]);

  const handleAttach = useCallback(async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 0.8,
    });

    if (result.canceled || !result.assets[0]) {
      return;
    }

    const asset = result.assets[0];
    const time = formatTime();

    setMessages((current) => [
      ...current,
      {
        id: nextMessageId("attachment"),
        type: "user-attachment",
        uri: asset.uri,
        fileName: asset.fileName ?? undefined,
        time,
      },
      {
        id: nextMessageId("ai"),
        type: "ai-text",
        text: "Thanks, I received your attachment. How would you like me to use it?",
        time,
      },
    ]);
    setShowSuggestions(false);
    scrollToEnd();
  }, [nextMessageId, scrollToEnd]);

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]" edges={["top", "bottom"]}>
      <View className="flex-row items-center gap-3  bg-white px-4 py-3">
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          className="active:opacity-[0.92]"
        >
          <View className="size-10 items-center justify-center rounded-full bg-[#F0EDFF]">
            <MaterialDesignIcons
              name="chevron-left"
              color="#7B61FF"
              size={24}
            />
          </View>
        </Pressable>

        <AiAvatar size={40} />

        <View className="flex-1">
          <Text className="text-base font-bold text-[#1F1F1F]">
            AI Assistant
          </Text>
          <View className="mt-0.5 flex-row items-center gap-1.5">
            <View className="size-2 rounded-full bg-[#22C55E]" />
            <Text className="text-xs font-medium text-[#22C55E]">Online</Text>
          </View>
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={100}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => renderMessage(item)}
          contentContainerClassName="px-4 pb-4 pt-2"
          showsVerticalScrollIndicator={false}
          onContentSizeChange={scrollToEnd}
          ListFooterComponent={
            showSuggestions ? (
              <SuggestionsSection onSelect={handleSuggestionPress} />
            ) : null
          }
        />

        <ChatInputBar
          value={input}
          onChangeText={setInput}
          onSend={handleSend}
          onAttach={() => void handleAttach()}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
