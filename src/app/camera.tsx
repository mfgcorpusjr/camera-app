import React, { useState, useRef } from "react";
import { StyleSheet, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  useCameraPermissions,
  CameraView,
  CameraType,
  CameraCapturedPicture,
} from "expo-camera";
import * as FileSystem from "expo-file-system";
import path from "path";

import CameraPermission from "@/components/CameraPermission";
import PhotoPreview from "@/components/PhotoPreview";
import Card from "@/components/Card";
import Controls from "@/components/Controls";

import { Mode } from "@/types";

export default function CameraScreen() {
  const [mode, setMode] = useState<Mode>("Photo");
  const [facing, setFacing] = useState<CameraType>("back");
  const [photo, setPhoto] = useState<CameraCapturedPicture>();

  const cameraRef = useRef<CameraView>(null);

  const [permission, requestPermission] = useCameraPermissions();

  const handleToggleFacing = () =>
    setFacing(facing === "back" ? "front" : "back");

  const handlePressShutter = async () => {
    if (mode === "Photo") {
      const photo = await cameraRef.current?.takePictureAsync();
      setPhoto(photo);
    } else {
      console.log("record video");
    }
  };

  const handleSave = () => {
    if (mode === "Photo" && photo) {
      const name = path.basename(photo.uri);

      FileSystem.copyAsync({
        from: photo.uri,
        to: FileSystem.documentDirectory + name,
      });

      setPhoto(undefined);
      router.back();
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return <CameraPermission onPressEnableCamera={requestPermission} />;
  }

  if (photo) {
    return (
      <PhotoPreview
        photo={photo}
        onDiscard={() => setPhoto(undefined)}
        onSave={handleSave}
      />
    );
  }

  return (
    <>
      <CameraView style={{ flex: 1 }} ref={cameraRef} facing={facing} mirror />

      <SafeAreaView style={StyleSheet.absoluteFill}>
        <Card style={{ margin: 12, marginTop: "auto" }}>
          <Controls
            mode={mode}
            onChangeMode={(mode: Mode) => setMode(mode)}
            onPressShutter={handlePressShutter}
            onToggleFacing={handleToggleFacing}
          />
        </Card>
      </SafeAreaView>
    </>
  );
}
