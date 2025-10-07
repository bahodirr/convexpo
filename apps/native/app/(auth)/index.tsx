import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAppleAuth, useGoogleAuth } from "@/lib/betterAuth/oauth";
import { UI_COLORS } from "@/lib/constants";
import { ScreenScrollView } from "@/components/screen-scroll-view";

export default function Landing() {
  const { signIn: signInWithGoogle, isLoading: isGoogleLoading } =
    useGoogleAuth();
  const { signIn: signInWithApple, isLoading: isAppleLoading } = useAppleAuth();

  const isBusy = isGoogleLoading || isAppleLoading;
  return (
    <ScreenScrollView
      contentContainerStyle={styles.container}
      bounces
      alwaysBounceVertical
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: UI_COLORS.foreground }]}>
          Convexpo
        </Text>
        <Text style={[styles.subtitle, { color: UI_COLORS.mutedForeground }]}>
          Convex + Better Auth + Expo + Heroui = 🚀
        </Text>
      </View>
      <View>
        <View style={styles.buttonRow}>
          <Pressable
            style={({ pressed }) => [
              styles.oauthButton,
              {
                backgroundColor: UI_COLORS.background,
                borderColor: UI_COLORS.border,
              },
              isBusy && styles.disabledButton,
              pressed && styles.pressedButton,
            ]}
            onPress={signInWithGoogle}
            disabled={isBusy}
          >
            <Ionicons
              name="logo-google"
              size={20}
              color={UI_COLORS.foreground}
              style={styles.oauthIcon}
            />
            <Text style={[styles.buttonLabel, { color: UI_COLORS.foreground }]}>
              Google
            </Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.oauthButton,
              styles.oauthButtonSpacing,
              {
                backgroundColor: UI_COLORS.background,
                borderColor: UI_COLORS.border,
              },
              isBusy && styles.disabledButton,
              pressed && styles.pressedButton,
            ]}
            onPress={signInWithApple}
            disabled={isBusy}
          >
            <Ionicons
              name="logo-apple"
              size={20}
              color={UI_COLORS.foreground}
              style={styles.oauthIcon}
            />
            <Text style={[styles.buttonLabel, { color: UI_COLORS.foreground }]}>
              Apple
            </Text>
          </Pressable>
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.emailButton,
            { backgroundColor: UI_COLORS.foreground },
            pressed && styles.pressedButton,
          ]}
					onPress={() => router.push("/(auth)/email/signin")}
        >
          <Text
            style={[styles.emailButtonLabel, { color: UI_COLORS.background }]}
          >
            Email
          </Text>
        </Pressable>
      </View>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 32,
    paddingVertical: 32,
    justifyContent: "flex-end",
  },
  header: {
    justifyContent: "flex-end",
    marginBottom: 24,
  },
  title: {
    fontSize: 56,
    fontWeight: "800",
  },
  subtitle: {
    fontSize: 20,
    marginTop: 12,
    lineHeight: 28,
  },
  buttonRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  oauthButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 9999,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  oauthButtonSpacing: {
    marginLeft: 16,
  },
  oauthIcon: {
    marginRight: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  disabledButton: {
    opacity: 0.6,
  },
  pressedButton: {
    opacity: 0.85,
  },
  emailButton: {
    borderRadius: 9999,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  emailButtonLabel: {
    fontSize: 18,
    fontWeight: "600",
  },
});
