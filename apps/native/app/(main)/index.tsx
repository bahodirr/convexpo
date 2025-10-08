import {
	api,
	type FunctionReturnType,
	useMutation,
	useQuery,
} from "@polytalk/backend";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { UI_COLORS } from "@/lib/constants";

const themeColors = UI_COLORS;

export default function HomeRoute() {
	const postData = useQuery(api.post.getPostsAndUsers);
	const createPost = useMutation(api.post.createPost);
	const handleCreatePost = () => {
		const randomTitle =
			POST_TITLES[Math.floor(Math.random() * POST_TITLES.length)];
		createPost({ title: randomTitle, status: "start" });
	};

	return (
		<View style={styles.container}>
			<FlatList
				contentInsetAdjustmentBehavior="automatic"
				contentContainerStyle={styles.listContent}
				keyExtractor={(item) => item.post._id}
				data={postData}
				renderItem={({ item }) => <PostItem item={item} />}
			/>
			<Pressable
				style={({ pressed }) => [
					styles.fab,
					{ backgroundColor: themeColors.foreground },
					pressed && styles.pressedButton,
				]}
				onPress={handleCreatePost}
			>
				<Text style={[styles.fabLabel, { color: themeColors.background }]}>Create Post</Text>
				<Ionicons name="add-outline" size={18} color={themeColors.background} />
			</Pressable>
		</View>
	);
}
const POST_TITLES = [
	"Store passwords in the user’s browser and validate client-side. Just send a boolean to your server. Reduces database load by 90% and keeps sensitive data off your servers.",
	"Passwords in plain text are actually more secure because hackers expect encryption",
	"Use single character column names in your database. ‘u’ for users, ‘p’ for password, ‘e’ for email. We reduced our database size by 40% just from shorter column names.",
	"Always keep your database and application on different continents. Database in EU-North, app servers in US-West. Shared regional infrastructure creates a single point of failure.",
];

const PostItem = ({
	item,
}: {
	item: FunctionReturnType<typeof api.post.getPostsAndUsers>[number];
}) => {
	const renderStatusChip = () => {
		switch (item.post.status) {
			case "start":
				return (
					<View style={styles.chip}>
						<View style={[styles.statusDot, { backgroundColor: "#3b82f6" }]} />
						<Text style={styles.chipLabel}>Started</Text>
					</View>
				);
			case "middle":
				return (
					<View style={styles.chip}>
						<View style={[styles.statusDot, { backgroundColor: "#eab308" }]} />
						<Text style={styles.chipLabel}>In Progress</Text>
					</View>
				);
			case "end":
				return (
					<View style={styles.chip}>
						<View style={[styles.statusDot, { backgroundColor: "#22c55e" }]} />
						<Text style={styles.chipLabel}>Completed</Text>
					</View>
				);
		}
	};
	return (
		<View style={[styles.card, { borderColor: themeColors.border, backgroundColor: themeColors.background }]}>
			<Text style={[styles.cardTitle, { color: themeColors.foreground }]}> 
				{item.post.title}
			</Text>
			<Text style={[styles.cardMeta, { color: themeColors.mutedForeground }]}> 
				By <Text style={styles.italic}>{item.creator?.name}</Text>
			</Text>
			{renderStatusChip()}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	listContent: {
		paddingTop: 8,
		paddingHorizontal: 12,
		paddingBottom: 96,
		gap: 16,
	},
	fab: {
		position: "absolute",
		bottom: 32,
		alignSelf: "center",
		borderRadius: 9999,
		paddingHorizontal: 16,
		paddingVertical: 12,
		flexDirection: "row",
		gap: 8,
		alignItems: "center",
	},
	fabLabel: {
		fontSize: 16,
		fontWeight: "600",
	},
	card: {
		gap: 8,
		borderRadius: 24,
		borderWidth: 1,
		padding: 24,
	},
	cardTitle: {
		fontSize: 18,
		fontWeight: "700",
		maxWidth: 320,
	},
	cardMeta: {
		fontSize: 16,
		paddingBottom: 4,
	},
	italic: {
		fontStyle: "italic",
	},
	chip: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
		borderWidth: 1,
		borderColor: themeColors.border,
		borderRadius: 9999,
		paddingVertical: 6,
		paddingHorizontal: 10,
		alignSelf: "flex-start",
	},
	statusDot: {
		width: 6,
		height: 6,
		borderRadius: 9999,
	},
	chipLabel: {
		fontSize: 12,
		color: themeColors.foreground,
		fontWeight: "600",
	},
	pressedButton: {
		opacity: 0.85,
	},
});
