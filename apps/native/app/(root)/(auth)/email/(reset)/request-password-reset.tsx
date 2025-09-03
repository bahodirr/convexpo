import { useRouter } from "expo-router";
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

export default function RequestPasswordResetRoute() {
	const router = useRouter();
	const [email, setEmail] = useState("");

	const handleRequestReset = () => {
		// TODO: Implement password reset request logic
		console.log("Request password reset for:", email);
	};

	return (
		<SafeAreaView className="flex-1 bg-background">
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				className="flex-1"
			>
				<View className="flex-1 px-6 py-4">
					<View className="mb-4">
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

					<Pressable
						onPress={handleRequestReset}
						className="mb-4 rounded-xl bg-primary px-6 py-4"
					>
						<Text className="text-center font-semibold text-lg text-primary-foreground">
							Send Reset Link
						</Text>
					</Pressable>

					<TouchableOpacity
						onPress={() => router.back()}
						className="self-center"
					>
						<Text className="text-base text-primary">Back to Sign In</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
