export default function Playlist({ tracks, currentTrack, setCurrentTrack }) {
  return (
    <div className="w-full bg-zinc-900/40 backdrop-blur-md rounded-2xl border border-zinc-800/50 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-zinc-800/50 flex items-center justify-between">
        <span className="text-zinc-300 text-sm font-semibold">Playlist</span>
        <span className="text-zinc-600 text-xs">{tracks.length} songs</span>
      </div>

      {/* Track list */}
      <div className="divide-y divide-zinc-800/40 max-h-56 overflow-y-auto scrollbar-none">
        {tracks.map((track, index) => (
          <button
            key={index}
            onClick={() => setCurrentTrack(track)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 hover:bg-zinc-800/50 ${
              track === currentTrack ? "bg-zinc-800/70" : ""
            }`}
          >
            {/* Index / playing indicator */}
            <div className="w-6 flex items-center justify-center flex-shrink-0">
              {track === currentTrack ? (
                <div className="flex gap-0.5 items-end h-4">
                  <div className="w-0.5 bg-purple-400 animate-bounce h-2" style={{ animationDelay: '0ms' }} />
                  <div className="w-0.5 bg-purple-400 animate-bounce h-4" style={{ animationDelay: '150ms' }} />
                  <div className="w-0.5 bg-purple-400 animate-bounce h-3" style={{ animationDelay: '300ms' }} />
                </div>
              ) : (
                <span className="text-zinc-600 text-xs">{index + 1}</span>
              )}
            </div>

            {/* Track name */}
            <div className="overflow-hidden flex-1">
              <p className={`text-sm truncate ${track === currentTrack ? "text-purple-400 font-medium" : "text-zinc-300"}`}>
                {track.name}
              </p>
            </div>

            {/* Music note icon */}
            <svg className={`w-3.5 h-3.5 flex-shrink-0 ${track === currentTrack ? "text-purple-400" : "text-zinc-700"}`} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
          </button>
        ))}
      </div>
    </div>
  )
}