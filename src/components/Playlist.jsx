function Playlist({ tracks, currentTrack, setCurrentTrack }) {
  return (
    <div>
      <p>Playlist</p>
      <ul>
        {tracks.map((track, index) => (
          <li
            key={index}
            onClick={() => setCurrentTrack(track)}
            className={track === currentTrack ? "text-purple-500 cursor-pointer" : "text-blue-500 cursor-pointer"}
          >
            {track.name}
          </li>
        ))}
      </ul>
    </div>
  
)}

export default Playlist