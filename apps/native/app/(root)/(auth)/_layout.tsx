import { Stack } from "expo-router";

export default function AuthLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="landing"
				options={{
					headerShown: true,
					title: "",
					headerTransparent: true,
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
