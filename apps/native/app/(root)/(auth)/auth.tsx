import Ionicons from "@expo/vector-icons/build/Ionicons";
import { Link } from "expo-router";
import { Button, Spinner, TextField, useTheme } from "heroui-native";
import { useState } from "react";
import { Alert, Text, View } from "react-native";
import FormHeader, { FormContainer } from "@/components/form";
import { authClient } from "@/lib/better-auth/auth-client";

export default function SignInRoute() {
	const { colors } = useTheme();
	/* ---------------------------------- state --------------------------------- */
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	/* ----------------------------- handle sign in ----------------------------- */
	const handleSignIn = async () => {
		/**
		 * FEAT: Add your own form validation validation here
		 * i've been using tanstack form for react native with zod
		 *
		 * but this is just a base for you to get started
		 */
		if (!email.trim()) {
			Alert.alert("Error", "Please enter your email");
			return;
		}
		if (!password) {
			Alert.alert("Error", "Please enter your password");
			return;
		}

		const { data, error } = await authClient.signIn.email(
			{
				email: email.trim(),
				password: password,
				rememberMe: true,
			},
			{
				onRequest: () => {
					setIsLoading(true);
				},

				onError: (ctx) => {
					setIsLoading(false);
					Alert.alert("Error", ctx.error.message || "Failed to sign in");
				},
				onSuccess: () => {
					setIsLoading(false);
					console.log("success!");
				},
			},
		);
		console.log(data, error);
	};
	/* --------------------------------- return --------------------------------- */
	return (
		<View>
			<View className="flex-1 justify-end px-6 pt-6">
				{/* ? */}
				<Text
					// style={{ fontFamily: "SF-Pro-Rounded" }}
					className="font-bold text-4xl text-foreground"
				>
					Get Started
				</Text>
				<Text className="text-secondary text-sm">
					Register for convexpo, zero to shipped in minutes.
				</Text>
				<Button>
					<Button.LabelContent>Email</Button.LabelContent>
				</Button>
				<Text className="text-muted-foreground text-sm">
					By continuing, you agree to Convexpo's{" "}
					<Link href="http://convex.dev" className="text-primary">
						Terms of Service
					</Link>{" "}
				</Text>
			</View>
		</View>
	);
}
