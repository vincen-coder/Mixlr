import { useState } from "react";

function useFileLoader() {
  const [tracks, setTracks] = useState([]);

    const handleFilePicker = (event) => {
        const files = Array.from(event.target.files);

        // filter out anything that isn't audio
        const audioOnly = files.filter((file) => {
             return file.type.startsWith("audio/")
        });

        const newTracks = audioOnly.map((file) => {
            return {
            name: file.name,
            file: file,
            }
        });
        
        setTracks(newTracks);

    }

            
    return { tracks, handleFilePicker };

}

export default useFileLoader;