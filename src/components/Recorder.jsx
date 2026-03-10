function Recorder({ isRecording, recordedAudio, startRecording, stopRecording }) {
  return (
    <div>
      {isRecording
        ? <button onClick={stopRecording}>Stop Recording</button>
        : <button onClick={startRecording}>Start Recording</button>
      }

      {recordedAudio && (
        <div>
          <p>Recording done!</p>
          <audio controls src={recordedAudio} />
          <a href={recordedAudio} download="mixlr-recording.wav">
            <button>Download Recording</button>
          </a>
        </div>
      )}
    </div>
  )
}

export default Recorder