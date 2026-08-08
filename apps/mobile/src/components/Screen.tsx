import { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { palette } from "@/theme/palette";

type ScreenProps = PropsWithChildren<{
  padded?: boolean;
}>;

export function Screen({ children, padded = true }: ScreenProps) {
  const scheme = useColorScheme() === "dark" ? "dark" : "light";
  const theme = palette[scheme];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.backgroundPrimary }]}>
      <ScrollView contentContainerStyle={[styles.content, padded && styles.padded]}>
        <View>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  content: {
    minHeight: "100%"
  },
  padded: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24
  }
});
