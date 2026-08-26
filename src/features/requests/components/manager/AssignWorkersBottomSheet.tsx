import { DUMMY_WORKERS } from "@/features/requests/constants/dummy";
import type { Worker } from "@/features/requests/types";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Image } from "expo-image";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
} from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type AssignWorkersBottomSheetRef = {
  open: (assignedWorkerIds: string[]) => void;
  close: () => void;
};

type AssignWorkersBottomSheetProps = {
  onAssign: (workerIds: string[]) => void;
};

const AssignWorkersBottomSheet = forwardRef<
  AssignWorkersBottomSheetRef,
  AssignWorkersBottomSheetProps
>(function AssignWorkersBottomSheet({ onAssign }, ref) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [assignedWorkerIds, setAssignedWorkerIds] = useState<string[]>([]);

  useImperativeHandle(ref, () => ({
    open: (currentAssignedIds) => {
      setAssignedWorkerIds(currentAssignedIds);
      setSearchQuery("");
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

  const filteredWorkers = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return DUMMY_WORKERS;
    }

    return DUMMY_WORKERS.filter(
      (worker) =>
        worker.name.toLowerCase().includes(normalizedQuery) ||
        worker.role.toLowerCase().includes(normalizedQuery),
    );
  }, [searchQuery]);

  const toggleWorker = (workerId: string) => {
    setAssignedWorkerIds((current) =>
      current.includes(workerId)
        ? current.filter((id) => id !== workerId)
        : [...current, workerId],
    );
  };

  const handleDone = () => {
    onAssign(assignedWorkerIds);
    bottomSheetRef.current?.dismiss();
  };

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={["75%"]}
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
        style={{
          flex: 1,
          paddingHorizontal: 16,
          paddingBottom: insets.bottom + 16,
        }}
      >
        <Text className="mb-4 text-center text-base font-bold text-[#1F1F1F]">
          Assign workers
        </Text>

        <View className="relative mb-4">
          <View pointerEvents="none" className="absolute top-3.5 left-4 z-10">
            <MaterialDesignIcons name="magnify" color="#90A1B9" size={20} />
          </View>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="assign workers by name or email"
            placeholderTextColor="#90A1B9"
            className="rounded-full border border-[#E4E4E7] bg-white py-3.5 pl-11 pr-4 text-base text-[#1F1F1F]"
          />
        </View>

        <View className="gap-3">
          {filteredWorkers.map((worker) => (
            <WorkerRow
              key={worker.id}
              worker={worker}
              isAssigned={assignedWorkerIds.includes(worker.id)}
              onToggle={() => toggleWorker(worker.id)}
            />
          ))}
        </View>

        <Pressable
          onPress={handleDone}
          accessibilityRole="button"
          className="mt-4 items-center rounded-2xl bg-[#7B61FF] py-4 active:opacity-[0.92]"
        >
          <Text className="text-base font-bold text-white">Done</Text>
        </Pressable>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

type WorkerRowProps = {
  worker: Worker;
  isAssigned: boolean;
  onToggle: () => void;
};

function WorkerRow({ worker, isAssigned, onToggle }: WorkerRowProps) {
  return (
    <View className="flex-row items-center gap-3 rounded-2xl  bg-white p-3">
      {worker.avatar ? (
        <Image
          source={worker.avatar}
          contentFit="cover"
          style={{ width: 40, height: 40, borderRadius: 100 }}
        />
      ) : (
        <View className="size-10 items-center justify-center rounded-full bg-[#F0EDFF]">
          <Text className="text-sm font-semibold text-[#7B61FF]">
            {worker.initials ?? worker.name.charAt(0)}
          </Text>
        </View>
      )}

      <View className="flex-1">
        <Text className="text-sm font-semibold text-[#1F1F1F]">
          {worker.name}
        </Text>
        <Text className="text-xs text-[#90A1B9]">{worker.role}</Text>
      </View>

      <Pressable
        onPress={onToggle}
        accessibilityRole="button"
        accessibilityState={{ selected: isAssigned }}
        className={`rounded-xl px-4 py-2 active:opacity-[0.92] ${
          isAssigned ? "bg-[#EDE9FF]" : "bg-[#7B61FF]"
        }`}
      >
        <Text
          className={`text-sm font-semibold ${
            isAssigned ? "text-[#7B61FF]" : "text-white"
          }`}
        >
          {isAssigned ? "Assigned" : "Assign"}
        </Text>
      </Pressable>
    </View>
  );
}

export default AssignWorkersBottomSheet;
