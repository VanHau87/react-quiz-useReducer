function Progress({ index, numOfQues, points, maxPoints, answer }) {
  const value = index + Boolean(answer !== null);
  return (
    <header className="progress">
      <progress max={numOfQues} value={value} />
      <div className="info-details">
        <p>
          Question <strong>{index + 1}</strong>/{numOfQues}
        </p>
        <p>
          <strong>{points}</strong>/{maxPoints}
        </p>
      </div>
    </header>
  );
}

export default Progress;
