import React, { useEffect, useRef, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import translate from "translate";
import { connect } from "react-redux";
import { translateText } from "../../app/store";

let GOOGLE_KEY =
  "/Users/parrytu/Downloads/civil-rarity-348820-c558a10d6b64.json";
translate.engine = "google"; // Or "yandex", "libre", "deepl"
translate.key = GOOGLE_KEY;

// let example = await translate("hello", "es");

function Box(props) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  let [text, setText] = useState(transcript);
  let [translatedText, setTranslation] = useState("");

  useEffect(() => {
    setText(text + transcript);
    console.log(text);
  }, [listening]);

  useEffect(() => {
    if (text && text[text.length - 1] != " ") {
      setText(text + " ");
    }
  }, [listening]);

  // useEffect(() => {
  //   setTranslation(props.translateThuck(text));
  // }, [listening]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  function handleOnChange(evt) {
    setText(evt.target.value);
    console.log(text);
  }

  function clickTranslate() {
    let a = props.translateThuck(text);
    setTranslation(a);
    console.log(translatedText);
    //console.log(example);
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
            setText("");
          }}
        >
          Clear Text
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
        <br></br>
        <label for="translated">Translated Text: </label>
        <textarea
          id="translated"
          name="translated"
          rows="5"
          value={translatedText}
        />
        <button onClick={clickTranslate}>Translate</button>
        <p>{transcript}</p>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    translateThuck: (text) => dispatch(translateText(text)),
  };
};

export default connect(null, mapDispatchToProps)(Box);
