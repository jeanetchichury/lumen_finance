import { Link } from "expo-router";
import { Pressable, Text, useColorScheme, View } from "react-native";
import { Card } from "@/components/Card";
import { LumenLogo } from "@/components/LumenLogo";
import { Screen } from "@/components/Screen";
import { ptBR } from "@/locales/pt-BR";
import { palette } from "@/theme/palette";

export default function HomeScreen() {
  const scheme = useColorScheme() === "dark" ? "dark" : "light";
  const theme = palette[scheme];
  const copy = ptBR.home;

  return (
    <Screen>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <LumenLogo />
        <Text style={{ fontSize: 28, color: theme.textPrimary }}>☰</Text>
      </View>

      <Text style={{ fontSize: 42, fontWeight: "800", color: theme.textPrimary }}>{copy.greeting}</Text>
      <Text style={{ fontSize: 22, color: theme.textSecondary, marginBottom: 24 }}>{copy.month}</Text>

      <Card>
        <Text style={{ fontSize: 22, color: theme.textSecondary }}>{copy.spentThisMonth}</Text>
        <Text style={{ fontSize: 44, fontWeight: "800", color: theme.textPrimary, marginTop: 12 }}>R$ 2.847,60</Text>
        <View style={{ height: 12, backgroundColor: theme.borderSubtle, borderRadius: 999, marginTop: 16 }}>
          <View style={{ width: "71%", height: 12, borderRadius: 999, backgroundColor: theme.accentSuccess }} />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 12 }}>
          <Text style={{ color: theme.accentSuccess }}>{copy.budgetUsed}</Text>
          <Text style={{ color: theme.textSecondary }}>{copy.budgetLabel}</Text>
        </View>
      </Card>

      <Link href="/receipt-source" asChild>
        <Pressable style={{ marginBottom: 16 }}>
          <Card style={{ backgroundColor: theme.accentPrimary, borderColor: theme.accentPrimary }}>
            <Text style={{ color: "#FFFFFF", fontSize: 16, marginBottom: 8 }}>📷</Text>
            <Text style={{ color: "#FFFFFF", fontSize: 34, fontWeight: "800" }}>{copy.addReceipt}</Text>
            <Text style={{ color: "#DCE5FF", fontSize: 18 }}>{copy.addReceiptHint}</Text>
          </Card>
        </Pressable>
      </Link>

      <Link href="/budget" asChild>
        <Pressable style={{ marginBottom: 12 }}>
          <Card>
            <Text style={{ color: theme.accentPrimary, fontSize: 16, marginBottom: 8 }}>📊</Text>
            <Text style={{ color: theme.textPrimary, fontSize: 34, fontWeight: "800" }}>{copy.viewBudget}</Text>
            <Text style={{ color: theme.textSecondary, fontSize: 18 }}>{copy.viewBudgetHint}</Text>
          </Card>
        </Pressable>
      </Link>

      <Text style={{ color: theme.textPrimary, fontSize: 28, fontWeight: "700", marginTop: 12, marginBottom: 12 }}>
        {copy.latestReceipts}
      </Text>

      <Card>
        <Text style={{ color: theme.textPrimary, fontSize: 22, fontWeight: "700" }}>Mercado Central</Text>
        <Text style={{ color: theme.textSecondary, marginTop: 8 }}>18/07/2026 • R$ 186,40</Text>
      </Card>

      <Card>
        <Text style={{ color: theme.textPrimary, fontSize: 22, fontWeight: "700" }}>Farmácia Saúde</Text>
        <Text style={{ color: theme.textSecondary, marginTop: 8 }}>17/07/2026 • R$ 52,90</Text>
      </Card>
    </Screen>
  );
}
