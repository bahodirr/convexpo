import { api, useQuery } from "@polytalk/backend";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { authClient } from "@/lib/betterAuth/client";
import { UI_COLORS } from "@/lib/constants";
const themeColors = UI_COLORS;

export default function SettingsRoute() {
	const [isDeletingUser, setIsDeletingUser] = useState(false);
	const userData = useQuery(api.user.fetchUserAndProfile);

	if (!userData?.profile || !userData.userMetadata) return null;

	// delete user
	const handleDeleteUser = async () => {
		const { error, data } = await authClient.deleteUser(
			{},
			{
				onRequest: () => {
					setIsDeletingUser(true);
				},
				onSuccess: () => {
					console.log("User deleted successfully");
					setIsDeletingUser(false);
					// The auth system will automatically handle the redirect
				},
				onError: (ctx) => {
					setIsDeletingUser(false);
					console.error(ctx.error);
					Alert.alert("Error", ctx.error.message || "Failed to delete user");
				},
			},
		);

		console.log(data, error);
	};

	return (
		<View style={styles.container}>
			<ScrollView
				contentInsetAdjustmentBehavior="always"
				contentContainerStyle={styles.scrollContent}
			>
				<View style={styles.userSection}>
					<Text style={[styles.primaryText, { color: themeColors.mutedForeground }]}>
						{userData.profile.name}
					</Text>
					<Text style={[styles.primaryText, { color: themeColors.mutedForeground }]}>
						{userData.userMetadata.email}
					</Text>
					<Text style={[styles.primaryText, { color: themeColors.mutedForeground }]}>
						created {new Date(userData.userMetadata.createdAt).toDateString()}
					</Text>
				</View>
				<View style={styles.actions}>
					<Pressable
						style={({ pressed }) => [
							styles.actionButton,
							{ backgroundColor: themeColors.background, borderColor: themeColors.border },
							isDeletingUser && styles.disabledButton,
							pressed && styles.pressedButton,
						]}
						disabled={isDeletingUser}
						onPress={async () => {
							Alert.alert(
								"Delete User",
								"Are you sure you want to delete your account?",
								[
									{
										text: "Cancel",
										style: "cancel",
									},
									{
										text: "Delete",
										onPress: async () => {
											await handleDeleteUser();
										},
									},
								],
							);
						}}
					>
						<Ionicons name="trash-outline" size={18} color={themeColors.foreground} />
						<Text style={[styles.actionLabel, { color: themeColors.foreground }]}>
							{isDeletingUser ? "Deleting..." : "Delete User"}
						</Text>
					</Pressable>
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollContent: {
		paddingHorizontal: 24,
		paddingVertical: 8,
		gap: 16,
		minHeight: "100%",
	},
	userSection: {
		gap: 8,
	},
	primaryText: {
		fontSize: 18,
	},
	actions: {
		gap: 16,
		alignItems: "flex-start",
	},
	actionButton: {
		borderWidth: 1,
		borderRadius: 9999,
		paddingVertical: 8,
		paddingHorizontal: 12,
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	actionLabel: {
		fontSize: 14,
		fontWeight: "600",
	},
	disabledButton: {
		opacity: 0.6,
	},
	pressedButton: {
		opacity: 0.85,
	},
});
