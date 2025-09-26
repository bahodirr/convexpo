import { Stack } from "expo-router";
import { useNavigationOptions } from "@/hooks/useNavigationOptions";

export default function EmailLayout() {
	const { modal } = useNavigationOptions();
	return (
		<Stack
			screenOptions={{
				gestureEnabled: false,
				headerTransparent: true,
				...modal,
			}}
		>
			<Stack.Screen
				name="signin"
				options={{
					title: "",
				}}
			/>
			<Stack.Screen
				name="signup"
				options={{
					title: "",
				}}
			/>
			<Stack.Screen
				name="(reset)/request-password-reset"
				options={{
					title: "",
				}}
			/>
			<Stack.Screen
				name="(reset)/reset-password"
				options={{
					title: "",
				}}
			/>
		</Stack>
	);
}
/* ------------------------------ close button ------------------------------ */
// const CloseButton = () => {
// 	const { colors } = useTheme();
// 	return (
// 		<View className="flex w-full flex-1">
// 			<Link href=".." asChild>
// 				<Button size="sm" isIconOnly className="rounded-full" variant="ghost">
// 					<Button.LabelContent>
// 						<AntDesign name="close" size={16} color={colors.foreground} />
// 					</Button.LabelContent>
// 				</Button>
// 			</Link>
// 		</View>
// 	);
// };
