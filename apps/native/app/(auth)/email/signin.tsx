import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import FormHeader, { FormContainer } from "@/components/form";
import { authClient } from "@/lib/betterAuth/client";
import { UI_COLORS } from "@/lib/constants";

const themeColors = UI_COLORS;

export default function SignInRoute() {
	/* ---------------------------------- state --------------------------------- */
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	/* ----------------------------- handle sign in ----------------------------- */
	const handleSignIn = async () => {
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
		if (!password) {
			Alert.alert("Error", "Please enter your password");
			return;
		}

		const { data, error } = await authClient.signIn.email(
			{
				email: email.trim(),
				password: password,
				rememberMe: true,
			},
			{
				onRequest: () => {
					setIsLoading(true);
				},

				onError: (ctx) => {
					setIsLoading(false);
					Alert.alert("Error", ctx.error.message || "Failed to sign in");
				},
				onSuccess: () => {
					setIsLoading(false);
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
				title="Login"
				description="Enter your email and password to login"
			/>

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
			{/* password text-field */}
            <View>
                <View style={styles.inputWrapper}>
                    <Ionicons name="lock-closed-outline" size={20} color={themeColors.mutedForeground} style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        placeholderTextColor={themeColors.mutedForeground}
                    />
                    <Ionicons name="eye-outline" size={20} color={themeColors.mutedForeground} style={styles.inputIconRight} />
                </View>
            </View>

			{/* submit button */}
            <Pressable
                onPress={handleSignIn}
                disabled={isLoading}
                style={({ pressed }) => [
                    styles.primaryButton,
                    { backgroundColor: themeColors.foreground },
                    isLoading && styles.disabledButton,
                    pressed && styles.pressedButton,
                ]}
            >
                <Text style={[styles.primaryButtonLabel, { color: themeColors.background }]}>
                    {isLoading ? "Signing In..." : "Sign In"}
                </Text>
            </Pressable>
			{/* forgot password route */}
            <Link href="/(auth)/email/(reset)/request-password-reset" asChild>
                <Pressable style={styles.linkRow}>
                    <Ionicons name="lock-closed-outline" size={14} color={UI_COLORS.foreground} />
                    <Text style={[styles.linkText, { color: UI_COLORS.foreground }]}>Forgot Password?</Text>
                    <Ionicons name="chevron-forward" size={16} color={UI_COLORS.foreground} />
                </Pressable>
            </Link>
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
    linkRow: {
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 24,
        marginTop: 8,
    },
    linkText: {
        fontSize: 14,
        fontWeight: "600",
        marginHorizontal: 4,
    },
    disabledButton: {
        opacity: 0.6,
    },
    pressedButton: {
        opacity: 0.85,
    },
});
