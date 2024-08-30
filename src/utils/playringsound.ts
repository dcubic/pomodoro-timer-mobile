import { Audio } from "expo-av";

export async function playRingSound() {
  const { sound } = await Audio.Sound.createAsync(
    require("../../assets/audio/ring.mp3")
  );

  sound.setOnPlaybackStatusUpdate((status) => {
    if (
      status.isLoaded &&
      !status.isPlaying &&
      status.positionMillis === status.durationMillis
    ) {
      sound.unloadAsync();
    }
  });

  await sound.playAsync();
}