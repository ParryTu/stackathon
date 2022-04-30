import React, { useEffect, useRef, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function Box(props) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  let [text, setText] = useState(transcript);

  useEffect(() => {
    setText(text + transcript);
    console.log(text);
  }, [listening]);

  useEffect(() => {
    if (text && text[text.length - 1] != " ") {
      setText(text + " ");
    }
  });

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  function handleOnChange(evt) {
    setText(evt.target.value);
    console.log(text);
  }

  return (
    <>
      <div>
        <p>Microphone: {listening ? "on, speak now" : "off"}</p>
        <button onClick={SpeechRecognition.startListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button
          onClick={() => {
            resetTranscript();
            text = "";
          }}
        >
          Reset
        </button>
        <button
          onClick={() => {
            if (transcript) {
              setText(text + " " + transcript);
            }
            console.log(text);
          }}
        >
          Store
        </button>
        <br></br>
        <label for="original">Text to translate: </label>
        <textarea
          id="original"
          name="original"
          rows="5"
          value={text}
          onChange={handleOnChange}
        />
        <label for="translated">Translated Text: </label>
        <textarea id="translated" name="translated" rows="5" />
        <p>{transcript}</p>
      </div>
    </>
  );
}

export default Box;
