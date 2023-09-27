import { useReducer } from "react";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "def":
      state = { ...state, count: payload.count };
      break;
    case "count":
      const newCount = state.count + payload.count;
      state = { ...state, count: newCount };
      break;
    case "step":
      state = { ...state, step: payload.step };
      break;
    case "reset":
      state = { step: 1, count: 0 };
      break;
    default:
      throw new Error("Unknow action");
  }
  return state;
};
function DateCounter() {
  const initialState = { count: 0, step: 1 };
  const [state, dispatch] = useReducer(reducer, initialState);

  // This mutates the date object.
  const date = new Date("june 21 2027");
  // date.setDat e(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "count", payload: { count: -state.step } });
  };

  const inc = function () {
    dispatch({ type: "count", payload: { count: state.step } });
  };

  const defineCount = function (e) {
    const value = Number(e.target.value);
    const number = !isNaN(value) ? value : 0;
    const obj = { type: "def", payload: { count: number } };
    dispatch(obj);
  };

  const defineStep = function (e) {
    const value = Number(e.target.value);
    dispatch({ type: "step", payload: { step: value } });
  };

  const reset = function () {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={state.step}
          onChange={defineStep}
        />
        <span>{state.step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={state.count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
