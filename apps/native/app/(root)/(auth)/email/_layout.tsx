import { useNavigationOptions } from "@/hooks/useNavigationOptions";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link, Stack } from "expo-router";
import { Button, useTheme } from "heroui-native";
import { View } from "react-native";

export default function EmailLayout() {
  // const { colors } = useTheme();
  const { modal } = useNavigationOptions();

  // use navigation
  return (
    <Stack
      screenOptions={{
        gestureEnabled: false,
        ...modal,
      }}
    >
      <Stack.Screen
        name="signin"
        options={{
          title: "",
          headerLeft: CloseButton,
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="(reset)/request-password-reset"
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="(reset)/reset-password"
        options={{
          title: "",
        }}
      />
    </Stack>
  );
}
/* ------------------------------ close button ------------------------------ */

const CloseButton = () => {
  const { colors } = useTheme();
  return (
    <View className="flex w-full flex-1">
      <Link href=".." asChild>
        <Button size="sm" isIconOnly className="rounded-full" variant="outline">
          <Button.Label>
            <AntDesign name="close" size={16} color={colors.foreground} />
          </Button.Label>
        </Button>
      </Link>
    </View>
  );
};
