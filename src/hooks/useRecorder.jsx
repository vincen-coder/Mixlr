import { useState, useRef } from 'react'

function useRecorder(audioRef) {
  const [isRecording, setIsRecording] = useState(false)
  const [recordedAudio, setRecordedAudio] = useState(null)
  const [trackVolume, setTrackVolume] = useState(1)
  
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const audioContextRef = useRef(null)      // keep AudioContext alive
  const gainNodeRef = useRef(null)          // volume control node
  const songSourceRef = useRef(null)        // keep song source alive

  async function startRecording() {
    try {
      // get microphone stream
      const micStream = await navigator.mediaDevices.getUserMedia({ audio: true })

      // create AudioContext and store it in ref so it stays alive
      const audioContext = new AudioContext()
      audioContextRef.current = audioContext

      // resume context — mobile browsers suspend it by default
      await audioContext.resume()

      // plug microphone into mixing desk
      const micSource = audioContext.createMediaStreamSource(micStream)

      // plug song into mixing desk — store in ref so it stays alive
      const songSource = audioContext.createMediaElementSource(audioRef.current)
      songSourceRef.current = songSource

      // create a gain node — this controls the song volume during recording
      const gainNode = audioContext.createGain()
      gainNodeRef.current = gainNode
      gainNode.gain.value = trackVolume

      // create the output destination for recording
      const destination = audioContext.createMediaStreamDestination()

      // connect everything:
      // mic → destination (recording)
      micSource.connect(destination)

      // song → gain → destination (recording)
      // song → gain → speakers (so you can still hear it)
      songSource.connect(gainNode)
      gainNode.connect(destination)
      gainNode.connect(audioContext.destination)  // keeps song audible

      // record the mixed output
      const mediaRecorder = new MediaRecorder(destination.stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { 
          type: 'audio/webm'  // webm is better supported on mobile than wav
        })
        const audioUrl = URL.createObjectURL(audioBlob)
        setRecordedAudio(audioUrl)
      }

      mediaRecorder.start(100)  // collect data every 100ms — more reliable on mobile
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

  // call this to change song volume during recording
  function changeTrackVolume(value) {
    setTrackVolume(value)
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = value  // update live during recording
    }
  }

  return {
    isRecording,
    recordedAudio,
    trackVolume,
    startRecording,
    stopRecording,
    changeTrackVolume
  }
}

export default useRecorder
