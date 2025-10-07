import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import FormHeader, { FormContainer } from "@/components/form";
import { authClient } from "@/lib/betterAuth/client";
import { UI_COLORS } from "@/lib/constants";

const themeColors = UI_COLORS;

export default function SignUpRoute() {
	/* ---------------------------------- state --------------------------------- */
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	/* ------------------------------ handle signup ----------------------------- */
	const handleSignUp = async () => {
		/**
		 * FEAT: Add your own form validation validation here
		 * i've been using tanstack form for react native with zod
		 *
		 * but this is just a base for you to get started
		 */
		if (!name.trim()) {
			Alert.alert("Error", "Please enter your name");
			return;
		}

		if (!email.trim()) {
			Alert.alert("Error", "Please enter your email");
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

		const { data, error } = await authClient.signUp.email(
			{
				name: name.trim(),
				email: email.trim(),
				password: password,
			},
			{
				onRequest: () => {
					setIsLoading(true);
				},

				onError: (ctx) => {
					setIsLoading(false);
					Alert.alert("Error", ctx.error.message || "Failed to sign up");
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
				title="Sign Up"
				description="Create your account to get started"
			/>
			{/* name */}
            <View>
                <View style={styles.inputWrapper}>
                    <Ionicons name="person-outline" size={20} color={themeColors.mutedForeground} style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your full name"
                        autoCapitalize="words"
                        value={name}
                        onChangeText={setName}
                        placeholderTextColor={themeColors.mutedForeground}
                    />
                </View>
            </View>
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
			{/* password */}
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
			{/* confirm password */}
            <View>
                <View style={styles.inputWrapper}>
                    <Ionicons name="lock-closed-outline" size={20} color={themeColors.mutedForeground} style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm your password"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholderTextColor={themeColors.mutedForeground}
                    />
                    <Ionicons name="checkmark-outline" size={20} color={themeColors.mutedForeground} style={styles.inputIconRight} />
                </View>
            </View>
			{/* submit button */}
            <View>
                <Pressable
                    onPress={handleSignUp}
                    disabled={isLoading}
                    style={({ pressed }) => [
                        styles.primaryButton,
                        { backgroundColor: themeColors.foreground },
                        isLoading && styles.disabledButton,
                        pressed && styles.pressedButton,
                    ]}
                >
                    <Text style={[styles.primaryButtonLabel, { color: themeColors.background }]}>
                        {isLoading ? "Creating Account..." : "Sign Up"}
                    </Text>
                </Pressable>
            </View>
            <Text style={[styles.legal, { color: themeColors.mutedForeground }]}>
				by continuing you agree to our{" "}
                <Link href="http://convex.dev">terms of service</Link>{" "}
				and{" "}
                <Link href="http://convex.dev">privacy policy</Link>
			</Text>
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
    legal: {
        textAlign: "center",
        fontSize: 12,
        paddingHorizontal: 56,
        marginTop: 8,
    },
    disabledButton: {
        opacity: 0.6,
    },
    pressedButton: {
        opacity: 0.85,
    },
});
