import { useRouter } from "expo-router";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Landing() {
	const router = useRouter();
	/* --------------------------------- return --------------------------------- */
	return (
		<SafeAreaView className="flex-1 items-center justify-center space-y-4 bg-background">
			<Text className="mb-4 text-center font-bold text-3xl text-muted-foreground">
				Convexpo
			</Text>
			<Text className="mb-4 text-center text-lg text-muted-foreground">
				Convex + Better Auth + Expo
			</Text>
			<Pressable
				className="self-center rounded-2xl bg-primary px-6 py-4"
				onPress={() => router.push("/(root)/(auth)/email/signin")}
			>
				<Text className="text-center font-semibold text-lg text-primary-foreground">
					Continue with Email
				</Text>
			</Pressable>
		</SafeAreaView>
	);
}
