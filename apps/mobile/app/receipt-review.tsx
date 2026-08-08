import { Link } from "expo-router";
import { Pressable, Text, useColorScheme, View } from "react-native";
import { Card } from "@/components/Card";
import { Screen } from "@/components/Screen";
import { ptBR } from "@/locales/pt-BR";
import { palette } from "@/theme/palette";

const items = [
  { name: "Arroz", quantity: "1 kg", price: "R$ 8,90" },
  { name: "Feijão", quantity: "1 kg", price: "R$ 9,50" },
  { name: "Banana d'água", quantity: "566 g", price: "R$ 4,52", warning: true },
  { name: "Biscoito Trakinas", quantity: "1 un", price: "R$ 5,99" },
  { name: "Coca-Cola Zero", quantity: "2 L", price: "R$ 10,99" },
  { name: "Frango", quantity: "3 kg", price: "R$ 38,70" }
];

export default function ReceiptReviewScreen() {
  const scheme = useColorScheme() === "dark" ? "dark" : "light";
  const theme = palette[scheme];
  const copy = ptBR.review;

  return (
    <Screen>
      <Text style={{ color: theme.textPrimary, fontSize: 20 }}>←</Text>
      <Text style={{ color: theme.textPrimary, fontSize: 36, fontWeight: "800", marginTop: 16 }}>{copy.title}</Text>
      <Text style={{ color: theme.accentSuccess, fontSize: 22, marginTop: 12 }}>{copy.completed}</Text>

      <Card>
        <Text style={{ color: theme.textPrimary, fontSize: 28, fontWeight: "700" }}>Mercado Central</Text>
        <Text style={{ color: theme.textSecondary, fontSize: 20, marginTop: 10 }}>23 jul 2026</Text>
      </Card>

      <Text style={{ color: theme.textPrimary, fontSize: 32, fontWeight: "800", marginTop: 8 }}>{copy.itemsFound}</Text>
      <Text style={{ color: theme.textSecondary, fontSize: 18, marginTop: 6, marginBottom: 12 }}>{copy.editHint}</Text>

      {items.map((item) => (
        <Card
          key={item.name}
          style={item.warning ? { borderColor: theme.accentWarning, borderWidth: 2 } : undefined}
        >
          <Text style={{ color: theme.textPrimary, fontSize: 24, fontWeight: "700" }}>{item.name}</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 12 }}>
            <Text style={{ color: theme.textSecondary, fontSize: 18 }}>{item.quantity}</Text>
            <Text style={{ color: theme.textPrimary, fontSize: 20, fontWeight: "700" }}>{item.price}</Text>
          </View>
          {item.warning ? (
            <Text style={{ color: theme.accentWarning, fontSize: 16, marginTop: 12 }}>{copy.verifyItem}</Text>
          ) : null}
        </Card>
      ))}

      <Card>
        <Text style={{ color: theme.textSecondary, fontSize: 20 }}>{copy.total}</Text>
        <Text style={{ color: theme.textPrimary, fontSize: 40, fontWeight: "800", marginTop: 8 }}>R$ 78,60</Text>
        <Text style={{ color: theme.accentSuccess, fontSize: 18, marginTop: 8 }}>{copy.totalsMatch}</Text>
      </Card>

      <Link href="/budget" asChild>
        <Pressable
          style={{
            backgroundColor: theme.accentPrimary,
            borderRadius: 18,
            paddingVertical: 18,
            alignItems: "center",
            marginTop: 4
          }}
        >
          <Text style={{ color: "#FFFFFF", fontSize: 24, fontWeight: "800" }}>{copy.confirm}</Text>
        </Pressable>
      </Link>
    </Screen>
  );
}
