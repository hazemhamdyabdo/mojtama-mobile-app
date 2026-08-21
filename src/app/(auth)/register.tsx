import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type RegisterRole = "resident" | "manager";

function isRegisterRole(value: string | string[] | undefined): value is RegisterRole {
  return value === "resident" || value === "manager";
}

export default function Register() {
  const { role } = useLocalSearchParams<{ role?: string }>();
  const selectedRole = isRegisterRole(role) ? role : null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        {selectedRole ? (
          <Text style={styles.subtitle}>
            Continue as {selectedRole === "resident" ? "Resident" : "Manager"}
          </Text>
        ) : (
          <Text style={styles.subtitle}>Choose a role to continue</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F1F1F",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: "#5C5C5C",
  },
});
