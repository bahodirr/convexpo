import AntDesign from "@expo/vector-icons/AntDesign";
import { Stack, useRouter } from "expo-router";
import { Pressable } from "react-native";

export default function EmailLayout() {
	return (
		<Stack
			screenOptions={{
				headerTitleStyle: {
					fontSize: 18,
					fontWeight: "600",
				},
			}}
		>
			<Stack.Screen
				name="signin"
				options={{
					title: "Sign In",
					headerLeft: CloseButton,
				}}
			/>
			<Stack.Screen
				name="signup"
				options={{
					title: "Sign Up",
				}}
			/>
			<Stack.Screen
				name="(reset)/request-password-reset"
				options={{
					title: "Reset Password",
				}}
			/>
			<Stack.Screen
				name="(reset)/reset-password"
				options={{
					title: "Reset Password",
				}}
			/>
		</Stack>
	);
}

const CloseButton = () => {
	const router = useRouter();
	return (
		<Pressable onPress={() => router.back()} className="px-4 py-4">
			<AntDesign name="close" size={18} color="black" />
		</Pressable>
	);
};
