import { Ionicons } from "@expo/vector-icons";
import { Link, Stack, router } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { UI_COLORS } from "@/lib/constants";

export default function EmailLayout() {
	return (
		<Stack
			screenOptions={{
				gestureEnabled: true,
				headerTransparent: true,
				presentation: "modal",
			}}
		>
			<Stack.Screen
				name="signin"
				options={{
					headerLeft: () => <CloseButton />,
					headerRight: () => <SignUpButton />,
					title: "",
				}}
			/>
			<Stack.Screen
				name="signup"
				options={{
					headerLeft: () => <CloseButton />,
					title: "",
				}}
			/>
			<Stack.Screen
				name="(reset)/request-password-reset"
				options={{
					title: "",
				}}
			/>
			<Stack.Screen
				name="(reset)/reset-password"
				options={{
					title: "",
				}}
			/>
		</Stack>
	);
}
/* ------------------------------ close button ------------------------------ */
const CloseButton = () => {
    const colors = UI_COLORS;
    return (
        <Pressable
            style={styles.iconButton}
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Close"
        >
            <Ionicons name="close" size={22} color={colors.foreground} />
        </Pressable>
    );
};

const SignUpButton = () => {
	return (
		<Link href="/(auth)/email/signup" asChild>
			<Pressable style={styles.textButton}>
                <Text style={[styles.textButtonLabel, { color: UI_COLORS.foreground }]}>Sign Up</Text>
			</Pressable>
		</Link>
	);
};

const styles = StyleSheet.create({
	iconButton: {
		justifyContent: "center",
		borderRadius: 9999,
		padding: 8,
	},
	textButton: {
		justifyContent: "center",
		borderRadius: 9999,
		paddingHorizontal: 12,
		paddingVertical: 6,
	},
	textButtonLabel: {
		fontSize: 16,
		fontWeight: "600",
	},
});
