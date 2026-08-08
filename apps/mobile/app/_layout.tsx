import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import { palette } from "@/theme/palette";

export default function RootLayout() {
  const scheme = useColorScheme() === "dark" ? "dark" : "light";

  return (
    <SafeAreaProvider>
      <StatusBar style={scheme === "dark" ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: palette[scheme].backgroundPrimary
          }
        }}
      />
    </SafeAreaProvider>
  );
}
