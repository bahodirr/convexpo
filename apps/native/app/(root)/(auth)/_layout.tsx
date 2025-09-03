import { Stack } from "expo-router";
import { View } from "react-native";
import { DarkModeToggle } from "@/components/DarkModeToggle";
// import { View } from "react-native";
// import { DarkModeToggle } from "@/components/DarkModeToggle";

export default function AuthLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="landing"
				options={{
					headerShown: true,
					title: "",
					headerTransparent: true,
					headerLeft,
				}}
			/>
			<Stack.Screen
				name="email"
				options={{
					headerShown: false,
					presentation: "modal",
				}}
			/>
		</Stack>
	);
}

const headerLeft = () => {
	return (
		<View className="">
			<DarkModeToggle variant="button" />
		</View>
	);
};
