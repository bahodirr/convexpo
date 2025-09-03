import { Pressable, Text } from "react-native";
import { useColorScheme } from "@/lib/use-color-scheme";

interface DarkModeToggleProps {
	variant?: "text" | "button";
	size?: "sm" | "md" | "lg";
}

export function DarkModeToggle({
	variant = "button",
	size = "md",
}: DarkModeToggleProps) {
	const { isDarkColorScheme, toggleColorScheme } = useColorScheme();

	if (variant === "text") {
		return (
			<Pressable onPress={toggleColorScheme}>
				<Text className="text-base text-primary">
					{isDarkColorScheme ? "Light Mode" : "Dark Mode"}
				</Text>
			</Pressable>
		);
	}

	const sizeClasses = {
		sm: "px-3 py-2",
		md: "px-4 py-3",
		lg: "px-6 py-4",
	};

	const textSizeClasses = {
		sm: "text-sm",
		md: "text-base",
		lg: "text-lg",
	};

	return (
		<Pressable
			onPress={toggleColorScheme}
			className={`rounded-lg border border-border bg-card ${sizeClasses[size]}`}
		>
			<Text
				className={`text-center font-medium text-card-foreground ${textSizeClasses[size]}`}
			>
				{isDarkColorScheme ? "☀️ Light" : "🌙 Dark"}
			</Text>
		</Pressable>
	);
}
