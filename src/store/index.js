import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      questions: [
        {
          question: "What is 2+2",
          answer: 2,
          options: ["2", "5", "4"],
          selected: null,
        },
        {
          question: "What is 5+5",
          answer: 0,
          options: ["10", "1", "-5"],
          selected: null,
        },
      ],
      quizName: "Math",
      isLoading: false,
      error: false,
    };
  },
  getters: {
    hasQuizData(state) {
      return !state.isLoading && state.questions.length > 0;
    },
  },
  mutations: {
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async fetchQuestions({ commit }) {
      try {
        commit("SET_LOADING", true);
      } catch (error) {}
    },
  },
});

export default store;
