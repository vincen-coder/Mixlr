function Recorder({ isRecording, recordedAudio, startRecording, stopRecording }) {
  return (
    <div>
      {isRecording
        ? <button className="text-blue-500" onClick={stopRecording}>Stop Recording</button>
        : <button className="text-blue-500" onClick={startRecording}>Start Recording</button>
      }

      {recordedAudio && (
        <div>
          <p>Recording done!</p>
          <audio controls src={recordedAudio} />
          <a href={recordedAudio} download="mixlr-recording.wav">
            <button className="text-blue-500">Download Recording</button>
          </a>
        </div>
      )}
    </div>
  )
}

export default Recorder