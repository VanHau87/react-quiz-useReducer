import Options from "./components/Options";

function Question({
  question: { question, options, correctOption },
  dispatch,
  hasAnswer,
}) {
  return (
    <div>
      <h2>{question}</h2>
      <Options
        opts={options}
        correctOtp={correctOption}
        dispatch={dispatch}
        hasAnswer={hasAnswer}
      />
    </div>
  );
}

export default Question;
