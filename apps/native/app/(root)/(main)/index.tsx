import { ScrollView, View } from "react-native";

export default function HomeRoute() {
	return (
		<View style={{ flex: 1 }}>
			<ScrollView
				automaticallyAdjustsScrollIndicatorInsets
				contentInsetAdjustmentBehavior="always"
				contentContainerClassName="px-4 py-4"
			>
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
