import type { ReactNode } from "react";
import { Pressable, View, type ViewProps } from "react-native";

type PostCardShellProps = ViewProps & {
  onPress?: () => void;
  children: ReactNode;
};

export default function PostCardShell({
  onPress,
  children,
  ...props
}: PostCardShellProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      className="rounded-2xl border border-card-border bg-white p-4 active:opacity-[0.96]"
      {...props}
    >
      {children}
    </Pressable>
  );
}
