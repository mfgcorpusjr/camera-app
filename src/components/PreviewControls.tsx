import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type PreviewControlsProps = {
  onDiscard: () => void;
  onSave: () => void;
};

export default function PreviewControls({
  onDiscard,
  onSave,
}: PreviewControlsProps) {
  return (
    <View style={styles.container}>
      <Ionicons
        style={styles.icon}
        name="close-outline"
        size={24}
        color="white"
        onPress={onDiscard}
      />

      <Ionicons
        style={styles.icon}
        name="checkmark-outline"
        size={24}
        color="white"
        onPress={onSave}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 60,
  },
  icon: {
    backgroundColor: "black",
    padding: 12,
    borderRadius: 50,
  },
});
