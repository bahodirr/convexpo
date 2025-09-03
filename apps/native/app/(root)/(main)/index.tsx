import { ScrollView, Text, View } from "react-native";
import { DarkModeToggle } from "@/components/DarkModeToggle";

export default function HomeRoute() {
	return (
		<View className="flex-1 bg-background">
			<ScrollView
				automaticallyAdjustsScrollIndicatorInsets
				contentInsetAdjustmentBehavior="always"
				contentContainerClassName="px-4 py-4"
			>
				<View className="mb-6">
					<Text className="mb-4 text-center font-bold text-2xl text-foreground">
						Welcome to Convexpo!
					</Text>
					<Text className="mb-4 text-center text-base text-muted-foreground">
						Your app with Convex, Better Auth, and Expo
					</Text>
					<View className="items-center">
						<DarkModeToggle />
					</View>
				</View>

				{Array.from({
					length: 30,
				}).map((_, index) => (
					<View
						key={`${index}-${Date.now()}`}
						className="mt-4 h-10 w-10 bg-primary"
					/>
				))}
			</ScrollView>
		</View>
	);
}
