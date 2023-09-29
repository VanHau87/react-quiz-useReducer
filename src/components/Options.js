function Options({ opts, correctOtp, dispatch, hasAnswer }) {
  const handleSelect = (index) => {
    dispatch({ type: "answer", payload: index });
  };
  const isAnswer = hasAnswer !== null;
  return (
    <div className="options">
      {opts.map((opt, index) => (
        <button
          className={`btn btn-option ${hasAnswer === index ? "answer" : ""} 
          ${isAnswer ? (index === correctOtp ? "correct" : "wrong") : ""}`}
          key={index}
          onClick={() => handleSelect(index)}
          disabled={isAnswer}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default Options;
