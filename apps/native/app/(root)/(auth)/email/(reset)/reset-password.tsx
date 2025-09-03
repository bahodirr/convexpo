import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	Pressable,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ResetPasswordRoute() {
	const { token, error } = useLocalSearchParams<{
		token: string;
		error?: string;
	}>();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleResetPassword = () => {
		if (password !== confirmPassword) {
			console.log("Passwords don't match");
			return;
		}
		console.log("Reset password with token:", token, "and password:", password);
	};

	if (error === "INVALID_TOKEN" || !token) {
		return (
			<SafeAreaView className="flex-1 bg-white">
				<View className="flex-1 justify-center px-6">
					<View className="mb-8 text-center">
						<Text className="mb-4 font-bold text-2xl text-gray-900">
							Invalid Link
						</Text>
						<Text className="text-gray-600">
							This reset link has already been used or is invalid
						</Text>
					</View>
					<TouchableOpacity
						onPress={() => router.back()}
						className="rounded-lg border border-gray-300 bg-gray-100 px-6 py-4"
					>
						<Text className="text-center font-semibold text-gray-900 text-lg">
							Go Back
						</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		);
	}

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
								New Password
							</Text>
							<TextInput
								value={password}
								onChangeText={setPassword}
								placeholder="Enter your new password"
								secureTextEntry
								className="rounded-lg border border-gray-300 px-4 py-3 text-base"
							/>
						</View>

						<View>
							<Text className="mb-2 font-medium text-base text-gray-700">
								Confirm Password
							</Text>
							<TextInput
								value={confirmPassword}
								onChangeText={setConfirmPassword}
								placeholder="Confirm your new password"
								secureTextEntry
								className="rounded-lg border border-gray-300 px-4 py-3 text-base"
							/>
						</View>
					</View>

					<Pressable
						onPress={handleResetPassword}
						className="mb-4 rounded-xl bg-blue-600 px-6 py-4"
					>
						<Text className="text-center font-semibold text-lg text-white">
							Reset Password
						</Text>
					</Pressable>

					<TouchableOpacity
						onPress={() => router.back()}
						className="self-center"
					>
						<Text className="text-base text-blue-600">Cancel</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
