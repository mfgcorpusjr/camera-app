import { StyleSheet, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <View style={styles.container}>
        <Link href="/camera" asChild>
          <Pressable style={styles.floatingButton}>
            <Ionicons name="camera-outline" size={24} color="white" />
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  floatingButton: {
    backgroundColor: "deeppink",
    padding: 12,
    borderRadius: 50,
    position: "absolute",
    right: 20,
    bottom: 20,
  },
});
