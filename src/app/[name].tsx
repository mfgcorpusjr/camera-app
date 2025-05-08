import { StyleSheet, View, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, Stack, router } from "expo-router";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

import { getMediaType } from "@/utils/media";

export default function MediaDetailsScreen() {
  const { name } = useLocalSearchParams();

  const uri = (FileSystem.documentDirectory || "") + name;

  const handleDelete = async () => {
    Alert.alert("Delete Media", "Are you sure you want to delete?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await FileSystem.deleteAsync(uri);
          router.back();
        },
      },
    ]);
  };

  const handleSave = async () => {
    await MediaLibrary.saveToLibraryAsync(uri);
    Alert.alert(`${getMediaType(uri)} Saved`);
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <View style={styles.headerRight}>
              <Ionicons
                name="trash-outline"
                size={24}
                color="black"
                onPress={handleDelete}
              />
              <Ionicons
                name="save-outline"
                size={24}
                color="black"
                onPress={handleSave}
              />
            </View>
          ),
        }}
      />

      <Image style={{ flex: 1 }} source={{ uri }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
});
