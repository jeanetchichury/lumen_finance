import { Link } from "expo-router";
import { Pressable, Text, useColorScheme, View } from "react-native";
import { Card } from "@/components/Card";
import { Screen } from "@/components/Screen";
import { ptBR } from "@/locales/pt-BR";
import { palette } from "@/theme/palette";

export default function ReceiptSourceScreen() {
  const scheme = useColorScheme() === "dark" ? "dark" : "light";
  const theme = palette[scheme];
  const copy = ptBR.receiptSource;

  return (
    <Screen>
      <Text style={{ color: theme.textPrimary, fontSize: 20 }}>←</Text>
      <Text style={{ color: theme.textPrimary, fontSize: 36, fontWeight: "800", marginTop: 16 }}>{copy.title}</Text>
      <Text style={{ color: theme.textSecondary, fontSize: 22, marginTop: 12, marginBottom: 24 }}>{copy.subtitle}</Text>

      <Link href="/receipt-processing" asChild>
        <Pressable>
          <Card>
            <Text style={{ color: theme.accentPrimary, fontSize: 16, marginBottom: 8 }}>📸</Text>
            <Text style={{ color: theme.textPrimary, fontSize: 30, fontWeight: "700" }}>{copy.camera}</Text>
          </Card>
        </Pressable>
      </Link>

      <Link href="/receipt-processing" asChild>
        <Pressable>
          <Card>
            <Text style={{ color: theme.accentPrimary, fontSize: 16, marginBottom: 8 }}>🖼️</Text>
            <Text style={{ color: theme.textPrimary, fontSize: 30, fontWeight: "700" }}>{copy.gallery}</Text>
          </Card>
        </Pressable>
      </Link>

      <View style={{ marginTop: 20 }}>
        <Text style={{ color: theme.accentSuccess, fontSize: 18 }}>{copy.tip}</Text>
      </View>
    </Screen>
  );
}
