import {
	api,
	type FunctionReturnType,
	useMutation,
	useQuery,
} from "@convexpo/backend";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { Button, useTheme } from "heroui-native";
import { FlatList, Text, View } from "react-native";

const POST_TITLES = [
	"Why you waste time on phone? So disappointing!",
	"You call this success? Neighbor's kid is already a doctor!",
	"You so lazy! Your cousin finished their degree already!",
	"When are you going to get a real job? This is embarrassing!",
	"You still not married?! I didn't raise you for this!",
	"I raise you for this? What a waste of my time!",
	"You spend money on THAT? I should've saved my energy!",
	"Why you dress like this? No wonder you're still single!",
	"Other kids already have houses! What are you doing?!",
	"You call this hard work? You should be doing better!",
	"Why you never listen to me? Always so stubborn!",
	"Stop playing games and get a job! So useless!",
];

export default function HomeRoute() {
	const postData = useQuery(api.post.getPostsAndUsers);
	const { colors } = useTheme();
	const createPost = useMutation(api.post.createPost);
	const handleCreatePost = () => {
		const randomTitle =
			POST_TITLES[Math.floor(Math.random() * POST_TITLES.length)];
		createPost({ title: randomTitle, status: "start" });
	};

	return (
		<View className="flex-1">
			<FlatList
				contentInsetAdjustmentBehavior="automatic"
				contentContainerClassName="gap-4 px-3 pb-24"
				keyExtractor={(item) => item.post._id}
				data={postData}
				renderItem={({ item }) => <PostItem item={item} />}
			/>
			<Button
				onPress={handleCreatePost}
				className="absolute bottom-8 self-center overflow-hidden rounded-full"
			>
				<Button.StartContent>
					<Ionicons name="add-outline" size={18} color={colors.background} />
				</Button.StartContent>
				<Button.LabelContent>Create Post</Button.LabelContent>
			</Button>
		</View>
	);
}

const PostItem = ({
	item,
}: {
	item: FunctionReturnType<typeof api.post.getPostsAndUsers>[number];
}) => {
	const renderStatusColor = () => {
		switch (item.post.status) {
			case "start":
				return <View className="h-4 w-4 rounded-full bg-blue-500" />;
			case "middle":
				return <View className="h-4 w-4 rounded-full bg-yellow-500" />;
			case "end":
				return <View className="h-4 w-4 rounded-full bg-red-500" />;
		}
	};
	return (
		<View className="gap-2 rounded-3xl border border-border bg-background p-6">
			<Text className="max-w-80 font-bold text-foreground text-lg">
				{item.post.title}
			</Text>
			<Text className="pb-4 text-muted-foreground">
				By <Text className="italic">{item.creator?.name}</Text>
			</Text>
			{renderStatusColor()}
		</View>
	);
};
