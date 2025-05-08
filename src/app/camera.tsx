import React, { useState, useRef } from "react";
import { StyleSheet, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  useCameraPermissions,
  CameraView,
  CameraType,
  CameraCapturedPicture,
  CameraMode,
} from "expo-camera";
import * as FileSystem from "expo-file-system";
import path from "path";

import CameraPermission from "@/components/CameraPermission";
import PicturePreview from "@/components/PicturePreview";
import Card from "@/components/Card";
import Controls from "@/components/Controls";

export default function CameraScreen() {
  const [mode, setMode] = useState<CameraMode>("picture");
  const [facing, setFacing] = useState<CameraType>("back");
  const [picture, setPicture] = useState<CameraCapturedPicture>();

  const cameraRef = useRef<CameraView>(null);

  const [permission, requestPermission] = useCameraPermissions();

  const handleToggleFacing = () =>
    setFacing(facing === "back" ? "front" : "back");

  const handlePressShutter = async () => {
    if (mode === "picture") {
      const picture = await cameraRef.current?.takePictureAsync();
      setPicture(picture);
    } else {
      console.log("record video");
    }
  };

  const handleSave = () => {
    if (mode === "picture" && picture) {
      const name = path.basename(picture.uri);

      FileSystem.copyAsync({
        from: picture.uri,
        to: FileSystem.documentDirectory + name,
      });

      setPicture(undefined);
      router.back();
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return <CameraPermission onPressEnableCamera={requestPermission} />;
  }

  if (picture) {
    return (
      <PicturePreview
        picture={picture}
        onDiscard={() => setPicture(undefined)}
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
            onChangeMode={(mode: CameraMode) => setMode(mode)}
            onPressShutter={handlePressShutter}
            onToggleFacing={handleToggleFacing}
          />
        </Card>
      </SafeAreaView>
    </>
  );
}
