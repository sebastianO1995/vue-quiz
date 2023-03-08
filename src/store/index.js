import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      questions: [],
    };
  },
});

export default store;
