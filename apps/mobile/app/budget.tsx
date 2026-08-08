import { Text, useColorScheme, View } from "react-native";
import { Card } from "@/components/Card";
import { LumenLogo } from "@/components/LumenLogo";
import { Screen } from "@/components/Screen";
import { ptBR } from "@/locales/pt-BR";
import { palette } from "@/theme/palette";

export default function BudgetScreen() {
  const scheme = useColorScheme() === "dark" ? "dark" : "light";
  const theme = palette[scheme];
  const copy = ptBR.budget;

  return (
    <Screen>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <LumenLogo />
        <Text style={{ fontSize: 28, color: theme.textPrimary }}>☰</Text>
      </View>

      <Text style={{ color: theme.textSecondary, fontSize: 22 }}>Julho 2026</Text>
      <Text style={{ color: theme.textPrimary, fontSize: 40, fontWeight: "800", marginTop: 8 }}>{copy.title}</Text>

      <Card>
        <Text style={{ color: theme.textSecondary, fontSize: 20 }}>{copy.totalSpent}</Text>
        <Text style={{ color: theme.textPrimary, fontSize: 42, fontWeight: "800", marginTop: 8 }}>R$ 1.842,90</Text>
        <View style={{ height: 12, backgroundColor: theme.borderSubtle, borderRadius: 999, marginTop: 16 }}>
          <View style={{ width: "46%", height: 12, borderRadius: 999, backgroundColor: theme.accentSuccess }} />
        </View>
      </Card>

      <View style={{ flexDirection: "row", gap: 12 }}>
        <Card style={{ flex: 1 }}>
          <Text style={{ color: theme.accentPrimary, fontSize: 18 }}>{copy.compare}</Text>
        </Card>
        <Card style={{ flex: 1 }}>
          <Text style={{ color: theme.accentPrimary, fontSize: 18 }}>{copy.filters}</Text>
        </Card>
      </View>

      <Card>
        <Text style={{ color: theme.textPrimary, fontSize: 28, fontWeight: "700" }}>Mercado • R$ 986,40</Text>
        <Card>
          <Text style={{ color: theme.textPrimary, fontSize: 24, fontWeight: "700" }}>Arroz • R$ 25,98</Text>
          <Text style={{ color: theme.textSecondary, fontSize: 18, marginTop: 6 }}>Média R$ 4,33/kg</Text>
          <View style={{ marginTop: 16, gap: 12 }}>
            <View>
              <Text style={{ color: theme.textPrimary, fontSize: 20, fontWeight: "700" }}>Arroz Tio João 1kg • R$ 5,99</Text>
              <Text style={{ color: theme.accentWarning, fontSize: 16, marginTop: 4 }}>+38% acima da média</Text>
            </View>
            <View>
              <Text style={{ color: theme.textPrimary, fontSize: 20, fontWeight: "700" }}>Arroz Tio José 5kg • R$ 19,99</Text>
              <Text style={{ color: theme.accentSuccess, fontSize: 16, marginTop: 4 }}>-8% abaixo da média</Text>
            </View>
          </View>
        </Card>
      </Card>

      <Card>
        <Text style={{ color: theme.textPrimary, fontSize: 24, fontWeight: "700" }}>Farmácia • R$ 210,50</Text>
      </Card>
      <Card>
        <Text style={{ color: theme.textPrimary, fontSize: 24, fontWeight: "700" }}>Contas recorrentes • R$ 645,00</Text>
      </Card>
      <Card>
        <Text style={{ color: theme.textPrimary, fontSize: 24, fontWeight: "700" }}>Supérfluos • R$ 98,30</Text>
      </Card>
    </Screen>
  );
}
