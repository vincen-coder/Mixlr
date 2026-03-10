import { useState, useEffect } from "react"
import useFileLoader from "./hooks/UseFileLoader"
import useAudioPlayer from "./hooks/UseAudioPlayer"
import useRecorder from "./hooks/UseRecorder"
import FileInput from "./components/FileInput"
import PlayerController from "./components/PlayerController"
import Playlist from "./components/Playlist"
import Recorder from "./components/Recorder"

function App() {
  const [currentTrack, setCurrentTrack] = useState(null)

  const { tracks, handleFilePicker } = useFileLoader()
  const { isPlaying, duration, currentTime, play, pause, stop, audioRef } = useAudioPlayer(currentTrack)
  const { isRecording, recordedAudio, startRecording, stopRecording } = useRecorder(audioRef)

  useEffect(() => {
    if (tracks.length > 0) {
      setCurrentTrack(tracks[0])
    }
  }, [tracks])

  return (
    <div>
      <FileInput handleFilePicker={handleFilePicker} />
      <p>{tracks.length} songs loaded</p>
      <p>Now playing: {currentTrack?.name ?? "nothing selected"}</p>
      <PlayerController
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        duration={duration}
        currentTime={currentTime}
        play={play}
        pause={pause}
        stop={stop}
      />
      <Playlist
        tracks={tracks}
        currentTrack={currentTrack}
        setCurrentTrack={setCurrentTrack}
      />
      <Recorder
        isRecording={isRecording}
        recordedAudio={recordedAudio}
        startRecording={startRecording}
        stopRecording={stopRecording}
      />
    </div>
  )
}

export default App