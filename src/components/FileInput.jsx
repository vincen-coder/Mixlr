export default function FileInput({ handleFilePicker }) {
    return (
        <input
            type="file"
            multiple
            accept="audio/*,.mp3,.wav,.aac,.flac,.m4a,.ogg"
            onChange={handleFilePicker}
        />
    );
}