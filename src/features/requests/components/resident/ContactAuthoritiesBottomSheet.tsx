import { AUTHORITY_CONTACTS } from "@/features/requests/constants/authorities";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import * as Linking from "expo-linking";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  type ComponentProps,
} from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type ContactAuthoritiesBottomSheetRef = {
  open: () => void;
  close: () => void;
};

const ContactAuthoritiesBottomSheet = forwardRef<ContactAuthoritiesBottomSheetRef>(
  function ContactAuthoritiesBottomSheet(_props, ref) {
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const insets = useSafeAreaInsets();

    useImperativeHandle(ref, () => ({
      open: () => bottomSheetRef.current?.present(),
      close: () => bottomSheetRef.current?.dismiss(),
    }));

    const renderBackdrop = useCallback(
      (props: ComponentProps<typeof BottomSheetBackdrop>) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          pressBehavior="close"
        />
      ),
      [],
    );

    const handleCall = async (phone: string) => {
      try {
        await Linking.openURL(`tel:${phone}`);
      } catch (error) {
        console.warn("Failed to open phone dialer", error);
      }
    };

    return (
      <BottomSheetModal
        ref={bottomSheetRef}
        enableDynamicSizing
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{ backgroundColor: "#1F1F1F", width: 48 }}
        backgroundStyle={{
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          backgroundColor: "#FFFFFF",
        }}
      >
        <BottomSheetView
          style={{ paddingHorizontal: 16, paddingBottom: insets.bottom + 16 }}
        >
          <Text className="mb-4 text-center text-base font-bold text-[#1F1F1F]">
            Contact Authorities
          </Text>

          {AUTHORITY_CONTACTS.map((contact) => (
            <Pressable
              key={contact.id}
              onPress={() => void handleCall(contact.phone)}
              accessibilityRole="button"
              className="mb-2 flex-row items-center gap-3 rounded-2xl border border-[#E4E4E7] bg-white px-4 py-3.5 active:opacity-[0.92]"
            >
              <View
                className={`size-10 items-center justify-center rounded-full ${contact.iconBackground}`}
              >
                <MaterialDesignIcons
                  name={contact.icon}
                  color={contact.iconColor}
                  size={20}
                />
              </View>

              <View className="flex-1">
                <Text className="text-sm text-[#90A1B9]">{contact.label}</Text>
                <Text className="text-lg font-bold text-[#1F1F1F]">
                  {contact.phone}
                </Text>
              </View>
            </Pressable>
          ))}
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

export default ContactAuthoritiesBottomSheet;
