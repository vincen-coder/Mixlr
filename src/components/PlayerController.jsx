function PlayerController({ currentTrack, isPlaying, duration, currentTime, play, pause, stop }) {
    
    
    function formatTime(seconds) {
			const mins = Math.floor(seconds / 60); // how many full minutes
			const secs = Math.floor(seconds % 60); // remaining seconds

			// % is called modulo — it gives you the remainder
			// 93 / 60 = 1 remainder 33 → so 1:33

			// pad seconds with 0 if less than 10 so it shows 1:07 not 1:7
			return `${mins}:${secs < 10 ? '0' + secs : secs}`;
	}
    
    return (
    <div>
      <p>{currentTrack?.name ?? "No song selected"}</p>

      {isPlaying 
        ? <button onClick={pause}>Pause</button> 
        : <button onClick={play}>Play</button>
      }

      <button onClick={stop}>Stop</button>

      <p>{formatTime(currentTime)} / {formatTime(duration)}</p>
    </div>
  )
}

export default PlayerController