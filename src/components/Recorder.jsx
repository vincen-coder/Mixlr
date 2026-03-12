export default function Recorder({ isRecording, recordedAudio, startRecording, stopRecording }) {
  return (
    <div className="w-full bg-zinc-900/40 backdrop-blur-md rounded-2xl border border-zinc-800/50 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-zinc-300 text-sm font-semibold">Studio Recorder</p>
          <p className="text-zinc-600 text-xs mt-0.5">Mix your voice with the track</p>
        </div>

        {/* Recording indicator */}
        {isRecording && (
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-3 py-1">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-400 text-xs font-medium">REC</span>
          </div>
        )}
      </div>

      {/* Record button */}
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 ${
          isRecording
            ? "bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/30"
            : "bg-purple-500/20 border border-purple-500/40 text-purple-400 hover:bg-purple-500/30"
        }`}
      >
        {isRecording ? (
          <>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h12v12H6z"/>
            </svg>
            Stop Recording
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
            </svg>
            Start Recording
          </>
        )}
      </button>

      {/* Recorded audio playback + download */}
      {recordedAudio && (
        <div className="mt-4 p-4 bg-zinc-800/50 rounded-xl border border-zinc-700/40">
          <p className="text-zinc-400 text-xs mb-3 font-medium uppercase tracking-wider">Your Recording</p>
          <audio
            controls
            src={recordedAudio}
            className="w-full h-8 mb-3"
          />
          <a
            href={recordedAudio}
            download="mixlr-recording.wav"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-zinc-700/50 text-zinc-300 text-sm font-medium transition-all duration-200 active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Mix
          </a>
        </div>
      )}
    </div>
  )
}