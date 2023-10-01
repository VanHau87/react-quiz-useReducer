import { useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import { useReducer } from "react";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import { reducer, initialState } from "./reducer";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import TimerV2 from "./components/TimerV2";

function App() {
  const [{ status, questions, index, answer, points, remainTime }, dispatch] =
    useReducer(reducer, initialState);
  const numOfQues = questions.length;
  const maxPoints = questions.reduce(
    (total, question) => total + question.points,
    0
  );
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://localhost:8000/questions");
        if (response.status === 404) {
          dispatch({ type: "not-found" });
          return;
        }
        const data = await response.json();
        dispatch({ type: "received", payload: data });
      } catch (error) {
        dispatch({ type: "error" });
      }
    })();
  }, []);
  const handleStart = () => {
    dispatch({ type: "start" });
  };
  const current = index >= questions.length ? questions.length - 1 : index;
  return (
    <div className="app">
      <Header />

      <Main className="main">
        {status === "loading" && <Loader />}
        {status === "failed" && <Error />}
        {status === "ready" && (
          <StartScreen amount={numOfQues} onStart={handleStart} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={current}
              numOfQues={numOfQues}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              question={questions[current]}
              dispatch={dispatch}
              hasAnswer={answer}
            />
            <Footer>
              <TimerV2 dispatch={dispatch} remain={remainTime} />
              {answer !== null && (
                <NextButton
                  index={current}
                  dispatch={dispatch}
                  numOfQues={numOfQues}
                />
              )}
            </Footer>
          </>
        )}
        {status === "finish" && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
