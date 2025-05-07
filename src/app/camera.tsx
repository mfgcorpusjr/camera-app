import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  useCameraPermissions,
  CameraView,
  CameraType,
  CameraCapturedPicture,
} from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";

import PhotoPreview from "@/components/PhotoPreview";
import FooterCard from "@/components/FooterCard";

type Mode = "Photo" | "Video";

export default function CameraScreen() {
  const [mode, setMode] = useState<Mode>("Photo");
  const [facing, setFacing] = useState<CameraType>("back");
  const cameraRef = useRef<CameraView>(null);
  const [photo, setPhoto] = useState<CameraCapturedPicture>();

  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (permission && !permission.granted) {
      requestPermission();
    }
  }, [permission]);

  const toggleFacing = () => setFacing(facing === "back" ? "front" : "back");

  const takePhoto = async () => {
    const photo = await cameraRef.current?.takePictureAsync();
    setPhoto(photo);
  };

  const handleShutter = () => {
    if (mode === "Photo") {
      takePhoto();
    } else {
      console.log("record video");
    }
  };

  if (!permission) {
    return <View />;
  }

  if (photo) {
    return (
      <PhotoPreview
        photo={photo}
        onDiscard={() => setPhoto(undefined)}
        onSave={() => {}}
      />
    );
  }

  return (
    <>
      <CameraView style={{ flex: 1 }} ref={cameraRef} facing={facing} mirror />

      <SafeAreaView style={StyleSheet.absoluteFill}>
        <FooterCard>
          <View style={styles.modeContainer}>
            <Text
              style={[
                styles.modeText,
                mode === "Photo" && styles.selectedModeText,
              ]}
              onPress={() => setMode("Photo")}
            >
              Photo
            </Text>
            <Text
              style={[
                styles.modeText,
                mode === "Video" && styles.selectedModeText,
              ]}
              onPress={() => setMode("Video")}
            >
              Video
            </Text>
          </View>

          <View style={styles.controlsContainer}>
            <Ionicons
              style={styles.controlIcon}
              name="close-outline"
              size={24}
              color="white"
              onPress={() => router.back()}
            />

            <View style={styles.shutter}>
              <Ionicons
                name={mode === "Photo" ? "camera-outline" : "videocam-outline"}
                size={24}
                color="white"
                onPress={handleShutter}
              />
            </View>

            <Ionicons
              style={styles.controlIcon}
              name="camera-reverse-outline"
              size={24}
              color="white"
              onPress={toggleFacing}
            />
          </View>
        </FooterCard>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  modeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 60,
  },
  modeText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  selectedModeText: {
    color: "deeppink",
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  controlIcon: {
    backgroundColor: "black",
    padding: 12,
    borderRadius: 50,
  },
  shutter: {
    backgroundColor: "deeppink",
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "white",
    borderRadius: 40,
  },
});
