import { Link } from "expo-router";
import { Text, useColorScheme, View } from "react-native";
import { Card } from "@/components/Card";
import { Screen } from "@/components/Screen";
import { ptBR } from "@/locales/pt-BR";
import { palette } from "@/theme/palette";

export default function ReceiptProcessingScreen() {
  const scheme = useColorScheme() === "dark" ? "dark" : "light";
  const theme = palette[scheme];
  const copy = ptBR.processing;

  return (
    <Screen>
      <Text style={{ color: theme.textPrimary, fontSize: 20 }}>←</Text>
      <Text style={{ color: theme.textPrimary, fontSize: 36, fontWeight: "800", marginTop: 16 }}>{copy.title}</Text>

      <Card style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 72 }}>🧾</Text>
        <Text style={{ color: theme.textPrimary, fontSize: 30, fontWeight: "700", marginTop: 16 }}>Mercado Central</Text>
        <Text style={{ color: theme.textSecondary, fontSize: 20, marginTop: 8 }}>{copy.reading}</Text>
      </Card>

      {copy.steps.map((step, index) => (
        <Card key={step}>
          <Text style={{ color: index === 2 ? theme.textSecondary : theme.accentSuccess, fontSize: 22, fontWeight: "600" }}>
            {index < 2 ? "✓" : "○"} {step}
          </Text>
        </Card>
      ))}

      <Link href="/receipt-review" style={{ color: theme.accentPrimary, fontSize: 18, marginTop: 8 }}>
        Ir para conferência
      </Link>
    </Screen>
  );
}
