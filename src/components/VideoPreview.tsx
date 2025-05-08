import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useVideoPlayer, VideoView } from "expo-video";

import Card from "@/components/Card";
import PreviewControls from "@/components/PreviewControls";

type VideoPreviewProps = {
  video: string;
  onDiscard: () => void;
  onSave: () => void;
};
export default function VideoPreview({
  video,
  onDiscard,
  onSave,
}: VideoPreviewProps) {
  const player = useVideoPlayer(video, (player) => {
    player.loop = true;
    player.play();
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VideoView
        style={StyleSheet.absoluteFill}
        player={player}
        allowsFullscreen
        contentFit="cover"
        nativeControls={false}
      />

      <Card style={{ margin: 12, marginTop: "auto" }}>
        <PreviewControls onDiscard={onDiscard} onSave={onSave} />
      </Card>
    </SafeAreaView>
  );
}
