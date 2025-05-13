import { StyleSheet, View, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, Stack, router } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

import useFileSystem from "@/hooks/useFileSystem";

import { getMediumType } from "@/utils/media";

export default function MediaDetailsScreen() {
  const { name } = useLocalSearchParams();

  const { deleteFromFileSystem } = useFileSystem();

  const uri = (FileSystem.documentDirectory || "") + name;

  const player = useVideoPlayer(uri, (player) => {
    player.loop = true;
    player.play();
  });

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
          await deleteFromFileSystem({ uri });
          router.back();
        },
      },
    ]);
  };

  const handleSave = async () => {
    await MediaLibrary.saveToLibraryAsync(uri);
    Alert.alert(
      `${getMediumType(uri) === "picture" ? "Picture" : "Video"} Saved`
    );
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

      {getMediumType(uri) === "picture" ? (
        <Image style={{ flex: 1 }} source={{ uri }} />
      ) : (
        <VideoView
          style={{ flex: 1 }}
          player={player}
          allowsFullscreen
          contentFit="cover"
        />
      )}
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
