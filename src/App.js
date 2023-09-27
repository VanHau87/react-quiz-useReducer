import { useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import { useReducer } from "react";

const initialState = {
  questions: [],
  status: "loading", //error, ready, active, finished
};
const reducer = (state, { type, payload }) => {
  switch (type) {
    case "received":
      state = { ...state, status: "ready", questions: payload };
      break;
    case "not-found":
      state = { ...state, status: "Not found" };
      break;
    case "error":
      state = { ...state, status: "failed" };
      break;
    default:
      throw new Error("Action Unknown");
  }
  return state;
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://localhost:8000/questios");
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
  return (
    <div className="app">
      <Header />

      <Main className="main">
        <p>1/15</p>
        <p>Question</p>
      </Main>
    </div>
  );
}

export default App;
