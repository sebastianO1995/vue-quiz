import { createClient } from "contentful";
import { createStore } from "vuex";
const contentFulSpace = import.meta.env.VITE_SPACE || null;
const token = import.meta.env.VITE_CONTENTFUL_TOKEN_DELIVERY || null;

const contentfulClient = createClient({
  space: contentFulSpace,
  accessToken: token,
});
const store = createStore({
  state() {
    return {
      quizes: [],
      isLoading: false,
      error: {
        message: null,
        hasError: false,
      },
      selectedQuizId: null,
    };
  },
  getters: {
    hasQuizData(state) {
      return (
        !state.isLoading && state.quizes.length > 0 && !state.error.hasError
      );
    },
    failedLoadingData(state) {
      return (
        !state.isLoading && (state.quizes.length === 0 || state.error.hasError)
      );
    },
    getCurrentQuiz(state) {
      if (state.selectedQuizId !== null && state.quizes.length) {
        const filteredQuiz = state.quizes.filter(
          (quiz) => quiz.id === state.selectedQuizId
        );

        return filteredQuiz[0];
      }
    },
  },
  mutations: {
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_QUIZES(state, quizArrayList) {
      state.quizes = quizArrayList;
    },
    SET_SELECTED_QUIZID(state, id) {
      state.selectedQuizId = id;
    },
  },
  actions: {
    fetchQuizes({ commit }) {
      if (token !== null && contentFulSpace !== null) {
        commit("SET_LOADING", true);
        contentfulClient
          .getEntries({ content_type: "quiz" })
          .then((entries) => {
            commit("SET_LOADING", false);

            commit(
              "SET_QUIZES",
              entries?.items.map((quiz) => {
                return {
                  questions: quiz.fields.questions.map((question) => ({
                    ...question.fields,
                    id: question.sys.id,
                  })),
                  quizName: quiz.fields.quizName,
                  totalQuestions: quiz.fields.questions.length,
                  id: quiz.sys.id,
                };
              }) || []
            );
          })
          .catch((error) => {
            commit("SET_LOADING", false);

            commit("SET_ERROR", {
              hasError: true,
              message:
                JSON.parse(error.message)?.message || "No Quizes available",
            });
          });
      }
    },
    selectQuiz({ commit }, quizId) {
      commit("SET_SELECTED_QUIZID", quizId);
    },
  },
});

export default store;
