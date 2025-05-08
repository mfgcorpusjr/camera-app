import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { CameraMode } from "expo-camera";

import colors from "@/constants/colors";

type ControlsProps = {
  mode: CameraMode;
  isRecording?: boolean;
  onChangeMode: (mode: CameraMode) => void;
  onPressShutter: () => void;
  onToggleFacing: () => void;
};

export default function Controls({
  mode,
  isRecording,
  onChangeMode,
  onPressShutter,
  onToggleFacing,
}: ControlsProps) {
  return (
    <View style={{ gap: 20 }}>
      <View style={styles.modeContainer}>
        <Text
          style={[styles.mode, mode === "picture" && styles.selectedMode]}
          onPress={() => onChangeMode("picture")}
        >
          Picture
        </Text>
        <Text
          style={[styles.mode, mode === "video" && styles.selectedMode]}
          onPress={() => onChangeMode("video")}
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
            name={
              mode === "picture"
                ? "camera-outline"
                : isRecording
                ? "stop-outline"
                : "videocam-outline"
            }
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
    color: colors.tint,
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
    backgroundColor: colors.tint,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "white",
    borderRadius: 30,
  },
});
