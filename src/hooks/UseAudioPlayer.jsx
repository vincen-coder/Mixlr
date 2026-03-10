import {useState,useEffect,useRef} from 'react';

function useAudioPlayer(currentTrack) {
	const [isPlaying, setIsPlaying] = useState(false);
	const [duration, setDuration] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);

	const audioRef = useRef(new Audio());

	useEffect(() => {
		const audio = audioRef.current;
		if (currentTrack) {
			audio.src = URL.createObjectURL(currentTrack.file);
			audio.load();

			if ('mediaSession' in navigator) {
				navigator.mediaSession.metadata = new MediaMetadata({
					title: currentTrack.name,
				});

				// tell OS what to do when lock screen buttons pressed
				navigator.mediaSession.setActionHandler('play', () => {
					audio.play();
					setIsPlaying(true);
				});

				navigator.mediaSession.setActionHandler('pause', () => {
					audio.pause();
					setIsPlaying(false);
				});
			}
		}

		
	}, [currentTrack]);

	useEffect(() => {
		const audio = audioRef.current;

		// when audio duration is known, save it to state
		audio.ondurationchange = () => setDuration(audio.duration);

		// as song plays, update currentTime continuously
		audio.ontimeupdate = () => setCurrentTime(audio.currentTime);
	}, []); // ← empty, runs once

	function play() {
		audioRef.current.play();
		setIsPlaying(true);
	}

	function pause() {
		audioRef.current.pause();
		setIsPlaying(false);
	}

	function stop() {
		audioRef.current.pause();
		audioRef.current.currentTime = 0;
		setIsPlaying(false);
	}

	return { isPlaying, duration, currentTime, play, pause, stop, audioRef };
};

export default useAudioPlayer;