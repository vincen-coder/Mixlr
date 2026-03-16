export default function Recorder({ isRecording, recordedAudio, trackVolume, startRecording, stopRecording, changeTrackVolume }) {
  return (
    <div className="w-full bg-zinc-900/40 backdrop-blur-md rounded-2xl border border-zinc-800/50 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-zinc-300 text-sm font-semibold">Studio Recorder</p>
          <p className="text-zinc-600 text-xs mt-0.5">Mix your voice with the track</p>
        </div>
        {isRecording && (
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-3 py-1">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-400 text-xs font-medium">REC</span>
          </div>
        )}
      </div>

      {/* Volume slider — only shows when recording */}
      {isRecording && (
        <div className="mb-4 p-3 bg-zinc-800/50 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-zinc-400 text-xs">Track Volume</span>
            <span className="text-zinc-400 text-xs">{Math.round(trackVolume * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={trackVolume}
            onChange={(e) => changeTrackVolume(parseFloat(e.target.value))}
            className="w-full accent-purple-500"
          />
        </div>
      )}

      {/* Record button */}
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 ${
          isRecording
            ? "bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/30"
            : "bg-purple-500/20 border border-purple-500/40 text-purple-400 hover:bg-purple-500/30"
        }`}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>

      {recordedAudio && (
        <div className="mt-4 p-4 bg-zinc-800/50 rounded-xl border border-zinc-700/40">
          <p className="text-zinc-400 text-xs mb-3 font-medium uppercase tracking-wider">Your Recording</p>
          <audio controls src={recordedAudio} className="w-full mb-3" />
          
            <a href={recordedAudio}
            download="mixlr-recording.webm"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-zinc-700/50 text-zinc-300 text-sm font-medium transition-all"
          >
            Download Mix
          </a>
        </div>
      )}
    </div>
  )
}