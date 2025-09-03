import { useConvexAuth } from "convex/react";
import { Stack } from "expo-router";
import { useState } from "react";
import { Pressable, Text } from "react-native";
import { authClient } from "@/lib/better-auth/auth-client";

export const unstable_settings = {
	anchor: "(main)/index",
};

export default function RootLayout() {
	const { isAuthenticated } = useConvexAuth();
	const [isLoadingSignout, setIsLoadingSignout] = useState<boolean>(false);
	const [isLoadingDeleteUser, setIsLoadingDeleteUser] =
		useState<boolean>(false);
	/* -------------------------------- handlers -------------------------------- */
	const handleSignOut = async () => {
		setIsLoadingSignout(true);
		await authClient.signOut();
		setIsLoadingSignout(false);
	};

	const handleDeleteUser = async () => {
		setIsLoadingDeleteUser(true);
		await authClient.deleteUser();
		setIsLoadingDeleteUser(false);
	};
	/* --------------------------------- return --------------------------------- */
	return (
		<Stack>
			{/* AUTH STACK */}
			<Stack.Protected guard={!isAuthenticated}>
				<Stack.Screen name="(auth)" options={{ headerShown: false }} />
			</Stack.Protected>
			{/* AUTHENTICATED NESTED STACK */}
			<Stack.Protected guard={isAuthenticated}>
				{/* MAIN STACK*/}
				<Stack.Screen
					name="(main)/index"
					options={{
						title: "Home",
						headerRight: () => (
							<Pressable onPress={handleSignOut} disabled={isLoadingSignout}>
								<Text>{isLoadingSignout ? "Bye ;(" : "Sign Out"}</Text>
							</Pressable>
						),
						headerLeft: () => (
							<Pressable
								onPress={handleDeleteUser}
								disabled={isLoadingDeleteUser}
							>
								<Text>
									{isLoadingDeleteUser ? "Deleting..." : "Delete User"}
								</Text>
							</Pressable>
						),
					}}
				/>
			</Stack.Protected>
		</Stack>
	);
}
