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
import VideoPreview from "@/components/VideoPreview";
import Card from "@/components/Card";
import Controls from "@/components/Controls";

export default function CameraScreen() {
  const [mode, setMode] = useState<CameraMode>("picture");
  const [facing, setFacing] = useState<CameraType>("back");
  const [picture, setPicture] = useState<CameraCapturedPicture>();
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState("");

  const cameraRef = useRef<CameraView>(null);

  const [permission, requestPermission] = useCameraPermissions();

  const handleToggleFacing = () =>
    setFacing(facing === "back" ? "front" : "back");

  const handleTakePicture = async () => {
    const picture = await cameraRef.current?.takePictureAsync();
    setPicture(picture);
  };

  const handleStartRecording = async () => {
    setIsRecording(true);
    const video = await cameraRef.current?.recordAsync({ maxDuration: 10 });
    if (video) {
      setVideo(video.uri);
    }
    setIsRecording(false);
  };

  const handleStopRecording = () => {
    cameraRef.current?.stopRecording();
    setIsRecording(false);
  };

  const handleSave = () => {
    const uri = mode === "picture" && picture ? picture.uri : video;

    const name = path.basename(uri);

    FileSystem.copyAsync({
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
