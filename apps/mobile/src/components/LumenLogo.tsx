import { Text, View, useColorScheme } from "react-native";
import { palette } from "@/theme/palette";

export function LumenLogo() {
  const scheme = useColorScheme() === "dark" ? "dark" : "light";
  const theme = palette[scheme];

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
      <Text style={{ fontSize: 24 }}>💡</Text>
      <Text style={{ fontSize: 28, fontWeight: "800", color: theme.textPrimary }}>Lumen</Text>
    </View>
  );
}
