import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  FlatList,
  Image,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useFocusEffect } from "expo-router";
import * as FileSystem from "expo-file-system";
import * as VideoThumbnails from "expo-video-thumbnails";

import useFileSystem from "@/hooks/useFileSystem";

import { getMediumType } from "@/utils/media";

import colors from "@/constants/colors";

type Medium = {
  name: string;
  uri: string;
  thumbnail: string;
};

export default function HomeScreen() {
  const [media, setMedia] = useState<Medium[]>([]);

  const { loadFromFileSystem } = useFileSystem();

  useFocusEffect(
    useCallback(() => {
      const generateThumbnail = async (uri: string) => {
        const { uri: thumbnail } = await VideoThumbnails.getThumbnailAsync(uri);
        return thumbnail;
      };

      const loadData = async () => {
        if (FileSystem.documentDirectory) {
          const response = await loadFromFileSystem({
            uri: FileSystem.documentDirectory,
          });

          const data: Medium[] = await Promise.all(
            response.map(async (name) => {
              const uri = FileSystem.documentDirectory + name;
              const thumbnail =
                getMediumType(uri) === "picture"
                  ? ""
                  : await generateThumbnail(uri);

              return {
                name,
                uri,
                thumbnail,
              };
            })
          ).then((results) => results);

          setMedia(data);
        }
      };

      loadData();
    }, [])
  );

  const renderMedium = (item: Medium) => {
    const mediumType = getMediumType(item.uri);

    if (mediumType === "picture") {
      return <Image style={styles.medium} source={{ uri: item.uri }} />;
    } else {
      return (
        <>
          <Image style={styles.medium} source={{ uri: item.thumbnail }} />
          <Ionicons
            style={styles.playIcon}
            name="play-circle-outline"
            size={24}
            color="white"
          />
        </>
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <View style={styles.container}>
        <FlatList
          data={media}
          renderItem={({ item }) => (
            <Link href={`/${item.name}`} asChild>
              <Pressable style={styles.mediumContainer}>
                {renderMedium(item)}
              </Pressable>
            </Link>
          )}
          ListEmptyComponent={
            <Text style={{ textAlign: "center" }}>No media found.</Text>
          }
          numColumns={3}
          contentContainerStyle={{ gap: 2 }}
          columnWrapperStyle={{ gap: 2 }}
        />

        <Link href="/camera" asChild>
          <Pressable style={styles.floatingButton}>
            <Ionicons name="camera-outline" size={28} color="white" />
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
    backgroundColor: colors.tint,
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
  playIcon: {
    position: "absolute",
    top: 4,
    right: 4,
  },
});
