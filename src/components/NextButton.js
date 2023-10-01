function NextButton({ index, dispatch, numOfQues }) {
  const { text, type } =
    index < numOfQues - 1
      ? { text: "Next", type: "nextQ" }
      : { text: "Finish", type: "finishQ" };
  return (
    <button className="btn btn-ui" onClick={() => dispatch({ type })}>
      {text}
    </button>
  );
}

export default NextButton;
