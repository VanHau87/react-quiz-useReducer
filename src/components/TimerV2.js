import { useEffect } from "react";

function TimerV2({ dispatch, remain }) {
  const mins = Math.floor(remain / 60);
  const seconds = remain % 60;
  useEffect(() => {
    const idTimer = setInterval(() => dispatch({ type: "tick" }), 1000);
    return () => clearInterval(idTimer);
  }, [dispatch]);
  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default TimerV2;
