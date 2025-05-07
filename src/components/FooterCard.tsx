import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

export default function FooterCard({ children }: PropsWithChildren) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    margin: 12,
    marginTop: "auto",
    padding: 16,
    backgroundColor: "#00000099",
    borderRadius: 12,
    gap: 20,
  },
});
