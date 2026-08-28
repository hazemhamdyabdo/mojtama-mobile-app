import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";
import { colors } from "@/theme/colors";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Tabs } from "expo-router";
import { View, type ColorValue } from "react-native";

const ACTIVE_COLOR = colors.primary;
const INACTIVE_COLOR = colors.secText;

type TabIconName = React.ComponentProps<typeof MaterialDesignIcons>["name"];

type TabBarIconProps = {
  name: TabIconName;
  color: ColorValue;
  size: number;
  focused: boolean;
};

function TabBarIcon({ name, color, size, focused }: TabBarIconProps) {
  return (
    <View
      style={{
        backgroundColor: focused ? colors.primary50 : "transparent",
        width: 50,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
      }}
    >
      <MaterialDesignIcons name={name} color={color} size={size} />
    </View>
  );
}

export default function TabsLayout() {
  return (
    <ScreenSafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: ACTIVE_COLOR,
          tabBarInactiveTintColor: INACTIVE_COLOR,
          tabBarStyle: {
            backgroundColor: colors.white,
            borderTopWidth: 1,
            borderTopColor: colors.cardBorder,
            height: 122,
            paddingTop: 20,
            paddingBottom: 8,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "500",
            marginTop: 2,
          },
          tabBarIconStyle: {
            marginBottom: 0,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size, focused }) => (
              <TabBarIcon
                name="home-outline"
                color={color}
                size={size ?? 24}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="service"
          options={{
            title: "Service",
            tabBarIcon: ({ color, size, focused }) => (
              <TabBarIcon
                name="account-group-outline"
                color={color}
                size={size ?? 24}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="more"
          options={{
            title: "More",
            tabBarIcon: ({ color, size, focused }) => (
              <TabBarIcon
                name="view-grid-outline"
                color={color}
                size={size ?? 24}
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </ScreenSafeAreaView>
  );
}
