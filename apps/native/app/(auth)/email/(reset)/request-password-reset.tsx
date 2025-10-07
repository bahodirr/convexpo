import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";
import { Alert } from "react-native";
import FormHeader, { FormContainer } from "@/components/form";
import { authClient } from "@/lib/betterAuth/client";
import { UI_COLORS } from "@/lib/constants";

const themeColors = UI_COLORS;

export default function RequestPasswordResetRoute() {
	const router = useRouter();
	/* ---------------------------------- state --------------------------------- */
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	/* ------------------------ handle request reset --------------------------- */
	const handleRequestReset = async () => {
		/**
		 * FEAT: Add your own form validation validation here
		 * i've been using tanstack form for react native with zod
		 *
		 * but this is just a base for you to get started
		 */
		if (!email.trim()) {
			Alert.alert("Error", "Please enter your email");
			return;
		}
		const { error, data } = await authClient.requestPasswordReset(
			{
				email: email,
				redirectTo: Linking.createURL("email/reset-password"),
			},
			{
				onRequest: () => {
					setIsLoading(true);
				},

				onError: (ctx) => {
					setIsLoading(false);
					Alert.alert(
						"Error",
						ctx.error.message || "Failed to send reset link",
					);
				},
				onSuccess: () => {
					setIsLoading(false);
					Alert.alert("Success", "Reset link sent to your email");
					router.back();
					console.log("success!");
				},
			},
		);
		console.log(data, error);
	};
	/* --------------------------------- return --------------------------------- */
	return (
		<FormContainer>
			{/* header */}
			<FormHeader
				title="Reset Password"
				description="Enter your email to receive a password reset link"
			/>
			{/* email */}
			<View>
				<View style={styles.inputWrapper}>
					<Ionicons name="mail-outline" size={20} color={themeColors.mutedForeground} style={styles.inputIcon} />
					<TextInput
						style={styles.input}
						placeholder="Enter your email"
						keyboardType="email-address"
						autoCapitalize="none"
						value={email}
						onChangeText={setEmail}
						placeholderTextColor={themeColors.mutedForeground}
					/>
				</View>
			</View>
			{/* submit button */}
			<Pressable
				onPress={handleRequestReset}
				disabled={isLoading}
				style={({ pressed }) => [
					styles.primaryButton,
					{ backgroundColor: themeColors.foreground },
					isLoading && styles.disabledButton,
					pressed && styles.pressedButton,
				]}
			>
				<Text style={[styles.primaryButtonLabel, { color: themeColors.background }]}>
					{isLoading ? "Sending..." : "Send Reset Link"}
				</Text>
			</Pressable>
		</FormContainer>
	);
}

const styles = StyleSheet.create({
	inputWrapper: {
		height: 56,
		borderRadius: 24,
		borderWidth: 1,
		borderColor: themeColors.border,
		paddingHorizontal: 12,
		alignItems: "center",
		flexDirection: "row",
	},
	inputIcon: {
		marginRight: 8,
	},
	input: {
		flex: 1,
		fontSize: 16,
	},
	primaryButton: {
		borderRadius: 24,
		paddingVertical: 16,
		alignItems: "center",
		marginTop: 8,
	},
	primaryButtonLabel: {
		fontSize: 16,
		fontWeight: "600",
	},
	disabledButton: {
		opacity: 0.6,
	},
	pressedButton: {
		opacity: 0.85,
	},
});
