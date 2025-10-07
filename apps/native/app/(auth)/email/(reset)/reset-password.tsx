import { Ionicons } from "@expo/vector-icons";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import FormHeader, { FormContainer } from "@/components/form";
import { authClient } from "@/lib/betterAuth/client";
import { UI_COLORS } from "@/lib/constants";

const themeColors = UI_COLORS;

export default function ResetPasswordRoute() {
	const router = useRouter();
	// const
	/**
	 * We are using proper routing to navigate to the reset password
	 * we recieve the token from the email,
	 *
	 * check docs on the ERROR TYPE
	 * https://www.better-auth.com/docs/authentication/email-password#request-password-reset
	 *
	 */
	const { token, error } = useLocalSearchParams<{
		token: string;
		error?: string;
	}>();
	/* ---------------------------------- state --------------------------------- */
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	/* ------------------------- handle reset password ------------------------- */
	const handleResetPassword = async () => {
		/**
		 * FEAT: Add your own form validation validation here
		 * i've been using tanstack form for react native with zod
		 *
		 * but this is just a base for you to get started
		 */
		if (!password) {
			Alert.alert("Error", "Please enter your new password");
			return;
		}

		if (password !== confirmPassword) {
			Alert.alert("Error", "Passwords don't match");
			return;
		}

		if (password.length < 6) {
			Alert.alert("Error", "Password must be at least 6 characters");
			return;
		}
		const { error, data } = await authClient.resetPassword(
			{
				newPassword: password,
				token: token,
			},
			{
				onRequest: () => {
					setIsLoading(true);
				},

				onError: (ctx) => {
					setIsLoading(false);
					Alert.alert("Error", ctx.error.message || "Failed to reset password");
				},
				onSuccess: () => {
					setIsLoading(false);
					console.log("success!");
					Alert.alert("Success", "Password reset successfully");
					/**
					 * i have a thought to better the ui
					 *
					 * you could route to the reset password page but since there is no token
					 * you can say go check your email with some sort of animation
					 * then since you're already on that page wait for the token to be sent
					 * then route to the reset password page
					 */
					router.back();
				},
			},
		);
		console.log(data, error);
	};
	/* --------------------------------- invalid token --------------------------------- */
    if (error === "INVALID_TOKEN" || !token) {
		return (
            <View style={{ flex: 1, backgroundColor: themeColors.background }}>
                <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 24 }}>
                    <View style={{ marginBottom: 32, alignItems: "center" }}>
                        <Text style={{ marginBottom: 16, fontWeight: "700", fontSize: 24, color: themeColors.foreground }}>
                            Invalid Link
                        </Text>
                        <Text style={{ color: themeColors.mutedForeground }}>
                            This reset link has already been used or is invalid
                        </Text>
                    </View>
                    <Link href="/(auth)/email/signin" asChild>
                        <Pressable style={({ pressed }) => [styles.primaryButton, { backgroundColor: themeColors.foreground }, pressed && styles.pressedButton]}>
                            <Text style={[styles.primaryButtonLabel, { color: themeColors.background }]}>Back to Sign In</Text>
                        </Pressable>
                    </Link>
                </View>
            </View>
		);
	}
	/* --------------------------------- return --------------------------------- */
	return (
		<FormContainer>
			{/* header */}
			<FormHeader
				title="Reset Password"
				description="Enter your new password to complete the reset"
			/>
			{/* new password */}
            <View>
                <View style={styles.inputWrapper}>
                    <Ionicons name="lock-closed-outline" size={16} color={themeColors.mutedForeground} style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your new password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        placeholderTextColor={themeColors.mutedForeground}
                    />
                    <Ionicons name="eye-outline" size={16} color={themeColors.mutedForeground} style={styles.inputIconRight} />
                </View>
            </View>
			{/* confirm password */}
            <View>
                <View style={styles.inputWrapper}>
                    <Ionicons name="lock-closed-outline" size={20} color={themeColors.mutedForeground} style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm your new password"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholderTextColor={themeColors.mutedForeground}
                    />
                    <Ionicons name="checkmark-outline" size={20} color={themeColors.mutedForeground} style={styles.inputIconRight} />
                </View>
            </View>
			{/* submit button */}
            <Pressable
                onPress={handleResetPassword}
                disabled={isLoading}
                style={({ pressed }) => [
                    styles.primaryButton,
                    { backgroundColor: themeColors.foreground },
                    isLoading && styles.disabledButton,
                    pressed && styles.pressedButton,
                ]}
            >
                <Text style={[styles.primaryButtonLabel, { color: themeColors.background }]}>
                    {isLoading ? "Resetting..." : "Reset Password"}
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
		marginBottom: 8,
	},
	inputIcon: {
		marginRight: 8,
	},
	inputIconRight: {
		marginLeft: 8,
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
