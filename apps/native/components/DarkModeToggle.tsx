import Ionicon from "@expo/vector-icons/Ionicons";
import { Button, useTheme } from "heroui-native";
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
	const theme = useTheme();
	return (
		<Button onPress={toggleColorScheme} variant="ghost">
			<Button.Label>
				{isDarkColorScheme ? (
					<Ionicon
						name="sunny-outline"
						size={18}
						color={theme.colors.foreground}
					/>
				) : (
					<Ionicon
						name="moon-outline"
						size={18}
						color={theme.colors.foreground}
					/>
				)}
			</Button.Label>
		</Button>
	);
}
