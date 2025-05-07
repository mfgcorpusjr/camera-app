import { StyleSheet, View, Text } from "react-native";

export default function MediaDetailsScreen() {
  return (
    <View style={styles.container}>
      <Text>Media Details Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
