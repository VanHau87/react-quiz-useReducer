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

function App() {
  const [{ status, questions, index, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numOfQues = questions.length;
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
            <Question
              question={questions[index]}
              dispatch={dispatch}
              hasAnswer={answer}
            />
            <NextButton answer={answer} dispatch={dispatch} />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
