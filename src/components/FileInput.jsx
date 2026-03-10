export default function FileInput({ handleFilePicker }) {
    return (
        <input
            type="file"
            multiple
            accept="audio/*"
            onChange={handleFilePicker}
        />
    );
}