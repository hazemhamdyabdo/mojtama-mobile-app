import { deleteVisitor, updateVisitor } from "@/features/visitors/api";
import DeleteVisitorBottomSheet, {
  type DeleteVisitorBottomSheetRef,
} from "@/features/visitors/components/DeleteVisitorBottomSheet";
import VisitorForm from "@/features/visitors/components/VisitorForm";
import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";
import VisitorFormHeader from "@/features/visitors/components/VisitorFormHeader";
import type { VisitorFormValues } from "@/features/visitors/schemas/visitorSchema";
import type { Visitor } from "@/features/visitors/types";
import { useRouter, type Href } from "expo-router";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

type EditVisitorScreenProps = {
  visitor: Visitor;
};

export default function EditVisitorScreen({ visitor }: EditVisitorScreenProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const deleteSheetRef = useRef<DeleteVisitorBottomSheetRef>(null);

  const handleSubmit = async (values: VisitorFormValues) => {
    await updateVisitor(visitor.id, values);
    router.back();
  };

  const handleConfirmDelete = async () => {
    await deleteVisitor(visitor.id);
    router.dismissTo("/visitors" as Href);
  };

  return (
    <ScreenSafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <View className="flex-1 px-4 pt-4">
        <VisitorFormHeader title={t("visitors.edit.title")} />
        <VisitorForm
          defaultValues={{
            name: visitor.name,
            building: visitor.building,
            unit: visitor.unit,
            gate: visitor.gate,
            parkingSpot: visitor.parkingSpot,
            purpose: visitor.purpose,
            date: visitor.date,
            time: visitor.time,
            phone: visitor.phone,
            email: visitor.email ?? "",
          }}
          submitLabel={t("visitors.form.submit.update")}
          onSubmit={handleSubmit}
          onDelete={() => deleteSheetRef.current?.open()}
        />
      </View>

      <DeleteVisitorBottomSheet
        ref={deleteSheetRef}
        onConfirmDelete={handleConfirmDelete}
      />
    </ScreenSafeAreaView>
  );
}
