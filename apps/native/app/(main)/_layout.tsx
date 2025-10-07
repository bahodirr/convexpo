import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text } from "react-native";
import { authClient } from "@/lib/betterAuth/client";
import { UI_COLORS } from "@/lib/constants";
const themeColors = UI_COLORS;

export default function MainLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: "Informational",
					headerTitle: "Informational",
					headerLargeTitle: true,
					headerBackTitle: "Home",
					headerRight: () => <SettingsButton />,
				}}
			/>
			<Stack.Screen
				name="settings"
				options={{
					title: "Settings",
					headerBackButtonDisplayMode: "generic",
					headerLargeTitle: true,
					headerRight: () => <SignOutButton />,
				}}
			/>
		</Stack>
	);
}

const SettingsButton = () => {
	const router = useRouter();

	return (
		<Pressable
			style={({ pressed }) => [
				styles.iconButton,
				{ backgroundColor: themeColors.background, borderColor: themeColors.border },
				pressed && styles.pressedButton,
			]}
			onPress={() => {
				router.navigate("/settings");
			}}
		>
			<Ionicons name="settings-outline" size={18} color={themeColors.foreground} />
		</Pressable>
	);
};

const SignOutButton = () => {
	const [isSigningOut, setIsSigningOut] = useState(false);

	const handleSignOut = async () => {
		const { error, data } = await authClient.signOut(
			{},
			{
				onRequest: () => {
					setIsSigningOut(true);
				},
				onSuccess: () => {
					setIsSigningOut(false);
					console.log("Sign out successful");
				},
				onError: (ctx) => {
					console.error(ctx.error);
					Alert.alert("Error", ctx.error.message || "Failed to sign out");
					setIsSigningOut(false);
				},
			},
		);

		console.log(data, error);
	};

	return (
		<Pressable
			style={({ pressed }) => [
				styles.signOutButton,
				{ backgroundColor: themeColors.background, borderColor: themeColors.border },
				isSigningOut && styles.disabledButton,
				pressed && styles.pressedButton,
			]}
			disabled={isSigningOut}
			onPress={() => {
				Alert.alert("Sign Out", "Are you sure you want to sign out?", [
					{
						text: "Cancel",
						style: "cancel",
					},
					{
						text: "Sign Out",
						onPress: async () => {
							await handleSignOut();
						},
					},
				]);
			}}
		>
			<Text style={[styles.signOutText, { color: themeColors.foreground }]}>Sign Out</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	iconButton: {
		justifyContent: "center",
		borderRadius: 9999,
		padding: 10,
	},
	pressedButton: {
		opacity: 0.85,
	},
	signOutButton: {
		justifyContent: "center",
		borderRadius: 9999,
		paddingHorizontal: 12,
	paddingVertical: 8,
	},
	disabledButton: {
		opacity: 0.6,
	},
	signOutText: {
		fontSize: 16,
		fontWeight: "600",
	},
});
