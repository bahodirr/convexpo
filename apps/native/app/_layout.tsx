import { useConvexAuth } from "convex/react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ConvexProvider from "@/providers/ConvexProvider";
import SplashScreenProvider from "@/providers/SplashScreenProvider";

/* ------------------------------- root layout ------------------------------ */
export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ConvexProvider>
        <SplashScreenProvider>
          <RouterStack />
        </SplashScreenProvider>
      </ConvexProvider>
    </GestureHandlerRootView>
  );
}

function RouterStack() {
  const { isAuthenticated } = useConvexAuth();
  return (
    <Stack>
      {/* AUTH STACK */}
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />
      </Stack.Protected>
      {/* AUTHENTICATED NESTED STACK */}
      <Stack.Protected guard={isAuthenticated}>
        {/* MAIN STACK*/}
        <Stack.Screen
          name="(main)"
          options={{
            title: "",
            headerShown: false,
          }}
        />
      </Stack.Protected>
    </Stack>
  );
}
