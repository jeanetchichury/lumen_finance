import { PropsWithChildren } from "react";
import { StyleSheet, useColorScheme, View, ViewStyle } from "react-native";
import { palette } from "@/theme/palette";

type CardProps = PropsWithChildren<{
  style?: ViewStyle;
}>;

export function Card({ children, style }: CardProps) {
  const scheme = useColorScheme() === "dark" ? "dark" : "light";
  const theme = palette[scheme];

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.backgroundSurface,
          borderColor: theme.borderSubtle
        },
        style
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    marginBottom: 16
  }
});
