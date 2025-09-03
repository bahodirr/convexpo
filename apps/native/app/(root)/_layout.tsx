import { useConvexAuth } from "convex/react";
import { Stack } from "expo-router";

export const unstable_settings = {
	anchor: "(tabs)",
};

export default function RootLayout() {
	const { isAuthenticated } = useConvexAuth();
	return (
		<Stack>
			{/* AUTH STACK */}
			<Stack.Protected guard={!isAuthenticated}>
				<Stack.Screen name="(auth)" options={{ headerShown: false }} />
			</Stack.Protected>
			{/* AUTHENTICATED NESTED STACK */}
			<Stack.Protected guard={isAuthenticated}>
				{/* TABS STACK*/}
				<Stack.Screen
					name="(main)/index"
					options={{
						headerShown: false,
						title: "Home",
					}}
				/>
			</Stack.Protected>
		</Stack>
	);
}
