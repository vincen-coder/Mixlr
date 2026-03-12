export default function FileInput({ handleFilePicker }) {
  return (
    <label className="group flex flex-col items-center justify-center w-full h-32 rounded-2xl border border-dashed border-zinc-700 hover:border-purple-500/60 bg-zinc-900/40 hover:bg-zinc-900/70 cursor-pointer transition-all duration-300 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-zinc-800 group-hover:bg-purple-500/20 flex items-center justify-center transition-all duration-300">
          <svg className="w-5 h-5 text-zinc-400 group-hover:text-purple-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        </div>
        <span className="text-zinc-400 text-sm group-hover:text-zinc-300 transition-colors">
          Tap to load songs
        </span>
        <span className="text-zinc-600 text-xs">MP3, WAV, FLAC, AAC, M4A</span>
      </div>
      <input
        type="file"
        accept="audio/*,.mp3,.wav,.aac,.flac,.m4a,.ogg"
        multiple
        className="hidden"
        onChange={handleFilePicker}
      />
    </label>
  )
}