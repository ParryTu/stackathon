import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

let alltext = "";
function Box(props) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <>
      <div>
        <p>{alltext}</p>
        <p>Microphone: {listening ? "on" : "off"}</p>
        <button onClick={SpeechRecognition.startListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <button
          onClick={() => {
            alltext = alltext + ". " + transcript;
            console.log(alltext);
            return alltext;
          }}
        >
          Store
        </button>
        <p>{transcript}</p>
      </div>
    </>
  );
}

export default Box;
