import React from "react";
import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCameraPermissions, CameraView, CameraMode } from "expo-camera";
import * as FileSystem from "expo-file-system";
import path from "path";

import CameraPermission from "@/components/CameraPermission";
import PicturePreview from "@/components/PicturePreview";
import VideoPreview from "@/components/VideoPreview";
import Card from "@/components/Card";
import Controls from "@/components/Controls";

import useCamera from "@/hooks/useCamera";
import useFileSystem from "@/hooks/useFileSystem";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const {
    cameraRef,
    mode,
    setMode,
    facing,
    picture,
    setPicture,
    isRecording,
    video,
    setVideo,
    handleToggleFacing,
    handleTakePicture,
    handleStartRecording,
    handleStopRecording,
  } = useCamera();
  const { saveToFileSystem } = useFileSystem();

  const handleSave = async () => {
    const uri = mode === "picture" && picture ? picture.uri : video;
    const name = path.basename(uri);

    await saveToFileSystem({
      from: uri,
      to: FileSystem.documentDirectory + name,
    });

    setPicture(undefined);
    setVideo("");

    router.back();
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

  if (video) {
    return (
      <VideoPreview
        video={video}
        onDiscard={() => setVideo("")}
        onSave={handleSave}
      />
    );
  }

  return (
    <>
      <CameraView
        style={{ flex: 1 }}
        ref={cameraRef}
        facing={facing}
        mode={mode}
      />

      <SafeAreaView style={StyleSheet.absoluteFill}>
        <Card style={{ margin: 12, marginTop: "auto" }}>
          <Controls
            mode={mode}
            isRecording={isRecording}
            onChangeMode={(mode: CameraMode) => setMode(mode)}
            onPressShutter={
              mode === "picture"
                ? handleTakePicture
                : isRecording
                ? handleStopRecording
                : handleStartRecording
            }
            onToggleFacing={handleToggleFacing}
          />
        </Card>
      </SafeAreaView>
    </>
  );
}
