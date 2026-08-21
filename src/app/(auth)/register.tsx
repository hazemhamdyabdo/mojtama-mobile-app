import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type RegisterRole = "resident" | "manager";

function isRegisterRole(
  value: string | string[] | undefined,
): value is RegisterRole {
  return value === "resident" || value === "manager";
}

export default function Register() {
  const { t } = useTranslation();
  const { role } = useLocalSearchParams<{ role?: string }>();
  const selectedRole = isRegisterRole(role) ? role : null;

  const roleLabel =
    selectedRole === "resident"
      ? t("auth.roles.residentLabel")
      : t("auth.roles.managerLabel");

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-[28px] font-bold text-[#1F1F1F]">
          {t("auth.register")}
        </Text>
        {selectedRole ? (
          <Text className="mt-2 text-base text-[#5C5C5C]">
            {t("auth.continueAs", { role: roleLabel })}
          </Text>
        ) : (
          <Text className="mt-2 text-base text-[#5C5C5C]">
            {t("auth.chooseRole")}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}
