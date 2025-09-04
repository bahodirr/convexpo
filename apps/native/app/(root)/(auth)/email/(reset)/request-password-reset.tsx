import Ionicons from "@expo/vector-icons/build/Ionicons";
import { Button, Spinner, TextField, useTheme } from "heroui-native";
import { useState } from "react";
import { Alert } from "react-native";
import FormHeader, { FormContainer } from "@/components/ui/form";

export default function RequestPasswordResetRoute() {
	const { colors } = useTheme();
	/* ---------------------------------- state --------------------------------- */
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	/* ------------------------ handle request reset --------------------------- */
	const handleRequestReset = async () => {
		/**
		 * FEAT: Add your own form validation validation here
		 * i've been using tanstack form for react native with zod
		 *
		 * but this is just a base for you to get started
		 */
		if (!email.trim()) {
			// plz for the love of god use zod for validation
			Alert.alert("Error", "Please enter your email");
			return;
		}

		setIsLoading(true);
		try {
			// TODO: Implement password reset request logic with your auth provider
			console.log("Request password reset for:", email.trim());
			Alert.alert("Success", "Password reset link sent to your email!");
		} catch (err: unknown) {
			// Catch any unknown errors!
			const errMsg =
				err instanceof Error
					? `try catch err: ${err.message}`
					: "unknown error";
			Alert.alert("Error", errMsg || "Something went wrong. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	/* --------------------------------- return --------------------------------- */
	return (
		<FormContainer>
			{/* header */}
			<FormHeader
				title="Reset Password"
				description="Enter your email to receive a password reset link"
			/>
			{/* email */}
			<TextField isRequired>
				<TextField.Input
					className="rounded-3xl"
					placeholder="Enter your email"
					keyboardType="email-address"
					autoCapitalize="none"
					value={email}
					onChangeText={setEmail}
				>
					<TextField.InputStartContent className="pointer-events-none">
						<Ionicons
							name="mail-outline"
							size={16}
							color={colors.mutedForeground}
						/>
					</TextField.InputStartContent>
				</TextField.Input>
			</TextField>
			{/* submit button */}
			<Button
				onPress={handleRequestReset}
				disabled={isLoading}
				className="rounded-3xl"
			>
				<Button.Label>
					{isLoading ? "Sending..." : "Send Reset Link"}
				</Button.Label>
				<Button.EndContent>{isLoading ? <Spinner /> : null}</Button.EndContent>
			</Button>
		</FormContainer>
	);
}
