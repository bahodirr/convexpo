import { useConvexAuth } from "convex/react";
import { Stack } from "expo-router";
import { Spinner } from "heroui-native";
import { useNavigationOptions } from "@/hooks/useNavigationOptions";

export const unstable_settings = {
  anchor: "(main)/index",
};

export default function RootLayout() {
  const { isAuthenticated } = useConvexAuth();
  const { root } = useNavigationOptions();
  /* --------------------------------- return --------------------------------- */
  return (
    <>
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <Spinner size="lg" />
        </View>
      ) : (
        <Stack>
          {/* AUTH STACK */}
          <Stack.Protected guard={!isAuthenticated}>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          </Stack.Protected>
          {/* AUTHENTICATED NESTED STACK */}
          <Stack.Protected guard={isAuthenticated}>
            {/* MAIN STACK*/}
            <Stack.Screen
              name="(main)"
              options={{
                title: "",
                headerShown: false,
                ...root,
              }}
            />
          </Stack.Protected>
        </Stack>
      )}
    </>
  );
}
