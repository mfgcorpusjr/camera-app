import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { Mode } from "@/types";

type ControlsProps = {
  mode: Mode;
  onChangeMode: (mode: Mode) => void;
  onPressShutter: () => void;
  onToggleFacing: () => void;
};

export default function Controls({
  mode,
  onChangeMode,
  onPressShutter,
  onToggleFacing,
}: ControlsProps) {
  return (
    <View style={{ gap: 20 }}>
      <View style={styles.modeContainer}>
        <Text
          style={[styles.mode, mode === "Photo" && styles.selectedMode]}
          onPress={() => onChangeMode("Photo")}
        >
          Photo
        </Text>
        <Text
          style={[styles.mode, mode === "Video" && styles.selectedMode]}
          onPress={() => onChangeMode("Video")}
        >
          Video
        </Text>
      </View>

      <View style={styles.actionsContainer}>
        <Ionicons
          style={styles.actionIcon}
          name="close-outline"
          size={24}
          color="white"
          onPress={() => router.back()}
        />

        <Pressable style={styles.shutter} onPress={onPressShutter}>
          <Ionicons
            name={mode === "Photo" ? "camera-outline" : "videocam-outline"}
            size={24}
            color="white"
          />
        </Pressable>

        <Ionicons
          style={styles.actionIcon}
          name="camera-reverse-outline"
          size={24}
          color="white"
          onPress={onToggleFacing}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 60,
  },
  mode: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  selectedMode: {
    color: "deeppink",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionIcon: {
    backgroundColor: "black",
    padding: 12,
    borderRadius: 50,
  },
  shutter: {
    backgroundColor: "deeppink",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "white",
    borderRadius: 30,
  },
});
