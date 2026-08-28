import AiAvatar from "@/features/chat/components/AiAvatar";
import ChatInputBar from "@/features/chat/components/ChatInputBar";
import ChatSuggestionsSection from "@/features/chat/components/ChatSuggestionsSection";
import {
  createInitialChatMessages,
  formatChatTime,
  renderChatMessage,
} from "@/features/chat/components/chatMessageUtils";
import {
  AI_SUGGESTIONS,
  SERVICE_ADDED_DETAILS,
} from "@/features/chat/constants/suggestions";
import type { ChatMessage, SuggestionAction } from "@/features/chat/types";
import { colors } from "@/theme/colors";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { styled } from "nativewind";
import { useCallback, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView as SafeAreaViewType } from "react-native-safe-area-context";

const SafeAreaView = styled(SafeAreaViewType);

export default function AiChatScreen() {
  const router = useRouter();
  const listRef = useRef<FlatList<ChatMessage>>(null);
  const messageIdRef = useRef(0);
  const [messages, setMessages] = useState<ChatMessage[]>(
    createInitialChatMessages,
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
      const time = formatChatTime();
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

    const time = formatChatTime();
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
    const time = formatChatTime();

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
    <SafeAreaView className="flex-1 bg-slate-50" edges={["top", "bottom"]}>
      <View className="flex-row items-center gap-3 bg-white px-4 py-3">
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          className="active:opacity-[0.92]"
        >
          <View className="size-10 items-center justify-center rounded-full bg-primary-50">
            <MaterialDesignIcons
              name="chevron-left"
              color={colors.primary}
              size={24}
            />
          </View>
        </Pressable>

        <AiAvatar size={40} />

        <View className="flex-1">
          <Text className="text-base font-bold text-heading">AI Assistant</Text>
          <View className="mt-0.5 flex-row items-center gap-1.5">
            <View className="size-2 rounded-full bg-approved-500" />
            <Text className="text-xs font-medium text-approved-500">Online</Text>
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
          renderItem={({ item }) => renderChatMessage(item)}
          contentContainerClassName="px-4 pb-4 pt-2"
          showsVerticalScrollIndicator={false}
          onContentSizeChange={scrollToEnd}
          ListFooterComponent={
            showSuggestions ? (
              <ChatSuggestionsSection onSelect={handleSuggestionPress} />
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
