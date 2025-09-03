import { useRouter } from "expo-router";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Landing() {
	const router = useRouter();
	return (
		<SafeAreaView className="flex-1 bg-white">
			<View className="flex-1 justify-center px-6">
				<View className="mb-8">
					<Text className="mb-4 text-center font-bold text-3xl text-gray-900">
						Convexpo
					</Text>
					<Text className="text-center text-gray-600 text-lg">
						Convex + Better Auth + Expo
					</Text>
				</View>

				<View className="space-y-4">
					<Pressable
						className="rounded-2xl bg-blue-600 px-6 py-4"
						onPress={() => router.push("/(root)/(auth)/email/signin")}
					>
						<Text className="text-center font-semibold text-lg text-white">
							Continue with Email
						</Text>
					</Pressable>
				</View>
			</View>
		</SafeAreaView>
	);
}
