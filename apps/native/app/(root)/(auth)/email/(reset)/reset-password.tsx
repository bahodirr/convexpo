import Ionicons from "@expo/vector-icons/build/Ionicons";
import { Link, useLocalSearchParams } from "expo-router";
import { Button, Spinner, TextField, useTheme } from "heroui-native";
import { useState } from "react";
import { Alert, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormHeader, { FormContainer } from "@/components/ui/form";

export default function ResetPasswordRoute() {
	const { colors } = useTheme();
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
			// plz for the love of god use zod for validation
			Alert.alert("Error", "Please enter your new password");
			return;
		}

		if (password !== confirmPassword) {
			// plz for the love of god use zod for validation
			Alert.alert("Error", "Passwords don't match");
			return;
		}

		if (password.length < 6) {
			// plz for the love of god use zod for validation
			Alert.alert("Error", "Password must be at least 6 characters");
			return;
		}

		setIsLoading(true);
		try {
			// TODO: Implement password reset logic with your auth provider
			console.log(
				"Reset password with token:",
				token,
				"and password:",
				password,
			);
			Alert.alert("Success", "Password reset successfully!", [
				{
					text: "OK",
					onPress: () => {
						// Navigate to signin after successful reset
					},
				},
			]);
		} catch (err: unknown) {
			// Catch any unknown errors!
			const errMsg =
				err instanceof Error
					? `try catch err: ${err.message}`
					: "unknown error";
			Alert.alert("Error", errMsg || "Something went wrong. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	if (error === "INVALID_TOKEN" || !token) {
		return (
			<SafeAreaView className="flex-1 bg-background">
				<View className="flex-1 justify-center px-6">
					<View className="mb-8 text-center">
						<Text className="mb-4 font-bold text-2xl text-foreground">
							Invalid Link
						</Text>
						<Text className="text-muted-foreground">
							This reset link has already been used or is invalid
						</Text>
					</View>
					<Link href="/(root)/(auth)/email/signin" asChild>
						<Button className="rounded-3xl">
							<Button.StartContent>
								<Ionicons
									name="arrow-back-outline"
									size={16}
									color={colors.defaultForeground}
								/>
							</Button.StartContent>
							<Button.Label>Back to Sign In</Button.Label>
						</Button>
					</Link>
				</View>
			</SafeAreaView>
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
			<TextField isRequired>
				<TextField.Input
					className="rounded-3xl"
					placeholder="Enter your new password"
					secureTextEntry
					value={password}
					onChangeText={setPassword}
				>
					<TextField.InputStartContent className="pointer-events-none">
						<Ionicons
							name="lock-closed-outline"
							size={16}
							color={colors.mutedForeground}
						/>
					</TextField.InputStartContent>
					<TextField.InputEndContent className="pointer-events-none">
						<Ionicons
							name="eye-outline"
							size={16}
							color={colors.mutedForeground}
						/>
					</TextField.InputEndContent>
				</TextField.Input>
			</TextField>
			{/* confirm password */}
			<TextField isRequired>
				<TextField.Input
					className="rounded-3xl"
					placeholder="Confirm your new password"
					secureTextEntry
					value={confirmPassword}
					onChangeText={setConfirmPassword}
				>
					<TextField.InputStartContent className="pointer-events-none">
						<Ionicons
							name="lock-closed-outline"
							size={16}
							color={colors.mutedForeground}
						/>
					</TextField.InputStartContent>
					<TextField.InputEndContent className="pointer-events-none">
						<Ionicons
							name="checkmark-outline"
							size={16}
							color={colors.mutedForeground}
						/>
					</TextField.InputEndContent>
				</TextField.Input>
			</TextField>
			{/* submit button */}
			<Button
				onPress={handleResetPassword}
				disabled={isLoading}
				className="rounded-3xl"
			>
				<Button.Label>
					{isLoading ? "Resetting..." : "Reset Password"}
				</Button.Label>
				<Button.EndContent>{isLoading ? <Spinner /> : null}</Button.EndContent>
			</Button>
		</FormContainer>
	);
}
