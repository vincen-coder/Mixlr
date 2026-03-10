import { useState, useRef } from 'react'

function useRecorder(audioRef) {
  const [isRecording, setIsRecording] = useState(false)
  const [recordedAudio, setRecordedAudio] = useState(null)
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])

  async function startRecording() {
    try {
      // get microphone stream
      const micStream = await navigator.mediaDevices.getUserMedia({ audio: true })

      // create a mixing desk
      const audioContext = new AudioContext()

      // plug microphone into mixing desk
      const micSource = audioContext.createMediaStreamSource(micStream)

      // plug song into mixing desk
      const songSource = audioContext.createMediaElementSource(audioRef.current)

      // create the output destination
      const destination = audioContext.createMediaStreamDestination()

      // connect both sources to the output
      micSource.connect(destination)
      songSource.connect(destination)
      songSource.connect(audioContext.destination) // keep song audible while recording

      // record the mixed output
      const mediaRecorder = new MediaRecorder(destination.stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
        const audioUrl = URL.createObjectURL(audioBlob)
        setRecordedAudio(audioUrl)
      }

      mediaRecorder.start()
      setIsRecording(true)

    } catch (error) {
      console.error('Error accessing microphone:', error)
    }
  }

  function stopRecording() {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  return {
    isRecording,
    recordedAudio,
    startRecording,
    stopRecording
  }
}

export default useRecorder