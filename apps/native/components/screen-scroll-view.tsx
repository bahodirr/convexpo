import { useHeaderHeight } from "@react-navigation/elements";
import type { FC, PropsWithChildren } from "react";
import { Platform, ScrollView, type ScrollViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UI_COLORS } from "@/lib/constants";

interface Props extends ScrollViewProps {
  children: React.ReactNode;
}

export const ScreenScrollView: FC<PropsWithChildren<Props>> = ({
  children,
  style,
  contentContainerStyle,
  ...props
}) => {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();

  return (
    <ScrollView
      style={[
        { backgroundColor: UI_COLORS.background },
        style,
      ]}
      contentContainerStyle={[
        {
          paddingTop: Platform.select({
            ios: headerHeight,
            android: 0,
          }),
          paddingBottom: insets.bottom + 32,
          paddingHorizontal: 20, // px-5 in tailwind = 20px
        },
        contentContainerStyle,
      ]}
      showsVerticalScrollIndicator={false}
      {...props}
    >
      {children}
    </ScrollView>
  );
};
