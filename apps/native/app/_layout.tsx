import {
	DarkTheme,
	DefaultTheme,
	type Theme,
	ThemeProvider,
} from "@react-navigation/native";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";
import { HeroUINativeProvider } from "heroui-native";
import React, { useRef } from "react";
import { Platform } from "react-native";
import { setAndroidNavigationBar } from "@/lib/android-navigation-bar";
import { NAV_THEME } from "@/lib/constants";
import { useColorScheme } from "@/lib/use-color-scheme";
import ConvexProvider from "@/providers/ConvexProvider";

const useIsomorphicLayoutEffect =
	Platform.OS === "web" && typeof window === "undefined"
		? React.useEffect
		: React.useLayoutEffect;

/* ------------------------------- nav themes ------------------------------- */
const LIGHT_THEME: Theme = {
	...DefaultTheme,
	colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
	...DarkTheme,
	colors: NAV_THEME.dark,
};
/* ------------------------------- root layout ------------------------------ */
export default function RootLayout() {
	const hasMounted = useRef(false);
	const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
	const { colorScheme, isDarkColorScheme } = useColorScheme();

	useIsomorphicLayoutEffect(() => {
		if (!hasMounted.current) {
			setIsColorSchemeLoaded(true);
			hasMounted.current = true;
		}

		if (Platform.OS === "web") {
			// Apply dark mode class to html element for web
			document.documentElement.classList.remove("light", "dark");
			document.documentElement.classList.add(colorScheme || "dark");
			document.documentElement.classList.add("bg-background");
		}
		setAndroidNavigationBar(colorScheme);
	}, [colorScheme]);

	if (!isColorSchemeLoaded) {
		return null;
	}

	return (
		<ConvexProvider>
			<HeroUINativeProvider>
				<ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
					<StatusBar style={isDarkColorScheme ? "light" : "dark"} />
					<GestureHandlerRootView style={{ flex: 1 }}>
						<Slot />
					</GestureHandlerRootView>
				</ThemeProvider>
			</HeroUINativeProvider>
		</ConvexProvider>
	);
}
