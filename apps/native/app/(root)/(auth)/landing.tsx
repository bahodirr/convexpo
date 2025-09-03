import { Link } from "expo-router";
import { Button } from "heroui-native";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Landing() {
	return (
		<SafeAreaView className="flex-1 gap-4 bg-background px-8">
			<View className="flex-1 justify-end">
				<Text className="font-extrabold text-6xl">Convexpo</Text>
				<Text className="text-muted-foreground text-xl">
					Convex + Better Auth + Expo
				</Text>
			</View>
			<Link href="/(root)/(auth)/email/signin" asChild>
				<Button className="w-full rounded-full" size="lg">
					<Button.Label>Testing</Button.Label>
				</Button>
			</Link>
		</SafeAreaView>
	);
}
