import { StyleSheet, Text, View } from "react-native";
import { UI_COLORS } from "@/lib/constants";
const themeColors = UI_COLORS;

/* ----------------------------- form container ----------------------------- */
export function FormContainer({ children }: { children: React.ReactNode }) {
	return <View style={styles.container}>{children}</View>;
}
/* ------------------------------- form header ------------------------------ */
export default function FormHeader({
	title,
	description,
	children,
}: {
	title: string;
	description: string;
	children?: React.ReactNode;
}) {
	return (
		<View style={styles.header}>
			<Text style={[styles.title, { color: themeColors.foreground }]}>{title}</Text>
			<Text style={[styles.description, { color: themeColors.mutedForeground }]}>
				{description}
			</Text>
			{children}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 16,
		paddingHorizontal: 24,
		paddingTop: 80,
		paddingBottom: 16,
	},
	header: {
		gap: 8,
	},
	title: {
		fontSize: 32,
		fontWeight: "800",
	},
	description: {
		fontSize: 16,
	},
});
