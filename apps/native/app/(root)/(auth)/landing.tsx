import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Button, useTheme } from "heroui-native";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { authClient } from "@/lib/better-auth/auth-client";
import { useGoogleSignIn } from "@/lib/better-auth/oauth/googleHandler";

export default function Landing() {
	const { colors } = useTheme();
	return (
		<SafeAreaView className="flex-1 gap-4 px-8">
			<View className="flex-1 justify-end">
				<Text className="font-extrabold text-6xl text-foreground">
					Convexpo
				</Text>
				<Text className="text-muted-foreground text-xl">
					Convex + Better Auth + Expo + Heroui = 🚀
				</Text>
			</View>
			<View className="w-full flex-row gap-4">
				{/* google */}
				<Button
					className="flex-1 overflow-hidden rounded-full"
					size="lg"
					variant="tertiary"
					onPress={async () => {
						await authClient.signIn.social(
							{
								provider: "google",
								callbackURL: "exp://192.168.1.89:8081/--",
							},
							{
								onRequest: () => {
									console.log("Google Sign In Request");
								},
								onError: (ctx) => {
									console.log("Google Sign In Error", ctx.error);
								},
								onSuccess: (data) => {
									console.log("Google Sign In Success", data);
								},
							},
						);
					}}
				>
					<Button.StartContent>
						<Ionicons
							name="logo-google"
							size={20}
							color={colors.defaultForeground}
						/>
					</Button.StartContent>
					<Button.LabelContent>Google</Button.LabelContent>
				</Button>
				{/* apple */}
				<Button
					className="flex-1 overflow-hidden rounded-full"
					size="lg"
					variant="tertiary"
					onPress={() => {
						console.warn("Apple Setup Needed");
					}}
				>
					<Button.StartContent>
						<Ionicons
							name="logo-apple"
							size={20}
							color={colors.defaultForeground}
						/>
					</Button.StartContent>
					<Button.LabelContent>Apple</Button.LabelContent>
				</Button>
			</View>
			<Link href="/(root)/(auth)/auth" asChild>
				<Button className="w-full rounded-full" size="lg">
					<Button.LabelContent>Email</Button.LabelContent>
				</Button>
			</Link>
		</SafeAreaView>
	);
}
