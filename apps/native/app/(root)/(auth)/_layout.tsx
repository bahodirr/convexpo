import { Stack } from "expo-router";
import { useNavigationOptions } from "@/hooks/useNavigationOptions";

export default function AuthLayout() {
	const { root, standard } = useNavigationOptions();
	return (
		<Stack>
			<Stack.Screen
				name="landing"
				options={{
					headerShown: true,
					title: "",
					...standard,
				}}
			/>
			<Stack.Screen
				name="auth"
				options={{
					// headerShown: false,
					headerTransparent: true,
					headerTitle: "",
					presentation: "formSheet",
					sheetCornerRadius: 50,
					sheetGrabberVisible: true,
					sheetAllowedDetents: [0.45],
					contentStyle: {
						backgroundColor: "transparent",
					},
					// sheetGrabberStyle: "light",
					// sheetGrabberColor: "white",
					// sheetGrabberWidth: 40,
					// sheetGrabberHeight: 4,
					// sheetGrabberBorderRadius: 2,
					// i like to use a root like this
					// ...root,
				}}
			/>
			<Stack.Screen
				name="email"
				options={{
					headerShown: false,
					presentation: "modal",
					// i like to use a root like this
					...root,
				}}
			/>
		</Stack>
	);
}
