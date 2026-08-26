import type { Visitor } from "@/features/visitors/types";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
  type ComponentProps,
} from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type VisitorQrBottomSheetRef = {
  open: (visitor: Visitor) => void;
  close: () => void;
};

type VisitorQrBottomSheetProps = {
  onDownload?: (visitorId: string) => void;
};

const VisitorQrBottomSheet = forwardRef<
  VisitorQrBottomSheetRef,
  VisitorQrBottomSheetProps
>(function VisitorQrBottomSheet({ onDownload }, ref) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const insets = useSafeAreaInsets();
  const [visitor, setVisitor] = useState<Visitor | null>(null);

  useImperativeHandle(ref, () => ({
    open: (nextVisitor) => {
      setVisitor(nextVisitor);
      bottomSheetRef.current?.present();
    },
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
          QR Code
        </Text>

        <View className="items-center">
          <View className="size-14 items-center justify-center rounded-full bg-[#7B61FF]">
            <MaterialDesignIcons name="qrcode" color="#FFFFFF" size={28} />
          </View>

          <View className="mt-5 items-center justify-center">
            <MaterialDesignIcons name="qrcode" color="#1F1F1F" size={180} />
          </View>

          <Text className="mt-4 text-sm text-[#90A1B9]">Access Code</Text>
          <Text className="mt-1 text-3xl font-bold text-[#1F1F1F]">
            {visitor?.accessCode ?? "—"}
          </Text>
        </View>

        <View className="mt-5 border-t border-[#E4E4E7] pt-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-sm text-[#90A1B9]">Visitor name</Text>
            <Text className="text-sm font-semibold text-[#1F1F1F]">
              {visitor?.name ?? "—"}
            </Text>
          </View>
          <View className="mt-2 flex-row items-center justify-between">
            <Text className="text-sm text-[#90A1B9]">Expiry date</Text>
            <Text className="text-sm font-semibold text-[#1F1F1F]">
              {visitor?.expiryDate ?? "—"}
            </Text>
          </View>
        </View>

        <Pressable
          onPress={() => {
            if (visitor) {
              onDownload?.(visitor.id);
            }
          }}
          accessibilityRole="button"
          className="mt-5 flex-row items-center justify-center gap-2 rounded-2xl border border-[#7B61FF] bg-white py-4 active:opacity-[0.92]"
        >
          <MaterialDesignIcons
            name="download-outline"
            color="#7B61FF"
            size={20}
          />
          <Text className="text-base font-bold text-[#7B61FF]">Download</Text>
        </Pressable>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default VisitorQrBottomSheet;
