function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? "0" + secs : secs}`
}

export default function PlayerController({ currentTrack, isPlaying, duration, currentTime, play, pause, stop }) {
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="w-full bg-zinc-900/60 backdrop-blur-md rounded-2xl p-6 border border-zinc-800/50">
      {/* Track info */}
      <div className="mb-5">
        <div className="flex items-center gap-3">
          {/* Album art placeholder */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/40 to-blue-600/40 flex items-center justify-center flex-shrink-0 border border-zinc-700/50">
            <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
          </div>
          <div className="overflow-hidden">
            <p className="text-white font-semibold text-sm truncate">
              {currentTrack?.name ?? "No track selected"}
            </p>
            <p className="text-zinc-500 text-xs mt-0.5">Local file</p>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-zinc-500 text-xs">{formatTime(currentTime)}</span>
          <span className="text-zinc-500 text-xs">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        {/* Stop */}
        <button
          onClick={stop}
          className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-all duration-200 active:scale-95"
        >
          <svg className="w-4 h-4 text-zinc-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 6h12v12H6z"/>
          </svg>
        </button>

        {/* Play/Pause */}
        <button
          onClick={isPlaying ? pause : play}
          className="w-14 h-14 rounded-full bg-white hover:bg-zinc-100 flex items-center justify-center transition-all duration-200 active:scale-95 shadow-lg shadow-white/10"
        >
          {isPlaying ? (
            <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          ) : (
            <svg className="w-6 h-6 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>

        {/* Placeholder for future skip button */}
        <button className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-all duration-200 active:scale-95">
          <svg className="w-4 h-4 text-zinc-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
          </svg>
        </button>
      </div>
    </div>
  )
}