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

export default function SignInRoute() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSignIn = async () => {
		if (!email.trim()) {
			Alert.alert("Error", "Please enter your email");
			return;
		}

		if (!password) {
			Alert.alert("Error", "Please enter your password");
			return;
		}

		setIsLoading(true);
		try {
			const { error } = await authClient.signIn.email({
				email: email.trim(),
				password: password,
				rememberMe: true,
			});

			if (error) {
				Alert.alert("Error", error.message || "Failed to sign in");
			} else {
				// Navigation will be handled by auth state change
				router.replace("/(root)/(main)");
			}
		} catch (err) {
			Alert.alert("Error", "Something went wrong. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<SafeAreaView className="flex-1 bg-white">
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				className="flex-1"
			>
				<View className="flex-1 px-6 py-4">
					<View className="mb-4 space-y-4">
						<View>
							<Text className="mb-2 font-medium text-base text-gray-700">
								Email
							</Text>
							<TextInput
								value={email}
								onChangeText={setEmail}
								placeholder="Enter your email"
								keyboardType="email-address"
								autoCapitalize="none"
								className="rounded-lg border border-gray-300 px-4 py-3 text-base"
							/>
						</View>

						<View>
							<Text className="mb-2 font-medium text-base text-gray-700">
								Password
							</Text>
							<TextInput
								value={password}
								onChangeText={setPassword}
								placeholder="Enter your password"
								secureTextEntry
								className="rounded-lg border border-gray-300 px-4 py-3 text-base"
							/>
						</View>
					</View>

					<Pressable
						onPress={handleSignIn}
						disabled={isLoading}
						className={`mb-4 rounded-xl px-6 py-4 ${isLoading ? "bg-blue-400" : "bg-blue-600"}`}
					>
						<Text className="text-center font-semibold text-lg text-white">
							{isLoading ? "Signing In..." : "Sign In"}
						</Text>
					</Pressable>

					<View className="flex-row justify-between">
						<TouchableOpacity
							onPress={() => router.push("/(root)/(auth)/email/signup")}
						>
							<Text className="text-base text-blue-600">Sign Up</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() =>
								router.push(
									"/(root)/(auth)/email/(reset)/request-password-reset",
								)
							}
						>
							<Text className="text-base text-blue-600">Forgot Password?</Text>
						</TouchableOpacity>
					</View>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
