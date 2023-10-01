import { useState } from "react";
import { useEffect } from "react";

const date = new Date();
date.setHours(0, 0, 0);
function Timer() {
  const [countTime, setCountTime] = useState(date);
  useEffect(() => {
    const intervalId = setInterval(
      () =>
        setCountTime((prev) => {
          //phải tạo 1 object mới, nếu không react sẽ không nhận biết được sự thay đổi
          const newDate = new Date();
          newDate.setTime(prev.getTime() + 1000);
          return newDate;
        }),
      1000
    );
    return () => clearInterval(intervalId);
  }, []);

  return <div className="timer">{countTime.toLocaleTimeString().slice(3)}</div>;
}

export default Timer;
