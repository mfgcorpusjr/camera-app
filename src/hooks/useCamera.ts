import { useState, useRef } from "react";
import {
  CameraMode,
  CameraType,
  CameraCapturedPicture,
  CameraView,
} from "expo-camera";

type CameraProps = {
  cameraMode?: CameraMode;
  cameraFacing?: CameraType;
};

export default function useCamera({
  cameraMode = "picture",
  cameraFacing = "back",
}: CameraProps = {}) {
  const [mode, setMode] = useState<CameraMode>(cameraMode);
  const [facing, setFacing] = useState<CameraType>(cameraFacing);
  const [picture, setPicture] = useState<CameraCapturedPicture>();
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState("");

  const cameraRef = useRef<CameraView>(null);

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

  return {
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
  };
}
