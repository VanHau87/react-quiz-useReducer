const initialState = {
  questions: [],
  status: "loading", //error, ready, active, finished
  index: 0,
  answer: null,
  points: 0,
  remainTime: null,
};

const SEC_PER_QUESTION = 20;

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "received":
      state = { ...state, status: "ready", questions: payload };
      break;
    case "start":
      state = {
        ...state,
        status: "active",
        index: 0,
        answer: null,
        points: 0,
        remainTime: SEC_PER_QUESTION * state.questions.length,
      };
      break;
    case "answer":
      const question = state.questions.at(state.index);
      const newPoint = question.correctOption === payload ? question.points : 0;
      state = { ...state, answer: payload, points: state.points + newPoint };
      break;
    case "nextQ":
      state = {
        ...state,
        status: "active",
        index: state.index + 1,
        answer: null,
      };
      break;
    case "finishQ":
      state = {
        ...state,
        status: "finish",
      };
      break;
    case "tick":
      state = {
        ...state,
        remainTime: state.remainTime - 1,
        status: state.remainTime > 0 ? "active" : "finish",
      };
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
export { reducer, initialState };
