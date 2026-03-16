import { useState, useRef } from 'react'

function useRecorder(audioRef) {
  const [isRecording, setIsRecording] = useState(false)
  const [recordedAudio, setRecordedAudio] = useState(null)
  const [trackVolume, setTrackVolume] = useState(1)

  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const audioContextRef = useRef(null)
  const gainNodeRef = useRef(null)
  const songSourceRef = useRef(null)

  async function startRecording() {
    try {
      const micStream = await navigator.mediaDevices.getUserMedia({ audio: true })

      const audioContext = new AudioContext()
      audioContextRef.current = audioContext
      await audioContext.resume()

      const micSource = audioContext.createMediaStreamSource(micStream)
      const songSource = audioContext.createMediaElementSource(audioRef.current)
      songSourceRef.current = songSource

      const gainNode = audioContext.createGain()
      gainNodeRef.current = gainNode
      gainNode.gain.value = trackVolume

      // boost mic so voice comes through clearly
      const micGainNode = audioContext.createGain()
      micGainNode.gain.value = 3

      const destination = audioContext.createMediaStreamDestination()

      micSource.connect(micGainNode)
      micGainNode.connect(destination)

      songSource.connect(gainNode)
      gainNode.connect(destination)
      gainNode.connect(audioContext.destination)

      // detect format — mp4 for Safari, webm for Chrome
      const mimeType = MediaRecorder.isTypeSupported('audio/mp4')
        ? 'audio/mp4'
        : MediaRecorder.isTypeSupported('audio/webm')
        ? 'audio/webm'
        : ''

      const mediaRecorder = new MediaRecorder(
        destination.stream,
        mimeType ? { mimeType } : {}
      )
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: mimeType || 'audio/webm'
        })
        const audioUrl = URL.createObjectURL(audioBlob)
        setRecordedAudio(audioUrl)
      }

      mediaRecorder.start(100)
      setIsRecording(true)

    } catch (error) {
      console.error('Error starting recording:', error)
    }
  }

  function stopRecording() {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  function changeTrackVolume(value) {
    setTrackVolume(value)
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = value
    }
  }

  function clearRecording() {
    setRecordedAudio(null)
  }

  return {
    isRecording,
    recordedAudio,
    trackVolume,
    startRecording,
    stopRecording,
    changeTrackVolume,
    clearRecording
  }
}

export default useRecorder