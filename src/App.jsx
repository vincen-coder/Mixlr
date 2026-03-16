import { useState, useEffect } from "react"
import useFileLoader from "./hooks/useFileLoader"
import useAudioPlayer from "./hooks/useAudioPlayer"
import useRecorder from "./hooks/useRecorder"
import FileInput from "./components/FileInput"
import PlayerController from "./components/PlayerController"
import Playlist from "./components/Playlist"
import Recorder from "./components/Recorder"

function App() {
  const [currentTrack, setCurrentTrack] = useState(null)
  const { tracks, handleFilePicker } = useFileLoader()
  const { isPlaying, duration, currentTime, play, pause, stop, audioRef } = useAudioPlayer(currentTrack)
  const { isRecording, recordedAudio, trackVolume, startRecording, stopRecording, changeTrackVolume, clearRecording } = useRecorder(audioRef)

  useEffect(() => {
    if (tracks.length > 0) {
      setCurrentTrack(tracks[0])
    }
  }, [tracks])

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col items-center px-4 py-8 font-sans">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-blue-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-md mb-8 relative z-10">
        <h1 className="text-3xl font-black tracking-tight text-white">
          Mix<span className="text-purple-400">lr</span>
        </h1>
        <p className="text-zinc-500 text-xs mt-1 tracking-widest uppercase">
          Audio Player & Recorder
        </p>
      </div>

      <div className="w-full max-w-md flex flex-col gap-4 relative z-10">
        <FileInput handleFilePicker={handleFilePicker} />

        {tracks.length > 0 && (
          <>
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
              trackVolume={trackVolume}
              startRecording={startRecording}
              stopRecording={stopRecording}
              changeTrackVolume={changeTrackVolume}
              clearRecording={clearRecording}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default App