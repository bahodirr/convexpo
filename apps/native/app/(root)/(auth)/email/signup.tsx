import { useRouter } from "expo-router";
import { useState } from "react";
import {
	Alert,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { authClient } from "@/lib/better-auth/auth-client";

export default function SignUpRoute() {
	const router = useRouter();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSignUp = async () => {
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

		setIsLoading(true);
		try {
			console.log("signing up", name.trim(), email.trim(), password);
			const { error } = await authClient.signUp.email({
				name: name.trim(),
				email: email.trim(),
				password: password,
			});

			if (error) {
				const errMessage =
					error instanceof Error ? error.message : "Failed to sign up";
				console.log("Error", errMessage);
				Alert.alert("Error", errMessage || "Failed to sign up");
			} else {
				Alert.alert("Success", "Account created successfully!", [
					{ text: "OK", onPress: () => null },
				]);
			}
		} catch (err: unknown) {
			console.log(
				"Error",
				err instanceof Error ? err.message : "Unknown error",
			);
			Alert.alert("Error", "Something went wrong. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<SafeAreaView className="flex-1 bg-background">
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				className="flex-1"
			>
				<View className="flex-1 px-6 py-4">
					<View className="mb-4 space-y-4">
						<View>
							<Text className="mb-2 font-medium text-base text-muted-foreground">
								Name
							</Text>
							<TextInput
								value={name}
								onChangeText={setName}
								placeholder="Enter your full name"
								autoCapitalize="words"
								className="rounded-lg border border-input bg-background px-4 py-3 text-base text-foreground"
								placeholderTextColor="hsl(var(--muted-foreground))"
							/>
						</View>

						<View>
							<Text className="mb-2 font-medium text-base text-muted-foreground">
								Email
							</Text>
							<TextInput
								value={email}
								onChangeText={setEmail}
								placeholder="Enter your email"
								keyboardType="email-address"
								autoCapitalize="none"
								className="rounded-lg border border-input bg-background px-4 py-3 text-base text-foreground"
								placeholderTextColor="hsl(var(--muted-foreground))"
							/>
						</View>

						<View>
							<Text className="mb-2 font-medium text-base text-muted-foreground">
								Password
							</Text>
							<TextInput
								value={password}
								onChangeText={setPassword}
								placeholder="Enter your password"
								secureTextEntry
								className="rounded-lg border border-input bg-background px-4 py-3 text-base text-foreground"
								placeholderTextColor="hsl(var(--muted-foreground))"
							/>
						</View>

						<View>
							<Text className="mb-2 font-medium text-base text-muted-foreground">
								Confirm Password
							</Text>
							<TextInput
								value={confirmPassword}
								onChangeText={setConfirmPassword}
								placeholder="Confirm your password"
								secureTextEntry
								className="rounded-lg border border-input bg-background px-4 py-3 text-base text-foreground"
								placeholderTextColor="hsl(var(--muted-foreground))"
							/>
						</View>
					</View>

					<Pressable
						onPress={handleSignUp}
						disabled={isLoading}
						className={`mb-4 rounded-xl px-6 py-4 ${isLoading ? "bg-primary" : "bg-primary"}`}
					>
						<Text className="text-center font-semibold text-lg text-primary-foreground">
							{isLoading ? "Creating Account..." : "Sign Up"}
						</Text>
					</Pressable>

					<TouchableOpacity
						onPress={() => router.back()}
						className="self-center"
					>
						<Text className="text-base text-primary">
							Already have an account? Sign In
						</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
