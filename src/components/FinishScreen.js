function FinishScreen({ points, maxPoints, dispatch }) {
  return (
    <>
      <p className="result">
        Your score <strong>{points}</strong> out of {maxPoints}
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Take the quiz again
      </button>
    </>
  );
}

export default FinishScreen;
