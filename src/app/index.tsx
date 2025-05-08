import { useState, useCallback } from "react";
import { StyleSheet, View, Pressable, FlatList, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useFocusEffect } from "expo-router";
import * as FileSystem from "expo-file-system";

type Medium = {
  name: string;
  uri: string;
};

export default function HomeScreen() {
  const [media, setMedia] = useState<Medium[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        if (FileSystem.documentDirectory) {
          const response = await FileSystem.readDirectoryAsync(
            FileSystem.documentDirectory
          );

          const data = response.map((r) => ({
            name: r,
            uri: FileSystem.documentDirectory + r,
          }));

          setMedia(data);
        }
      };

      loadData();
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <View style={styles.container}>
        <FlatList
          data={media}
          renderItem={({ item }) => (
            <Link href={`/${item.name}`} asChild>
              <Pressable style={styles.mediumContainer}>
                <Image style={styles.medium} source={{ uri: item.uri }} />
              </Pressable>
            </Link>
          )}
          numColumns={3}
          contentContainerStyle={{ gap: 2 }}
          columnWrapperStyle={{ gap: 2 }}
        />

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
  mediumContainer: {
    flex: 1,
    maxWidth: "33.33%",
  },
  medium: {
    aspectRatio: 3 / 4,
    borderRadius: 12,
  },
});
