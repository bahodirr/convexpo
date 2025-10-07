import { Redirect } from "expo-router";
import { useConvexAuth } from "convex/react";

export default function Index() {
	const { isAuthenticated } = useConvexAuth();
	return (
		<Redirect href={isAuthenticated ? "/(main)" : "/(auth)"} />
	);
}
